/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HttpMobileRegisterInput } from '../models/HttpMobileRegisterInput';
import type { HttpResponseMessage } from '../models/HttpResponseMessage';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MobileService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Register the user and the token, to be able to send push notifications
     * @param requestBody Device information
     * @returns HttpResponseMessage OK
     * @throws ApiError
     */
    public registerDevice(
        requestBody: HttpMobileRegisterInput,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/mobile/register-device',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Most likely, the token is empty, or the app_identifier is [empty, not valid]`,
                500: `unexpected error`,
            },
        });
    }

}
