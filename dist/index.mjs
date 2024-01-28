// src/core/BaseHttpRequest.ts
var BaseHttpRequest = class {
  constructor(config) {
    this.config = config;
  }
};

// src/core/ApiError.ts
var ApiError = class extends Error {
  url;
  status;
  statusText;
  body;
  request;
  constructor(request2, response, message) {
    super(message);
    this.name = "ApiError";
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request2;
  }
};

// src/core/CancelablePromise.ts
var CancelError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CancelError";
  }
  get isCancelled() {
    return true;
  }
};
var CancelablePromise = class {
  #isResolved;
  #isRejected;
  #isCancelled;
  #cancelHandlers;
  #promise;
  #resolve;
  #reject;
  constructor(executor) {
    this.#isResolved = false;
    this.#isRejected = false;
    this.#isCancelled = false;
    this.#cancelHandlers = [];
    this.#promise = new Promise((resolve2, reject) => {
      this.#resolve = resolve2;
      this.#reject = reject;
      const onResolve = (value) => {
        var _a;
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#isResolved = true;
        (_a = this.#resolve) == null ? void 0 : _a.call(this, value);
      };
      const onReject = (reason) => {
        var _a;
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#isRejected = true;
        (_a = this.#reject) == null ? void 0 : _a.call(this, reason);
      };
      const onCancel = (cancelHandler) => {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#cancelHandlers.push(cancelHandler);
      };
      Object.defineProperty(onCancel, "isResolved", {
        get: () => this.#isResolved
      });
      Object.defineProperty(onCancel, "isRejected", {
        get: () => this.#isRejected
      });
      Object.defineProperty(onCancel, "isCancelled", {
        get: () => this.#isCancelled
      });
      return executor(onResolve, onReject, onCancel);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(onFulfilled, onRejected) {
    return this.#promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this.#promise.catch(onRejected);
  }
  finally(onFinally) {
    return this.#promise.finally(onFinally);
  }
  cancel() {
    var _a;
    if (this.#isResolved || this.#isRejected || this.#isCancelled) {
      return;
    }
    this.#isCancelled = true;
    if (this.#cancelHandlers.length) {
      try {
        for (const cancelHandler of this.#cancelHandlers) {
          cancelHandler();
        }
      } catch (error) {
        console.warn("Cancellation threw an error", error);
        return;
      }
    }
    this.#cancelHandlers.length = 0;
    (_a = this.#reject) == null ? void 0 : _a.call(this, new CancelError("Request aborted"));
  }
  get isCancelled() {
    return this.#isCancelled;
  }
};

// src/core/request.ts
var isDefined = (value) => {
  return value !== void 0 && value !== null;
};
var isString = (value) => {
  return typeof value === "string";
};
var isStringWithValue = (value) => {
  return isString(value) && value !== "";
};
var isBlob = (value) => {
  return typeof value === "object" && typeof value.type === "string" && typeof value.stream === "function" && typeof value.arrayBuffer === "function" && typeof value.constructor === "function" && typeof value.constructor.name === "string" && /^(Blob|File)$/.test(value.constructor.name) && /^(Blob|File)$/.test(value[Symbol.toStringTag]);
};
var isFormData = (value) => {
  return value instanceof FormData;
};
var base64 = (str) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str).toString("base64");
  }
};
var getQueryString = (params) => {
  const qs = [];
  const append = (key, value) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };
  const process = (key, value) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          process(key, v);
        });
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };
  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });
  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
};
var getUrl = (config, options) => {
  const encoder = config.ENCODE_PATH || encodeURI;
  const path = options.url.replace("{api-version}", config.VERSION).replace(/{(.*?)}/g, (substring, group) => {
    var _a;
    if ((_a = options.path) == null ? void 0 : _a.hasOwnProperty(group)) {
      return encoder(String(options.path[group]));
    }
    return substring;
  });
  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};
var getFormData = (options) => {
  if (options.formData) {
    const formData = new FormData();
    const process = (key, value) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };
    Object.entries(options.formData).filter(([_, value]) => isDefined(value)).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => process(key, v));
      } else {
        process(key, value);
      }
    });
    return formData;
  }
  return void 0;
};
var resolve = async (options, resolver) => {
  if (typeof resolver === "function") {
    return resolver(options);
  }
  return resolver;
};
var getHeaders = async (config, options) => {
  const token = await resolve(options, config.TOKEN);
  const username = await resolve(options, config.USERNAME);
  const password = await resolve(options, config.PASSWORD);
  const additionalHeaders = await resolve(options, config.HEADERS);
  const headers = Object.entries({
    Accept: "application/json",
    ...additionalHeaders,
    ...options.headers
  }).filter(([_, value]) => isDefined(value)).reduce((headers2, [key, value]) => ({
    ...headers2,
    [key]: String(value)
  }), {});
  if (isStringWithValue(token)) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    headers["Authorization"] = `Basic ${credentials}`;
  }
  if (options.body) {
    if (options.mediaType) {
      headers["Content-Type"] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers["Content-Type"] = options.body.type || "application/octet-stream";
    } else if (isString(options.body)) {
      headers["Content-Type"] = "text/plain";
    } else if (!isFormData(options.body)) {
      headers["Content-Type"] = "application/json";
    }
  }
  return new Headers(headers);
};
var getRequestBody = (options) => {
  var _a;
  if (options.body !== void 0) {
    if ((_a = options.mediaType) == null ? void 0 : _a.includes("/json")) {
      return JSON.stringify(options.body);
    } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
      return options.body;
    } else {
      return JSON.stringify(options.body);
    }
  }
  return void 0;
};
var sendRequest = async (config, options, url, body, formData, headers, onCancel) => {
  const controller = new AbortController();
  const request2 = {
    headers,
    body: body ?? formData,
    method: options.method,
    signal: controller.signal
  };
  if (config.WITH_CREDENTIALS) {
    request2.credentials = config.CREDENTIALS;
  }
  onCancel(() => controller.abort());
  return await fetch(url, request2);
};
var getResponseHeader = (response, responseHeader) => {
  if (responseHeader) {
    const content = response.headers.get(responseHeader);
    if (isString(content)) {
      return content;
    }
  }
  return void 0;
};
var getResponseBody = async (response) => {
  if (response.status !== 204) {
    try {
      const contentType = response.headers.get("Content-Type");
      if (contentType) {
        const jsonTypes = ["application/json", "application/problem+json"];
        const isJSON = jsonTypes.some((type) => contentType.toLowerCase().startsWith(type));
        if (isJSON) {
          return await response.json();
        } else {
          return await response.text();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return void 0;
};
var catchErrorCodes = (options, result) => {
  const errors = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...options.errors
  };
  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }
  if (!result.ok) {
    throw new ApiError(options, result, "Generic Error");
  }
};
var request = (config, options) => {
  return new CancelablePromise(async (resolve2, reject, onCancel) => {
    try {
      const url = getUrl(config, options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options);
      if (!onCancel.isCancelled) {
        const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
        const responseBody = await getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);
        const result = {
          url,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody
        };
        catchErrorCodes(options, result);
        resolve2(result.body);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// src/core/FetchHttpRequest.ts
var FetchHttpRequest = class extends BaseHttpRequest {
  constructor(config) {
    super(config);
  }
  /**
   * Request method
   * @param options The request options from the service
   * @returns CancelablePromise<T>
   * @throws ApiError
   */
  request(options) {
    return request(this.config, options);
  }
};

// src/services/AListService.ts
var AListService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * add a new list
   * @param requestBody A list object
   * @returns Alist List has been created
   * @throws ApiError
   */
  addList(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/alist",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad request, something is wrong with the list object`,
        422: `Input had no errors but was not valid`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Get a list
   * @param uuid UUID of list
   * @returns Alist Return a list, data will depend on the list type
   * @throws ApiError
   */
  getListByUuid(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/alist/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        403: `User making request does not have access to the list in question`,
        404: `List is not in the system`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Update a list
   * @param uuid UUID of list
   * @param requestBody List to update
   * @returns Alist Return a list, data will depend on the list type
   * @throws ApiError
   */
  updateListByUuid(uuid, requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/alist/{uuid}",
      path: {
        "uuid": uuid
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `User making request does not have access to the list in question`,
        404: `List is not in the system`,
        422: `Input had no errors but was not valid`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Delete a list
   * @param uuid UUID of list
   * @returns HttpResponseMessage list deleted
   * @throws ApiError
   */
  deleteListByUuid(uuid) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/alist/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        403: `UUID does not match that of the logged in user`,
        404: `List is not in the system`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Query the lists the user has access to and apply jq filters to include or exclude rows (it does not return data, so aim to filter true or false)
   * @param requestBody A jq filter, if it runs in the command line, it should run here (using gojq), defaults to "true"
   * @returns Alist Return an array of lists
   * @throws ApiError
   */
  postSearchWithJq(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/alist/search/jq",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        500: `unexpected error`
      }
    });
  }
  /**
   * Get lists that I have created, or have been shared with me
   * @param labels Filter lists by one or many labels. "separated by ,". Default is empty
   * @param listType Filter lists by type v1, v2 etc. Default is empty
   * @param includeSystemLists Include or exclue lists created by the system for the user Default is 0
   * @returns Alist Return an array of lists
   * @throws ApiError
   */
  getListsByMe(labels, listType, includeSystemLists) {
    return this.httpRequest.request({
      method: "GET",
      url: "/alist/by/me",
      query: {
        "labels": labels,
        "list_type": listType,
        "include_system_lists": includeSystemLists
      },
      errors: {
        422: `Something wrong with the input`
      }
    });
  }
  /**
   * Set share access for a list
   * @param requestBody What type of sharing should be done
   * @returns HttpResponseMessage Share updated
   * @throws ApiError
   */
  shareList(requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/alist/share",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Your user needs to be the owner of the list`,
        404: `List is not in the system`,
        422: `Unable to share the list for different reasons`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Setting specific access for the user, a user can request access via action.
   * @param requestBody What type of sharing should be done
   * @returns HttpResponseMessage Access updated for a specific user based on permission
   * @throws ApiError
   */
  setListAccessForUser(requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/alist/share/access",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `List is not in the system`,
        403: `Your user needs to be the owner of the list`,
        404: `List is not in the system`,
        422: `Unable to share the list for different reasons`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Get list of users requesting raccess
   * @returns ShareListReadAccessRequest List of users waiting request access
   * @throws ApiError
   */
  v1GetShareListAccessRequest() {
    return this.httpRequest.request({
      method: "GET",
      url: "/alist/share/access/request",
      errors: {
        500: `unexpected error`
      }
    });
  }
};

// src/services/AppSettingsService.ts
var AppSettingsService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Enable or disable push notifications for spaced repetition in remindV1
   * @param requestBody Settings
   * @returns AppSettingsRemindV1 Settings updated
   * @throws ApiError
   */
  setRemindV1(requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/app-settings/remind_v1",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Something wrong with the payload`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/AssetService.ts
var AssetService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Set asset for public or private access
   * @param requestBody Share with...
   * @returns HttpResponseMessage Asset updated
   * @throws ApiError
   */
  shareAsset(requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/assets/share",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Most likely the wrong action`,
        403: `Access denied, due to not being owner of asset`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Upload asset and link it to the user logged in
   * @param formData File to upload
   * @returns HttpAssetUploadResponse Asset uploaded
   * @throws ApiError
   */
  addUserAsset(formData) {
    return this.httpRequest.request({
      method: "POST",
      url: "/assets/upload",
      formData,
      mediaType: "multipart/form-data",
      errors: {
        400: `Bad request, missing uuid`,
        500: `unexpected error`
      }
    });
  }
  /**
   * @param uuid UUID of entry
   * @returns any The asset.
   * @throws ApiError
   */
  getAsset(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/assets/{uuid}",
      path: {
        "uuid": uuid
      }
    });
  }
  /**
   * Deletes a single asset based on the UUID
   * @param uuid UUID of asset
   * @returns void
   * @throws ApiError
   */
  deleteAsset(uuid) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/assets/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        400: `Bad request, missing uuid`,
        403: `Access denied, due to not being owner of asset`,
        404: `Asset is not in the system`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/ChallengeService.ts
var ChallengeService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Create a new challenge
   * @param requestBody Setup a challenge
   * @returns ChallengeShortInfo Challenge created
   * @throws ApiError
   */
  createChallenge(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/challenge/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Most likely, the description is empty or the kind is not valid`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Get all challenges for a given user
   * @param userUuid userUUID to get challenges
   * @param kind Filter challenges by a single kind
   * @returns ChallengeShortInfo Return list of all challenges
   * @throws ApiError
   */
  getChallengesByUser(userUuid, kind) {
    return this.httpRequest.request({
      method: "GET",
      url: "/challenges/{userUUID}",
      path: {
        "userUUID": userUuid
      },
      query: {
        "kind": kind
      },
      errors: {
        403: `Lacking permission to look up the user`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Join a challenge
   * @param uuid UUID of entry
   * @returns any Join challenge
   * @throws ApiError
   */
  joinChallenge(uuid) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/challenge/{uuid}/join",
      path: {
        "uuid": uuid
      },
      errors: {
        400: `Bad request, missing uuid`,
        404: `Challenge doesn't exist`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Leave a challenge
   * @param uuid UUID of entry
   * @returns any Left challenge
   * @throws ApiError
   */
  leaveChallenge(uuid) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/challenge/{uuid}/leave",
      path: {
        "uuid": uuid
      },
      errors: {
        400: `Bad request, missing uuid`,
        403: `You can only leave a challenge you have joined`,
        404: `Challenge doesn't exist`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Get all challenge info, users and records
   * @param uuid UUID of entry
   * @returns ChallengeInfo Challenge info
   * @throws ApiError
   */
  getChallenge(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/challenge/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        403: `You can only lookup challenges that you have joined`,
        404: `Challenge doesn't exist`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Delete a challenge, forever
   * @param uuid UUID of entry
   * @returns HttpResponseMessage Challenge deleted
   * @throws ApiError
   */
  deleteChallenge(uuid) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/challenge/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        403: `You can only delete a challenge if you created it`,
        404: `Challenge doesn't exist`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/DefaultService.ts
var DefaultService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Get information about the server, linked to the git repo
   * @returns Version OK
   * @throws ApiError
   */
  getServerVersion() {
    return this.httpRequest.request({
      method: "GET",
      url: "/version"
    });
  }
};

// src/services/ListSlideshowService.ts
var ListSlideshowService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Add to the queue to have a custom slideshow made
   * @param kind Slideshow kind
   * @param requestBody Slideshow configuration
   * @returns Alist Success, slideshow is queued for creation
   * @throws ApiError
   */
  listSlideshowCreate(kind, requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/slideshow/create/{kind}",
      path: {
        "kind": kind
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `You do not have access to this list`,
        422: `Something wrong with the input`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/MobileService.ts
var MobileService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Register the user and the token, to be able to send push notifications
   * @param requestBody Device information
   * @returns HttpResponseMessage OK
   * @throws ApiError
   */
  registerDevice(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/mobile/register-device",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Most likely, the token is empty, or the app_identifier is [empty, not valid]`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/PaymentsService.ts
var PaymentsService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Get public information of stripe key + prices
   * @param tier Our tier name that then maps to a stripe product_id
   * @returns PaymentPriceData Public information of stripe key + prices
   * @throws ApiError
   */
  getStripeDataByTier(tier) {
    return this.httpRequest.request({
      method: "GET",
      url: "/payments/tier/{tier}/stripedata",
      path: {
        "tier": tier
      },
      errors: {
        403: `You need to be logged in to see the payment options`
      }
    });
  }
  /**
   * Get public information of stripe key + prices
   * @returns PaymentPriceData Public information of stripe key + prices
   * @throws ApiError
   */
  getStripeData() {
    return this.httpRequest.request({
      method: "GET",
      url: "/payments/stripedata",
      errors: {
        403: `You need to be logged in to see the payment options`
      }
    });
  }
  /**
   * Create a checkout session in the system
   * @param requestBody
   * @returns PaymentCheckoutSession Created session id
   * @throws ApiError
   */
  createCheckoutSession(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/payments/create-checkout-session",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `You need to be logged in to create a checkout session`
      }
    });
  }
  /**
   * Consume webhooks, today this only accepts webhooks from Stripe
   * @returns any Returns no content
   * @throws ApiError
   */
  postWebhook() {
    return this.httpRequest.request({
      method: "POST",
      url: "/payments/webhooks/stripe",
      errors: {
        400: `Error message from verifying the payload is from stripe`
      }
    });
  }
};

// src/services/PlankService.ts
var PlankService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Add plank stats
   * @param requestBody Stats about the plank
   * @param xChallenge Link plank record to a challenge uuid
   * @returns Plank Plank record already exists
   * @throws ApiError
   */
  addPlankEntry(requestBody, xChallenge) {
    return this.httpRequest.request({
      method: "POST",
      url: "/plank/",
      headers: {
        "x-challenge": xChallenge
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        500: `unexpected error`
      }
    });
  }
  /**
   * Get all planks for logged in user
   * @returns Plank Return list of all entries
   * @throws ApiError
   */
  getPlankHistoryByLoggedInUser() {
    return this.httpRequest.request({
      method: "GET",
      url: "/plank/history",
      errors: {
        500: `unexpected error`
      }
    });
  }
  /**
   * Get all planks for a given user, if not the logged in user, the history has to be shared.
   * @param uuid UUID of entry
   * @returns Plank Return list of all entries
   * @throws ApiError
   */
  getPlankHistoryByUser(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/plank/history/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        403: `You do not have access to read plank history for this user`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Delete a single entry based on the UUID
   * @param uuid UUID of entry
   * @returns HttpResponseMessage plank deleted
   * @throws ApiError
   */
  deletePlankEntry(uuid) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/plank/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        400: `Bad request, missing uuid`,
        404: `Not able to find plank record linked to this user`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Get plank stats for a given user, if not the logged in user, the stats has to be shared.
   * @param uuid UUID of entry
   * @returns PlankStats Return stats
   * @throws ApiError
   */
  getPlankStatsByUser(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/plank/stats/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        401: `You need to login to see these stats, if you have access`,
        403: `You do not have access to read plank stats for this user`,
        404: `Not able to find plank stats by user`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Share Plank stats with the public or keep them private
   * @param requestBody Share with the public or make private
   * @returns HttpResponseMessage Share updated
   * @throws ApiError
   */
  sharePlankStats(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/plank/stats/share",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The input was not valid`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Share Plank history with the public or keep them private
   * @param requestBody Share with the public or make private
   * @returns HttpResponseMessage Share updated
   * @throws ApiError
   */
  sharePlankHistory(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/plank/history/share",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The input was not valid`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/RemindService.ts
var RemindService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Set remind settings for app_identifier, if you have done an activity for that day, it will not count towards the motivation message
   * @param requestBody Remind settings
   * @returns RemindDailySettings Remind settings updated
   * @throws ApiError
   */
  setRemindDailySetting(requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/remind/daily/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Something wrong with the payload`,
        500: `unexpected error`
      }
    });
  }
  /**
   * @param appIdentifier Via app_identifier which settings to remove
   * @returns RemindDailySettings Settings
   * @throws ApiError
   */
  getRemindDailySettingsByAppIdentifier(appIdentifier) {
    return this.httpRequest.request({
      method: "GET",
      url: "/remind/daily/{app_identifier}",
      path: {
        "app_identifier": appIdentifier
      },
      errors: {
        404: `Settings not found`,
        422: `Check the app identifier is valid`
      }
    });
  }
  /**
   * @param appIdentifier Via app_identifier which settings to remove
   * @returns HttpResponseMessage settings deleted
   * @throws ApiError
   */
  deleteRemindDailySettingsByAppIdentifier(appIdentifier) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/remind/daily/{app_identifier}",
      path: {
        "app_identifier": appIdentifier
      },
      errors: {
        404: `app_identifier not found, I wonder if I want this one`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/SpacedRepetitionService.ts
var SpacedRepetitionService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Add entry for spaced based learning
   * @param requestBody Entry to add for spaced based learning
   * @returns SpacedRepetition Entry already exists
   * @throws ApiError
   */
  addSpacedRepetitionEntry(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/spaced-repetition/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Something wrong with the payload`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Deletes a single entry based on the UUID
   * @param uuid UUID of entry
   * @returns HttpResponseMessage entry deleted
   * @throws ApiError
   */
  deleteSpacedRepetitionEntry(uuid) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/spaced-repetition/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        400: `Bad request, missing uuid`,
        404: `Entry doesnt exist.`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Get all entries for spaced repetition learning
   * @returns SpacedRepetition Return list of all entries
   * @throws ApiError
   */
  getSpacedRepetitionEntries() {
    return this.httpRequest.request({
      method: "GET",
      url: "/spaced-repetition/all",
      errors: {
        500: `unexpected error`
      }
    });
  }
  /**
   * Get next entry for spaced based learning
   * @returns SpacedRepetition Return entry
   * @throws ApiError
   */
  getNextSpacedRepetitionEntry() {
    return this.httpRequest.request({
      method: "GET",
      url: "/spaced-repetition/next",
      errors: {
        404: `User has no entries.`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Update spaced entry with feedback from the user
   * @param requestBody Tell the system if we should move forward or backwards with the learning
   * @returns SpacedRepetition Entry updated
   * @throws ApiError
   */
  updateSpacedRepetitionEntry(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/spaced-repetition/viewed",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `Entry not found, no body`,
        422: `Something wrong with the payload`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Ugly light url to check if list active for this user.
   * @param uuid List UUID to check
   * @returns any List is active
   * @throws ApiError
   */
  spacedRepetitionOvertimeIsActive(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/spaced-repetition/overtime/active/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        404: `List is not active`
      }
    });
  }
  /**
   * Add for dripfeed (Slowly add this list for spaced repetition learning).
   * @param requestBody list to add to dripfeed
   * @returns SpacedRepetitionOvertimeInfo Success, list added to dripfeed
   * @throws ApiError
   */
  spacedRepetitionAddListToOvertime(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/spaced-repetition/overtime",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `You do not have access to read list`,
        404: `List not found`,
        422: `Something wrong with the input`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Remove list from dripfeed.
   * @param requestBody
   * @returns HttpResponseMessage Success, list removed
   * @throws ApiError
   */
  spacedRepetitionRemoveListFromOvertime(requestBody) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/spaced-repetition/overtime",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `You do not have access to do this action`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Stats for spaced repetition
   * @param uuid userUUID to check, today it is only for the logged in user
   * @returns SpacedRepetitionStats Stats
   * @throws ApiError
   */
  spacedRepetitionStats(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/spaced-repetition/stats/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        403: `You do not have access to do this action`,
        404: `No stats found`,
        500: `unexpected error`
      }
    });
  }
};

// src/services/UserService.ts
var UserService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Register a new user with username and password
   * @param requestBody Username and password
   * @param xUserRegister Restrict access to this endpoint, if you add the header and it matches the key, you are in.
   * @returns HttpUserRegisterResponse User already exists
   * @throws ApiError
   */
  registerUserWithUsernameAndPassword(requestBody, xUserRegister) {
    return this.httpRequest.request({
      method: "POST",
      url: "/user/register",
      headers: {
        "x-user-register": xUserRegister
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad request`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Given a token, confirm its valid and then return it in a cookie
   * @param requestBody A hack to be able to create a cookie from the server with a valid token
   * @returns HttpUserLoginResponse You now have a login session
   * @throws ApiError
   */
  tokenToCookie(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/user/token/to/cookie",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad input, most likely, invalid json`,
        403: `token not found or user_uuid not matching the token`,
        422: `Something wrong with the post data, token and user_uuid can not be empty`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Login with idToken, mostly to support mobile devices.
   * @param requestBody Based on the idp, we will verify your id_token and log you in.
   * @returns HttpUserLoginResponse You now have a login session
   * @throws ApiError
   */
  loginWithIdpIdToken(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/user/login/idp",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad input, most likely, invalid json`,
        403: `Missing data or invalid id_token`,
        422: `Idp not supported`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Login with username and password. The token can be used in future api requests via bearerAuth
   * @param requestBody Username and password
   * @returns HttpUserLoginResponse You now have a login session
   * @throws ApiError
   */
  loginWithUsernameAndPassword(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/user/login",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad request`,
        403: `Username and password did not match what was in the system`,
        500: `unexpected error`
      }
    });
  }
  /**
   * Get user information, app settings, preferences some user state
   * @param uuid UUID of user
   * @returns HttpUserInfoResponse user info has been changed
   * @throws ApiError
   */
  getUserInfo(uuid) {
    return this.httpRequest.request({
      method: "GET",
      url: "/user/info/{uuid}",
      path: {
        "uuid": uuid
      }
    });
  }
  /**
   * Single or many updates to the users information
   * @param uuid UUID of user to modify
   * @param requestBody Allowed attributes to update
   * @returns HttpResponseMessage user info has been changed
   * @throws ApiError
   */
  patchUserInfo(uuid, requestBody) {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/user/info/{uuid}",
      path: {
        "uuid": uuid
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        500: `unexpected error`
      }
    });
  }
  /**
   * Deletes a user and there lists
   * @param uuid UUID of entry
   * @returns HttpResponseMessage user deleted
   * @throws ApiError
   */
  deleteUser(uuid) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/user/{uuid}",
      path: {
        "uuid": uuid
      },
      errors: {
        403: `UUID does not match that of the logged in user`,
        500: `unexpected error`
      }
    });
  }
};

// src/OpenApiClient.ts
var OpenApiClient = class {
  aList;
  appSettings;
  asset;
  challenge;
  default;
  listSlideshow;
  mobile;
  payments;
  plank;
  remind;
  spacedRepetition;
  user;
  request;
  constructor(config, HttpRequest = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: (config == null ? void 0 : config.BASE) ?? "https://learnalist.net/api/v1",
      VERSION: (config == null ? void 0 : config.VERSION) ?? "1.0",
      WITH_CREDENTIALS: (config == null ? void 0 : config.WITH_CREDENTIALS) ?? false,
      CREDENTIALS: (config == null ? void 0 : config.CREDENTIALS) ?? "include",
      TOKEN: config == null ? void 0 : config.TOKEN,
      USERNAME: config == null ? void 0 : config.USERNAME,
      PASSWORD: config == null ? void 0 : config.PASSWORD,
      HEADERS: config == null ? void 0 : config.HEADERS,
      ENCODE_PATH: config == null ? void 0 : config.ENCODE_PATH
    });
    this.aList = new AListService(this.request);
    this.appSettings = new AppSettingsService(this.request);
    this.asset = new AssetService(this.request);
    this.challenge = new ChallengeService(this.request);
    this.default = new DefaultService(this.request);
    this.listSlideshow = new ListSlideshowService(this.request);
    this.mobile = new MobileService(this.request);
    this.payments = new PaymentsService(this.request);
    this.plank = new PlankService(this.request);
    this.remind = new RemindService(this.request);
    this.spacedRepetition = new SpacedRepetitionService(this.request);
    this.user = new UserService(this.request);
  }
};

// src/core/OpenAPI.ts
var OpenAPI = {
  BASE: "https://learnalist.net/api/v1",
  VERSION: "1.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
};
export {
  AListService,
  ApiError,
  AppSettingsService,
  AssetService,
  BaseHttpRequest,
  CancelError,
  CancelablePromise,
  ChallengeService,
  DefaultService,
  ListSlideshowService,
  MobileService,
  OpenAPI,
  OpenApiClient,
  PaymentsService,
  PlankService,
  RemindService,
  SpacedRepetitionService,
  UserService
};
//# sourceMappingURL=index.mjs.map