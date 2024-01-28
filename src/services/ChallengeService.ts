/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChallengeInfo } from '../models/ChallengeInfo';
import type { ChallengeInput } from '../models/ChallengeInput';
import type { ChallengeKind } from '../models/ChallengeKind';
import type { ChallengeShortInfo } from '../models/ChallengeShortInfo';
import type { HttpResponseMessage } from '../models/HttpResponseMessage';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChallengeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new challenge
     * @param requestBody Setup a challenge
     * @returns ChallengeShortInfo Challenge created
     * @throws ApiError
     */
    public createChallenge(
        requestBody: ChallengeInput,
    ): CancelablePromise<ChallengeShortInfo> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/challenge/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Most likely, the description is empty or the kind is not valid`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get all challenges for a given user
     * @param userUuid userUUID to get challenges
     * @param kind Filter challenges by a single kind
     * @returns ChallengeShortInfo Return list of all challenges
     * @throws ApiError
     */
    public getChallengesByUser(
        userUuid: string,
        kind?: ChallengeKind,
    ): CancelablePromise<Array<ChallengeShortInfo>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/challenges/{userUUID}',
            path: {
                'userUUID': userUuid,
            },
            query: {
                'kind': kind,
            },
            errors: {
                403: `Lacking permission to look up the user`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Join a challenge
     * @param uuid UUID of entry
     * @returns any Join challenge
     * @throws ApiError
     */
    public joinChallenge(
        uuid: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/challenge/{uuid}/join',
            path: {
                'uuid': uuid,
            },
            errors: {
                400: `Bad request, missing uuid`,
                404: `Challenge doesn't exist`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Leave a challenge
     * @param uuid UUID of entry
     * @returns any Left challenge
     * @throws ApiError
     */
    public leaveChallenge(
        uuid: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/challenge/{uuid}/leave',
            path: {
                'uuid': uuid,
            },
            errors: {
                400: `Bad request, missing uuid`,
                403: `You can only leave a challenge you have joined`,
                404: `Challenge doesn't exist`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get all challenge info, users and records
     * @param uuid UUID of entry
     * @returns ChallengeInfo Challenge info
     * @throws ApiError
     */
    public getChallenge(
        uuid: string,
    ): CancelablePromise<ChallengeInfo> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/challenge/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                403: `You can only lookup challenges that you have joined`,
                404: `Challenge doesn't exist`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Delete a challenge, forever
     * @param uuid UUID of entry
     * @returns HttpResponseMessage Challenge deleted
     * @throws ApiError
     */
    public deleteChallenge(
        uuid: string,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/challenge/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                403: `You can only delete a challenge if you created it`,
                404: `Challenge doesn't exist`,
                500: `unexpected error`,
            },
        });
    }

}
