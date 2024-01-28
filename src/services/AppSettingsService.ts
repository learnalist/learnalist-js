/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppSettingsRemindV1 } from '../models/AppSettingsRemindV1';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AppSettingsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Enable or disable push notifications for spaced repetition in remindV1
     * @param requestBody Settings
     * @returns AppSettingsRemindV1 Settings updated
     * @throws ApiError
     */
    public setRemindV1(
        requestBody: AppSettingsRemindV1,
    ): CancelablePromise<AppSettingsRemindV1> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/app-settings/remind_v1',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Something wrong with the payload`,
                500: `unexpected error`,
            },
        });
    }

}
