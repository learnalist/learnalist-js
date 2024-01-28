type ApiRequestOptions = {
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    readonly url: string;
    readonly path?: Record<string, any>;
    readonly cookies?: Record<string, any>;
    readonly headers?: Record<string, any>;
    readonly query?: Record<string, any>;
    readonly formData?: Record<string, any>;
    readonly body?: any;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};

declare class CancelError extends Error {
    constructor(message: string);
    get isCancelled(): boolean;
}
interface OnCancel {
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isCancelled: boolean;
    (cancelHandler: () => void): void;
}
declare class CancelablePromise<T> implements Promise<T> {
    #private;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void, onCancel: OnCancel) => void);
    get [Symbol.toStringTag](): string;
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null): Promise<T>;
    cancel(): void;
    get isCancelled(): boolean;
}

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;
type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
};
declare const OpenAPI: OpenAPIConfig;

declare abstract class BaseHttpRequest {
    readonly config: OpenAPIConfig;
    constructor(config: OpenAPIConfig);
    abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}

/**
 * Give context of where this list was imported / synced from, if it is quizlet, cram, brainscape it is not possible to make this list public
 */
type AlistFrom = {
    /**
     * Context of where it came from, when coming from quizlet, cram, brainscape, it is not possible to make the list public.
     */
    kind: 'quizlet' | 'cram' | 'brainscape' | 'learnalist';
    ext_uuid: string;
    ref_url: string;
};

type AlistInteract = {
    slideshow?: number;
    totalrecall?: number;
};

type AlistInfo = {
    title: string;
    type: string;
    labels?: Array<string>;
    shared_with?: 'private' | 'friends' | 'public';
    system?: {
        created: boolean;
    };
    interact?: AlistInteract;
    from?: AlistFrom;
};

type AlistItemV1 = string;

type AlistV1New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v1';
    info: AlistInfo;
    data: Array<AlistItemV1>;
};

type AlistV1 = ({
    uuid?: string;
} & AlistV1New & {
    uuid: string;
});

type AlistItemV2 = {
    from: string;
    to: string;
};

type AlistV2New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v2';
    info: AlistInfo;
    data: Array<AlistItemV2>;
};

type AlistV2 = ({
    uuid?: string;
} & AlistV2New & {
    uuid: string;
});

type AlistItemImage = {
    /**
     * Where to find the image, locally or on the internet
     */
    uri: string;
    /**
     * hash of the contents of the file
     */
    hash?: string;
    width: number;
    height: number;
};

type AlistItemPOI = {
    'x': number;
    'y': number;
};

type AlistItemV5 = {
    image: AlistItemImage;
    poi?: AlistItemPOI;
    annotation: string;
};

type AlistV5New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v5';
    info: AlistInfo;
    data: Array<AlistItemV5>;
};

type AlistV5 = ({
    uuid?: string;
} & AlistV5New & {
    uuid: string;
});

type AlistItemV6 = {
    image: AlistItemImage;
    poi?: AlistItemPOI;
    annotation: AlistItemV2;
};

type AlistV6New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v6';
    info: AlistInfo;
    data: Array<AlistItemV6>;
};

type AlistV6 = ({
    uuid?: string;
} & AlistV6New & {
    uuid: string;
});

type ListSlideShowCMDConfigPDFV1Input = {
    title?: string;
    alist_uuid: string;
    kind: string;
    /**
     * Share pdf with others. Currently will only work with private
     */
    shared_with?: 'private';
};

type ListSlideShowStateStatus = 'unknown' | 'finished' | 'failed';

type ListSlideShowState = {
    status: ListSlideShowStateStatus;
    message: string;
    /**
     * Set to UTC
     */
    when: string;
};

type AlistItemV7 = {
    asset: string;
    config: ListSlideShowCMDConfigPDFV1Input;
    state: ListSlideShowState;
};

type AlistV7New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v7';
    info: AlistInfo;
    data: AlistItemV7;
};

type AlistV7 = ({
    uuid?: string;
} & AlistV7New & {
    uuid: string;
});

type ListSlideShowCMDConfigVideoV1Input = {
    title?: string;
    alist_uuid: string;
    kind: string;
    /**
     * duration per slide / item or one entry to be applied to all
     */
    duration: Array<string>;
    /**
     * Share video with others. Currently will only work with private
     */
    shared_with?: 'private';
};

type AlistItemV8 = {
    asset: string;
    config: ListSlideShowCMDConfigVideoV1Input;
    state: ListSlideShowState;
};

type AlistV8New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v8';
    info: AlistInfo;
    data: AlistItemV8;
};

type AlistV8 = ({
    uuid?: string;
} & AlistV8New & {
    uuid: string;
});

type Alist = (AlistV1 | AlistV2 | AlistV5 | AlistV6 | AlistV7 | AlistV8);

type AlistInput = (AlistV1New | AlistV2New | AlistV5New | AlistV6New | AlistV7New | AlistV8New);

type HttpResponseMessage = {
    message: string;
};

/**
 * Set the share option on a list. When private it means only the owner of the list.
 */
type ShareListInput = {
    alist_uuid: string;
    action: 'private' | 'friends' | 'public';
};

/**
 * Able to give a user fine grain access, in conjuction with ShareListInput.
 */
type ShareListWithUserInput = {
    user_uuid: string;
    alist_uuid: string;
    action: 'grant' | 'revoke' | 'request';
    permission: 'read' | 'write';
};

/**
 * List of users waiting read access
 */
type ShareListReadAccessRequest = {
    request: Array<ShareListWithUserInput>;
};

declare class AListService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * add a new list
     * @param requestBody A list object
     * @returns Alist List has been created
     * @throws ApiError
     */
    addList(requestBody: AlistInput): CancelablePromise<Alist>;
    /**
     * Get a list
     * @param uuid UUID of list
     * @returns Alist Return a list, data will depend on the list type
     * @throws ApiError
     */
    getListByUuid(uuid: string): CancelablePromise<Alist>;
    /**
     * Update a list
     * @param uuid UUID of list
     * @param requestBody List to update
     * @returns Alist Return a list, data will depend on the list type
     * @throws ApiError
     */
    updateListByUuid(uuid: string, requestBody: Alist): CancelablePromise<Alist>;
    /**
     * Delete a list
     * @param uuid UUID of list
     * @returns HttpResponseMessage list deleted
     * @throws ApiError
     */
    deleteListByUuid(uuid: string): CancelablePromise<HttpResponseMessage>;
    /**
     * Query the lists the user has access to and apply jq filters to include or exclude rows (it does not return data, so aim to filter true or false)
     * @param requestBody A jq filter, if it runs in the command line, it should run here (using gojq), defaults to "true"
     * @returns Alist Return an array of lists
     * @throws ApiError
     */
    postSearchWithJq(requestBody?: string): CancelablePromise<Array<Alist>>;
    /**
     * Get lists that I have created, or have been shared with me
     * @param labels Filter lists by one or many labels. "separated by ,". Default is empty
     * @param listType Filter lists by type v1, v2 etc. Default is empty
     * @param includeSystemLists Include or exclue lists created by the system for the user Default is 0
     * @returns Alist Return an array of lists
     * @throws ApiError
     */
    getListsByMe(labels?: string, listType?: string, includeSystemLists?: 0 | 1): CancelablePromise<Array<Alist>>;
    /**
     * Set share access for a list
     * @param requestBody What type of sharing should be done
     * @returns HttpResponseMessage Share updated
     * @throws ApiError
     */
    shareList(requestBody: ShareListInput): CancelablePromise<HttpResponseMessage>;
    /**
     * Setting specific access for the user, a user can request access via action.
     * @param requestBody What type of sharing should be done
     * @returns HttpResponseMessage Access updated for a specific user based on permission
     * @throws ApiError
     */
    setListAccessForUser(requestBody: ShareListWithUserInput): CancelablePromise<HttpResponseMessage>;
    /**
     * Get list of users requesting raccess
     * @returns ShareListReadAccessRequest List of users waiting request access
     * @throws ApiError
     */
    v1GetShareListAccessRequest(): CancelablePromise<ShareListReadAccessRequest>;
}

type AppSettingsRemindV1 = {
    spaced_repetition: {
        /**
         * Enable push notifications
         */
        push_enabled: number;
    };
};

declare class AppSettingsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Enable or disable push notifications for spaced repetition in remindV1
     * @param requestBody Settings
     * @returns AppSettingsRemindV1 Settings updated
     * @throws ApiError
     */
    setRemindV1(requestBody: AppSettingsRemindV1): CancelablePromise<AppSettingsRemindV1>;
}

type HttpAssetShareRequestBody = {
    uuid: string;
    action?: 'private' | 'public';
};

type HttpAssetUploadRequestBody = {
    shared_with?: 'private' | 'public';
    file: Blob;
};

type HttpAssetUploadResponse = {
    href: string;
    uuid: string;
    ext: string;
};

declare class AssetService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Set asset for public or private access
     * @param requestBody Share with...
     * @returns HttpResponseMessage Asset updated
     * @throws ApiError
     */
    shareAsset(requestBody: HttpAssetShareRequestBody): CancelablePromise<HttpResponseMessage>;
    /**
     * Upload asset and link it to the user logged in
     * @param formData File to upload
     * @returns HttpAssetUploadResponse Asset uploaded
     * @throws ApiError
     */
    addUserAsset(formData: HttpAssetUploadRequestBody): CancelablePromise<HttpAssetUploadResponse>;
    /**
     * @param uuid UUID of entry
     * @returns any The asset.
     * @throws ApiError
     */
    getAsset(uuid: string): CancelablePromise<any>;
    /**
     * Deletes a single asset based on the UUID
     * @param uuid UUID of asset
     * @returns void
     * @throws ApiError
     */
    deleteAsset(uuid: string): CancelablePromise<void>;
}

type Plank = {
    uuid?: string;
    showIntervals: boolean;
    intervalTime: number;
    beginningTime: number;
    currentTime: number;
    timerNow: number;
    intervalTimerNow: number;
    laps: number;
};

type ChallengePlankRecord = (Plank & {
    /**
     * User uuid
     */
    user_uuid?: string;
});

type ChallengeInput = {
    /**
     * Look at ChallengeKind for supported kinds
     */
    kind: string;
    description: string;
};

type ChallengeShortInfo = (ChallengeInput & {
    /**
     * Set to UTC
     */
    created?: string;
    /**
     * User who created the challenge
     */
    created_by?: string;
    uuid?: string;
} & {
    /**
     * User who created the challenge
     */
    created_by: string;
    uuid: string;
});

type ChallengeInfo = (ChallengeShortInfo & {
    /**
     * List of users
     */
    users?: Array<{
        /**
         * User uuid
         */
        user_uuid?: string;
        /**
         * Name the user wants for this challenge
         */
        name?: string;
    }>;
    /**
     * List of records, specific to the kind
     */
    records?: Array<ChallengePlankRecord>;
} & {
    /**
     * List of users
     */
    users: Array<{
        /**
         * User uuid
         */
        user_uuid?: string;
        /**
         * Name the user wants for this challenge
         */
        name?: string;
    }>;
    /**
     * List of records, specific to the kind
     */
    records: Array<ChallengePlankRecord>;
});

type ChallengeKind = 'plank-group' | 'na';

declare class ChallengeService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Create a new challenge
     * @param requestBody Setup a challenge
     * @returns ChallengeShortInfo Challenge created
     * @throws ApiError
     */
    createChallenge(requestBody: ChallengeInput): CancelablePromise<ChallengeShortInfo>;
    /**
     * Get all challenges for a given user
     * @param userUuid userUUID to get challenges
     * @param kind Filter challenges by a single kind
     * @returns ChallengeShortInfo Return list of all challenges
     * @throws ApiError
     */
    getChallengesByUser(userUuid: string, kind?: ChallengeKind): CancelablePromise<Array<ChallengeShortInfo>>;
    /**
     * Join a challenge
     * @param uuid UUID of entry
     * @returns any Join challenge
     * @throws ApiError
     */
    joinChallenge(uuid: string): CancelablePromise<any>;
    /**
     * Leave a challenge
     * @param uuid UUID of entry
     * @returns any Left challenge
     * @throws ApiError
     */
    leaveChallenge(uuid: string): CancelablePromise<any>;
    /**
     * Get all challenge info, users and records
     * @param uuid UUID of entry
     * @returns ChallengeInfo Challenge info
     * @throws ApiError
     */
    getChallenge(uuid: string): CancelablePromise<ChallengeInfo>;
    /**
     * Delete a challenge, forever
     * @param uuid UUID of entry
     * @returns HttpResponseMessage Challenge deleted
     * @throws ApiError
     */
    deleteChallenge(uuid: string): CancelablePromise<HttpResponseMessage>;
}

type Version = {
    gitHash: string;
    gitDate: string;
    version: string;
    url: string;
};

declare class DefaultService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get information about the server, linked to the git repo
     * @returns Version OK
     * @throws ApiError
     */
    getServerVersion(): CancelablePromise<Version>;
}

declare class ListSlideshowService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Add to the queue to have a custom slideshow made
     * @param kind Slideshow kind
     * @param requestBody Slideshow configuration
     * @returns Alist Success, slideshow is queued for creation
     * @throws ApiError
     */
    listSlideshowCreate(kind: 'pdf' | 'video', requestBody: (ListSlideShowCMDConfigPDFV1Input | ListSlideShowCMDConfigVideoV1Input)): CancelablePromise<Alist>;
}

type HttpMobileRegisterInput = {
    /**
     * FCM token linked to the device
     */
    token: string;
    /**
     * A unique identifier to allow the system to link a user with an app and use the correct token.
     */
    app_identifier: 'plank_v1' | 'remind_v1';
};

declare class MobileService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Register the user and the token, to be able to send push notifications
     * @param requestBody Device information
     * @returns HttpResponseMessage OK
     * @throws ApiError
     */
    registerDevice(requestBody: HttpMobileRegisterInput): CancelablePromise<HttpResponseMessage>;
}

type PaymentCheckoutSession = {
    sessionId: string;
};

/**
 * Price option, used with stripe
 */
type PaymentPriceOption = {
    id: string;
    currency: string;
    unit_amount: number;
    human_amount: number;
};

type PaymentPriceData = {
    key: string;
    options: Array<PaymentPriceOption>;
};

type PaymentSupportV1Input = {
    price_id: string;
};

declare class PaymentsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get public information of stripe key + prices
     * @param tier Our tier name that then maps to a stripe product_id
     * @returns PaymentPriceData Public information of stripe key + prices
     * @throws ApiError
     */
    getStripeDataByTier(tier: string): CancelablePromise<PaymentPriceData>;
    /**
     * Get public information of stripe key + prices
     * @returns PaymentPriceData Public information of stripe key + prices
     * @throws ApiError
     */
    getStripeData(): CancelablePromise<PaymentPriceData>;
    /**
     * Create a checkout session in the system
     * @param requestBody
     * @returns PaymentCheckoutSession Created session id
     * @throws ApiError
     */
    createCheckoutSession(requestBody: PaymentSupportV1Input): CancelablePromise<PaymentCheckoutSession>;
    /**
     * Consume webhooks, today this only accepts webhooks from Stripe
     * @returns any Returns no content
     * @throws ApiError
     */
    postWebhook(): CancelablePromise<any>;
}

type HttpPlankShareRequestBody = {
    action: 'private' | 'public';
};

type PlankStreakStat = {
    /**
     * How many days in a row has this user planked for
     */
    streak?: number;
    /**
     * When did the streak start
     */
    startDate?: string;
    /**
     * When did the streak end or today
     */
    endDate?: string;
};

/**
 * List of streak data
 */
type PlankStats = {
    streaks: Array<PlankStreakStat>;
};

declare class PlankService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Add plank stats
     * @param requestBody Stats about the plank
     * @param xChallenge Link plank record to a challenge uuid
     * @returns Plank Plank record already exists
     * @throws ApiError
     */
    addPlankEntry(requestBody: Plank, xChallenge?: string): CancelablePromise<Plank>;
    /**
     * Get all planks for logged in user
     * @returns Plank Return list of all entries
     * @throws ApiError
     */
    getPlankHistoryByLoggedInUser(): CancelablePromise<Array<Plank>>;
    /**
     * Get all planks for a given user, if not the logged in user, the history has to be shared.
     * @param uuid UUID of entry
     * @returns Plank Return list of all entries
     * @throws ApiError
     */
    getPlankHistoryByUser(uuid: string): CancelablePromise<Array<Plank>>;
    /**
     * Delete a single entry based on the UUID
     * @param uuid UUID of entry
     * @returns HttpResponseMessage plank deleted
     * @throws ApiError
     */
    deletePlankEntry(uuid: string): CancelablePromise<HttpResponseMessage>;
    /**
     * Get plank stats for a given user, if not the logged in user, the stats has to be shared.
     * @param uuid UUID of entry
     * @returns PlankStats Return stats
     * @throws ApiError
     */
    getPlankStatsByUser(uuid: string): CancelablePromise<PlankStats>;
    /**
     * Share Plank stats with the public or keep them private
     * @param requestBody Share with the public or make private
     * @returns HttpResponseMessage Share updated
     * @throws ApiError
     */
    sharePlankStats(requestBody: HttpPlankShareRequestBody): CancelablePromise<HttpResponseMessage>;
    /**
     * Share Plank history with the public or keep them private
     * @param requestBody Share with the public or make private
     * @returns HttpResponseMessage Share updated
     * @throws ApiError
     */
    sharePlankHistory(requestBody: HttpPlankShareRequestBody): CancelablePromise<HttpResponseMessage>;
}

type RemindDailySettings = {
    /**
     * Time of day HH:MM
     */
    time_of_day: string;
    /**
     * Timezone
     */
    tz: string;
    /**
     * Which app to link this too
     */
    app_identifier: string;
    /**
     * Which medium, look at RemindMedium
     */
    medium: Array<string>;
};

declare class RemindService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Set remind settings for app_identifier, if you have done an activity for that day, it will not count towards the motivation message
     * @param requestBody Remind settings
     * @returns RemindDailySettings Remind settings updated
     * @throws ApiError
     */
    setRemindDailySetting(requestBody: RemindDailySettings): CancelablePromise<RemindDailySettings>;
    /**
     * @param appIdentifier Via app_identifier which settings to remove
     * @returns RemindDailySettings Settings
     * @throws ApiError
     */
    getRemindDailySettingsByAppIdentifier(appIdentifier: string): CancelablePromise<RemindDailySettings>;
    /**
     * @param appIdentifier Via app_identifier which settings to remove
     * @returns HttpResponseMessage settings deleted
     * @throws ApiError
     */
    deleteRemindDailySettingsByAppIdentifier(appIdentifier: string): CancelablePromise<HttpResponseMessage>;
}

type AlistItemEarthPosition = {
    /**
     * Latitude
     */
    lat: number;
    /**
     * Longitude
     */
    long: number;
};

type AlistItemMeta = {
    position?: AlistItemEarthPosition;
};

type SpacedRepetitionBaseNew = {
    show: string;
    kind: string;
    metadata?: AlistItemMeta;
};

type SpacedRepetitionBase = (SpacedRepetitionBaseNew & {
    uuid?: string;
} & {
    uuid: string;
});

type SpacedRepetitionBaseSettings = {
    level: string;
    /**
     * Set to UTC
     */
    when_next: string;
    /**
     * Set to UTC
     */
    created?: string;
    /**
     * Usually a reference to something meaningful to the creator of it
     */
    ext_id?: string;
};

type SpacedRepetitionV1New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV1;
    settings?: SpacedRepetitionBaseSettings;
} & {
    data: AlistItemV1;
    settings: SpacedRepetitionBaseSettings;
});

type SpacedRepetitionV1 = (SpacedRepetitionV1New & SpacedRepetitionBase);

type SpacedRepetitionBaseSettingsShow = {
    show: string;
};

type SpacedRepetitionSettingsV2 = (SpacedRepetitionBaseSettingsShow & SpacedRepetitionBaseSettings);

type SpacedRepetitionV2New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV2;
    settings?: SpacedRepetitionSettingsV2;
} & {
    data: AlistItemV2;
    settings: SpacedRepetitionSettingsV2;
});

type SpacedRepetitionV2 = (SpacedRepetitionV2New & SpacedRepetitionBase);

type SpacedRepetitionV5New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV5;
    settings?: SpacedRepetitionBaseSettings;
} & {
    data: AlistItemV5;
    settings: SpacedRepetitionBaseSettings;
});

type SpacedRepetitionV5 = (SpacedRepetitionV5New & SpacedRepetitionBase);

type SpacedRepetitionSettingsV6 = (SpacedRepetitionBaseSettingsShow & SpacedRepetitionBaseSettings);

type SpacedRepetitionV6New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV6;
    settings?: SpacedRepetitionSettingsV6;
} & {
    data: AlistItemV6;
    settings: SpacedRepetitionSettingsV6;
});

type SpacedRepetitionV6 = (SpacedRepetitionV6New & SpacedRepetitionBase);

type SpacedRepetition = (SpacedRepetitionV1 | SpacedRepetitionV2 | SpacedRepetitionV5 | SpacedRepetitionV6);

type SpacedRepetitionEntryViewed = {
    uuid: string;
    action: 'incr' | 'decr' | 'restart';
};

type SpacedRepetitionNew = (SpacedRepetitionV1New | SpacedRepetitionV2New | SpacedRepetitionV5New | SpacedRepetitionV6New);

type SpacedRepetitionOvertimeInfo = {
    dripfeed_uuid: string;
    alist_uuid: string;
    user_uuid: string;
};

type SpacedRepetitionOvertimeInputBase = {
    /**
     * List type / kind
     */
    kind: string;
    /**
     * List UUID that you want to add
     */
    alist_uuid: string;
    /**
     * User needs to match the one you are logged in with (today)
     */
    user_uuid: string;
};

type SpacedRepetitionOvertimeInputV1 = SpacedRepetitionOvertimeInputBase;

type SpacedRepetitionOvertimeInputV2 = ({
    settings?: {
        show: string;
    };
} & SpacedRepetitionOvertimeInputBase & {
    settings: {
        show: string;
    };
});

type SpacedRepetitionOvertimeInput = (SpacedRepetitionOvertimeInputV1 | SpacedRepetitionOvertimeInputV2);

type SpacedRepetitionStatsActivityAction = {
    action: string;
    total: number;
};

type SpacedRepetitionStatsActivityInfo = {
    day: string;
    actions: Array<SpacedRepetitionStatsActivityAction>;
};

type SpacedRepetitionStatsStreakInfo = {
    start: string;
    end: string;
    streak: number;
};

type SpacedRepetitionStats = {
    /**
     * Set to UTC
     */
    last_activity_created: string;
    latest_streak: {
        day1?: SpacedRepetitionStatsStreakInfo;
        day3?: SpacedRepetitionStatsStreakInfo;
        day5?: SpacedRepetitionStatsStreakInfo;
        week1?: SpacedRepetitionStatsStreakInfo;
    };
    last_7days: Array<SpacedRepetitionStatsActivityInfo>;
};

declare class SpacedRepetitionService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Add entry for spaced based learning
     * @param requestBody Entry to add for spaced based learning
     * @returns SpacedRepetition Entry already exists
     * @throws ApiError
     */
    addSpacedRepetitionEntry(requestBody: SpacedRepetitionNew): CancelablePromise<SpacedRepetition>;
    /**
     * Deletes a single entry based on the UUID
     * @param uuid UUID of entry
     * @returns HttpResponseMessage entry deleted
     * @throws ApiError
     */
    deleteSpacedRepetitionEntry(uuid: string): CancelablePromise<HttpResponseMessage>;
    /**
     * Get all entries for spaced repetition learning
     * @returns SpacedRepetition Return list of all entries
     * @throws ApiError
     */
    getSpacedRepetitionEntries(): CancelablePromise<Array<SpacedRepetition>>;
    /**
     * Get next entry for spaced based learning
     * @returns SpacedRepetition Return entry
     * @throws ApiError
     */
    getNextSpacedRepetitionEntry(): CancelablePromise<SpacedRepetition>;
    /**
     * Update spaced entry with feedback from the user
     * @param requestBody Tell the system if we should move forward or backwards with the learning
     * @returns SpacedRepetition Entry updated
     * @throws ApiError
     */
    updateSpacedRepetitionEntry(requestBody: SpacedRepetitionEntryViewed): CancelablePromise<SpacedRepetition>;
    /**
     * Ugly light url to check if list active for this user.
     * @param uuid List UUID to check
     * @returns any List is active
     * @throws ApiError
     */
    spacedRepetitionOvertimeIsActive(uuid: string): CancelablePromise<any>;
    /**
     * Add for dripfeed (Slowly add this list for spaced repetition learning).
     * @param requestBody list to add to dripfeed
     * @returns SpacedRepetitionOvertimeInfo Success, list added to dripfeed
     * @throws ApiError
     */
    spacedRepetitionAddListToOvertime(requestBody: SpacedRepetitionOvertimeInput): CancelablePromise<SpacedRepetitionOvertimeInfo>;
    /**
     * Remove list from dripfeed.
     * @param requestBody
     * @returns HttpResponseMessage Success, list removed
     * @throws ApiError
     */
    spacedRepetitionRemoveListFromOvertime(requestBody: SpacedRepetitionOvertimeInputBase): CancelablePromise<HttpResponseMessage>;
    /**
     * Stats for spaced repetition
     * @param uuid userUUID to check, today it is only for the logged in user
     * @returns SpacedRepetitionStats Stats
     * @throws ApiError
     */
    spacedRepetitionStats(uuid: string): CancelablePromise<SpacedRepetitionStats>;
}

type HttpTokenToCookieRequest = {
    token: string;
    user_uuid: string;
};

type HttpUserInfoInput = {
    /**
     * This will be used to address you in the app(s) or website.
     */
    display_name?: string;
    /**
     * Let the server know the user was created via the plank app.
     */
    created_via?: 'plank.app.v1' | 'na';
    /**
     * Give this user the ability to write public lists
     */
    grant_public_list_write_access?: string;
};

type HttpUserInfoResponse = {
    user_uuid?: string;
    display_name?: string;
    daily_reminder?: {
        remind_v1?: RemindDailySettings;
        plank_v1?: RemindDailySettings;
    };
    app_settings?: {
        remind_v1?: AppSettingsRemindV1;
    };
    spaced_repetition?: {
        lists_overtime?: Array<string>;
    };
    plank?: {
        share_history?: 'public' | 'private';
        share_stats?: 'public' | 'private';
    };
    acl?: {
        list_public_write?: number;
    };
};

type HttpUserLoginIDPInput = {
    idp: 'google' | 'apple';
    /**
     * We will verify this to confirm your identity and create an account linked to your id.
     */
    id_token?: string;
    /**
     * Code from the server, part of a possible handshake
     */
    code?: string;
};

type HttpUserRegisterInput = {
    username: string;
    password: string;
    extra?: HttpUserInfoInput;
};

type HttpUserLoginRequest = HttpUserRegisterInput;

type HttpUserLoginResponse = {
    token: string;
    user_uuid: string;
};

type HttpUserRegisterResponse = {
    username: string;
    uuid: string;
};

declare class UserService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Register a new user with username and password
     * @param requestBody Username and password
     * @param xUserRegister Restrict access to this endpoint, if you add the header and it matches the key, you are in.
     * @returns HttpUserRegisterResponse User already exists
     * @throws ApiError
     */
    registerUserWithUsernameAndPassword(requestBody: HttpUserRegisterInput, xUserRegister?: string): CancelablePromise<HttpUserRegisterResponse>;
    /**
     * Given a token, confirm its valid and then return it in a cookie
     * @param requestBody A hack to be able to create a cookie from the server with a valid token
     * @returns HttpUserLoginResponse You now have a login session
     * @throws ApiError
     */
    tokenToCookie(requestBody: HttpTokenToCookieRequest): CancelablePromise<HttpUserLoginResponse>;
    /**
     * Login with idToken, mostly to support mobile devices.
     * @param requestBody Based on the idp, we will verify your id_token and log you in.
     * @returns HttpUserLoginResponse You now have a login session
     * @throws ApiError
     */
    loginWithIdpIdToken(requestBody: HttpUserLoginIDPInput): CancelablePromise<HttpUserLoginResponse>;
    /**
     * Login with username and password. The token can be used in future api requests via bearerAuth
     * @param requestBody Username and password
     * @returns HttpUserLoginResponse You now have a login session
     * @throws ApiError
     */
    loginWithUsernameAndPassword(requestBody: HttpUserLoginRequest): CancelablePromise<HttpUserLoginResponse>;
    /**
     * Get user information, app settings, preferences some user state
     * @param uuid UUID of user
     * @returns HttpUserInfoResponse user info has been changed
     * @throws ApiError
     */
    getUserInfo(uuid: string): CancelablePromise<HttpUserInfoResponse>;
    /**
     * Single or many updates to the users information
     * @param uuid UUID of user to modify
     * @param requestBody Allowed attributes to update
     * @returns HttpResponseMessage user info has been changed
     * @throws ApiError
     */
    patchUserInfo(uuid: string, requestBody: HttpUserInfoInput): CancelablePromise<HttpResponseMessage>;
    /**
     * Deletes a user and there lists
     * @param uuid UUID of entry
     * @returns HttpResponseMessage user deleted
     * @throws ApiError
     */
    deleteUser(uuid: string): CancelablePromise<HttpResponseMessage>;
}

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
declare class OpenApiClient {
    readonly aList: AListService;
    readonly appSettings: AppSettingsService;
    readonly asset: AssetService;
    readonly challenge: ChallengeService;
    readonly default: DefaultService;
    readonly listSlideshow: ListSlideshowService;
    readonly mobile: MobileService;
    readonly payments: PaymentsService;
    readonly plank: PlankService;
    readonly remind: RemindService;
    readonly spacedRepetition: SpacedRepetitionService;
    readonly user: UserService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}

type ApiResult = {
    readonly url: string;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
};

declare class ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
    readonly request: ApiRequestOptions;
    constructor(request: ApiRequestOptions, response: ApiResult, message: string);
}

type Kind = {
    kind: string;
};

/**
 * Config for the command line tool, shared attributes
 */
type ListSlideShowCMDConfig = {
    cliBootstrap: {
        /**
         * output directory for where to write the slideshow files and asset
         */
        dir: string;
        /**
         * path to the node script that will trigger the creation of the slideshow
         */
        entrypoint: string;
        pathToPdfGenerator: string;
        debug: boolean;
        insecureHttps: boolean;
    };
    /**
     * Slideshow uuid == alist uuid
     */
    slideshow_uuid: string;
    server: string;
    auth: {
        user_uuid: string;
        token: string;
    };
    config: Record<string, any>;
};

/**
 * Information linking a mobile device and app to a user
 */
type MobileDeviceInfo = ({
    user_uuid?: string;
} & HttpMobileRegisterInput & {
    user_uuid: string;
});

/**
 * Settings for the plank app version 1
 */
type MobilePlankAppV1Settings = {
    showIntervals: boolean;
    intervalTime: number;
};

/**
 * What medium do you want the reminder sent via
 */
type RemindMedium = 'push' | 'email';

type SpacedRepetitionDataV1 = string;

type SpacedRepetitionSettingsV1 = SpacedRepetitionBaseSettings;

type SpacedRepetitionSettingsV5 = SpacedRepetitionBaseSettings;

type TierDataCMD = {
    kind: 'cmd';
    uuid: string;
    action: 'grant' | 'revoke' | 'request';
    data: {
        tier: string;
        user_uuid: string;
        /**
         * Set to UTC
         */
        when: string;
    };
};

type TierDataStripe = {
    kind: 'stripe';
    uuid: string;
    action: 'grant' | 'revoke' | 'request';
    data: {
        event_id: string;
        price_id: string;
        product_id: string;
        payment_intent_id: string;
        tier: string;
        user_uuid: string;
        /**
         * Set to UTC
         */
        when: string;
    };
};

type TierData = (TierDataStripe | TierDataCMD);

export { AListService, type Alist, type AlistFrom, type AlistInfo, type AlistInput, type AlistInteract, type AlistItemEarthPosition, type AlistItemImage, type AlistItemMeta, type AlistItemPOI, type AlistItemV1, type AlistItemV2, type AlistItemV5, type AlistItemV6, type AlistItemV7, type AlistItemV8, type AlistV1, type AlistV1New, type AlistV2, type AlistV2New, type AlistV5, type AlistV5New, type AlistV6, type AlistV6New, type AlistV7, type AlistV7New, type AlistV8, type AlistV8New, ApiError, type AppSettingsRemindV1, AppSettingsService, AssetService, BaseHttpRequest, CancelError, CancelablePromise, type ChallengeInfo, type ChallengeInput, type ChallengeKind, type ChallengePlankRecord, ChallengeService, type ChallengeShortInfo, DefaultService, type HttpAssetShareRequestBody, type HttpAssetUploadRequestBody, type HttpAssetUploadResponse, type HttpMobileRegisterInput, type HttpPlankShareRequestBody, type HttpResponseMessage, type HttpTokenToCookieRequest, type HttpUserInfoInput, type HttpUserInfoResponse, type HttpUserLoginIDPInput, type HttpUserLoginRequest, type HttpUserLoginResponse, type HttpUserRegisterInput, type HttpUserRegisterResponse, type Kind, type ListSlideShowCMDConfig, type ListSlideShowCMDConfigPDFV1Input, type ListSlideShowCMDConfigVideoV1Input, type ListSlideShowState, type ListSlideShowStateStatus, ListSlideshowService, type MobileDeviceInfo, type MobilePlankAppV1Settings, MobileService, OpenAPI, type OpenAPIConfig, OpenApiClient, type PaymentCheckoutSession, type PaymentPriceData, type PaymentPriceOption, type PaymentSupportV1Input, PaymentsService, type Plank, PlankService, type PlankStats, type PlankStreakStat, type RemindDailySettings, type RemindMedium, RemindService, type ShareListInput, type ShareListReadAccessRequest, type ShareListWithUserInput, type SpacedRepetition, type SpacedRepetitionBase, type SpacedRepetitionBaseNew, type SpacedRepetitionBaseSettings, type SpacedRepetitionBaseSettingsShow, type SpacedRepetitionDataV1, type SpacedRepetitionEntryViewed, type SpacedRepetitionNew, type SpacedRepetitionOvertimeInfo, type SpacedRepetitionOvertimeInput, type SpacedRepetitionOvertimeInputBase, type SpacedRepetitionOvertimeInputV1, type SpacedRepetitionOvertimeInputV2, SpacedRepetitionService, type SpacedRepetitionSettingsV1, type SpacedRepetitionSettingsV2, type SpacedRepetitionSettingsV5, type SpacedRepetitionSettingsV6, type SpacedRepetitionStats, type SpacedRepetitionStatsActivityAction, type SpacedRepetitionStatsActivityInfo, type SpacedRepetitionStatsStreakInfo, type SpacedRepetitionV1, type SpacedRepetitionV1New, type SpacedRepetitionV2, type SpacedRepetitionV2New, type SpacedRepetitionV5, type SpacedRepetitionV5New, type SpacedRepetitionV6, type SpacedRepetitionV6New, type TierData, type TierDataCMD, type TierDataStripe, UserService, type Version };
