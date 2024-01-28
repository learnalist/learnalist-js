/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HttpResponseMessage } from '../models/HttpResponseMessage';
import type { SpacedRepetition } from '../models/SpacedRepetition';
import type { SpacedRepetitionEntryViewed } from '../models/SpacedRepetitionEntryViewed';
import type { SpacedRepetitionNew } from '../models/SpacedRepetitionNew';
import type { SpacedRepetitionOvertimeInfo } from '../models/SpacedRepetitionOvertimeInfo';
import type { SpacedRepetitionOvertimeInput } from '../models/SpacedRepetitionOvertimeInput';
import type { SpacedRepetitionOvertimeInputBase } from '../models/SpacedRepetitionOvertimeInputBase';
import type { SpacedRepetitionStats } from '../models/SpacedRepetitionStats';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SpacedRepetitionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Add entry for spaced based learning
     * @param requestBody Entry to add for spaced based learning
     * @returns SpacedRepetition Entry already exists
     * @throws ApiError
     */
    public addSpacedRepetitionEntry(
        requestBody: SpacedRepetitionNew,
    ): CancelablePromise<SpacedRepetition> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/spaced-repetition/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Something wrong with the payload`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Deletes a single entry based on the UUID
     * @param uuid UUID of entry
     * @returns HttpResponseMessage entry deleted
     * @throws ApiError
     */
    public deleteSpacedRepetitionEntry(
        uuid: string,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/spaced-repetition/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                400: `Bad request, missing uuid`,
                404: `Entry doesnt exist.`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get all entries for spaced repetition learning
     * @returns SpacedRepetition Return list of all entries
     * @throws ApiError
     */
    public getSpacedRepetitionEntries(): CancelablePromise<Array<SpacedRepetition>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/spaced-repetition/all',
            errors: {
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get next entry for spaced based learning
     * @returns SpacedRepetition Return entry
     * @throws ApiError
     */
    public getNextSpacedRepetitionEntry(): CancelablePromise<SpacedRepetition> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/spaced-repetition/next',
            errors: {
                404: `User has no entries.`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Update spaced entry with feedback from the user
     * @param requestBody Tell the system if we should move forward or backwards with the learning
     * @returns SpacedRepetition Entry updated
     * @throws ApiError
     */
    public updateSpacedRepetitionEntry(
        requestBody: SpacedRepetitionEntryViewed,
    ): CancelablePromise<SpacedRepetition> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/spaced-repetition/viewed',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Entry not found, no body`,
                422: `Something wrong with the payload`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Ugly light url to check if list active for this user.
     * @param uuid List UUID to check
     * @returns any List is active
     * @throws ApiError
     */
    public spacedRepetitionOvertimeIsActive(
        uuid: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/spaced-repetition/overtime/active/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                404: `List is not active`,
            },
        });
    }

    /**
     * Add for dripfeed (Slowly add this list for spaced repetition learning).
     * @param requestBody list to add to dripfeed
     * @returns SpacedRepetitionOvertimeInfo Success, list added to dripfeed
     * @throws ApiError
     */
    public spacedRepetitionAddListToOvertime(
        requestBody: SpacedRepetitionOvertimeInput,
    ): CancelablePromise<SpacedRepetitionOvertimeInfo> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/spaced-repetition/overtime',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `You do not have access to read list`,
                404: `List not found`,
                422: `Something wrong with the input`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Remove list from dripfeed.
     * @param requestBody
     * @returns HttpResponseMessage Success, list removed
     * @throws ApiError
     */
    public spacedRepetitionRemoveListFromOvertime(
        requestBody: SpacedRepetitionOvertimeInputBase,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/spaced-repetition/overtime',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `You do not have access to do this action`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Stats for spaced repetition
     * @param uuid userUUID to check, today it is only for the logged in user
     * @returns SpacedRepetitionStats Stats
     * @throws ApiError
     */
    public spacedRepetitionStats(
        uuid: string,
    ): CancelablePromise<SpacedRepetitionStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/spaced-repetition/stats/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                403: `You do not have access to do this action`,
                404: `No stats found`,
                500: `unexpected error`,
            },
        });
    }

}
