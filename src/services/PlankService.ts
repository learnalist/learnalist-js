/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HttpPlankShareRequestBody } from '../models/HttpPlankShareRequestBody';
import type { HttpResponseMessage } from '../models/HttpResponseMessage';
import type { Plank } from '../models/Plank';
import type { PlankStats } from '../models/PlankStats';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PlankService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Add plank stats
     * @param requestBody Stats about the plank
     * @param xChallenge Link plank record to a challenge uuid
     * @returns Plank Plank record already exists
     * @throws ApiError
     */
    public addPlankEntry(
        requestBody: Plank,
        xChallenge?: string,
    ): CancelablePromise<Plank> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/plank/',
            headers: {
                'x-challenge': xChallenge,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get all planks for logged in user
     * @returns Plank Return list of all entries
     * @throws ApiError
     */
    public getPlankHistoryByLoggedInUser(): CancelablePromise<Array<Plank>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plank/history',
            errors: {
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get all planks for a given user, if not the logged in user, the history has to be shared.
     * @param uuid UUID of entry
     * @returns Plank Return list of all entries
     * @throws ApiError
     */
    public getPlankHistoryByUser(
        uuid: string,
    ): CancelablePromise<Array<Plank>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plank/history/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                403: `You do not have access to read plank history for this user`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Delete a single entry based on the UUID
     * @param uuid UUID of entry
     * @returns HttpResponseMessage plank deleted
     * @throws ApiError
     */
    public deletePlankEntry(
        uuid: string,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/plank/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                400: `Bad request, missing uuid`,
                404: `Not able to find plank record linked to this user`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get plank stats for a given user, if not the logged in user, the stats has to be shared.
     * @param uuid UUID of entry
     * @returns PlankStats Return stats
     * @throws ApiError
     */
    public getPlankStatsByUser(
        uuid: string,
    ): CancelablePromise<PlankStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plank/stats/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                401: `You need to login to see these stats, if you have access`,
                403: `You do not have access to read plank stats for this user`,
                404: `Not able to find plank stats by user`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Share Plank stats with the public or keep them private
     * @param requestBody Share with the public or make private
     * @returns HttpResponseMessage Share updated
     * @throws ApiError
     */
    public sharePlankStats(
        requestBody: HttpPlankShareRequestBody,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/plank/stats/share',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The input was not valid`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Share Plank history with the public or keep them private
     * @param requestBody Share with the public or make private
     * @returns HttpResponseMessage Share updated
     * @throws ApiError
     */
    public sharePlankHistory(
        requestBody: HttpPlankShareRequestBody,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/plank/history/share',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The input was not valid`,
                500: `unexpected error`,
            },
        });
    }

}
