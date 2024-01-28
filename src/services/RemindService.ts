/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HttpResponseMessage } from '../models/HttpResponseMessage';
import type { RemindDailySettings } from '../models/RemindDailySettings';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RemindService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Set remind settings for app_identifier, if you have done an activity for that day, it will not count towards the motivation message
     * @param requestBody Remind settings
     * @returns RemindDailySettings Remind settings updated
     * @throws ApiError
     */
    public setRemindDailySetting(
        requestBody: RemindDailySettings,
    ): CancelablePromise<RemindDailySettings> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/remind/daily/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Something wrong with the payload`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * @param appIdentifier Via app_identifier which settings to remove
     * @returns RemindDailySettings Settings
     * @throws ApiError
     */
    public getRemindDailySettingsByAppIdentifier(
        appIdentifier: string,
    ): CancelablePromise<RemindDailySettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/remind/daily/{app_identifier}',
            path: {
                'app_identifier': appIdentifier,
            },
            errors: {
                404: `Settings not found`,
                422: `Check the app identifier is valid`,
            },
        });
    }

    /**
     * @param appIdentifier Via app_identifier which settings to remove
     * @returns HttpResponseMessage settings deleted
     * @throws ApiError
     */
    public deleteRemindDailySettingsByAppIdentifier(
        appIdentifier: string,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/remind/daily/{app_identifier}',
            path: {
                'app_identifier': appIdentifier,
            },
            errors: {
                404: `app_identifier not found, I wonder if I want this one`,
                500: `unexpected error`,
            },
        });
    }

}
