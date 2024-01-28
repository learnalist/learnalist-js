/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Alist } from '../models/Alist';
import type { AlistInput } from '../models/AlistInput';
import type { HttpResponseMessage } from '../models/HttpResponseMessage';
import type { ShareListInput } from '../models/ShareListInput';
import type { ShareListReadAccessRequest } from '../models/ShareListReadAccessRequest';
import type { ShareListWithUserInput } from '../models/ShareListWithUserInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AListService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * add a new list
     * @param requestBody A list object
     * @returns Alist List has been created
     * @throws ApiError
     */
    public addList(
        requestBody: AlistInput,
    ): CancelablePromise<Alist> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/alist',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request, something is wrong with the list object`,
                422: `Input had no errors but was not valid`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get a list
     * @param uuid UUID of list
     * @returns Alist Return a list, data will depend on the list type
     * @throws ApiError
     */
    public getListByUuid(
        uuid: string,
    ): CancelablePromise<Alist> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/alist/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                403: `User making request does not have access to the list in question`,
                404: `List is not in the system`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Update a list
     * @param uuid UUID of list
     * @param requestBody List to update
     * @returns Alist Return a list, data will depend on the list type
     * @throws ApiError
     */
    public updateListByUuid(
        uuid: string,
        requestBody: Alist,
    ): CancelablePromise<Alist> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/alist/{uuid}',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `User making request does not have access to the list in question`,
                404: `List is not in the system`,
                422: `Input had no errors but was not valid`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Delete a list
     * @param uuid UUID of list
     * @returns HttpResponseMessage list deleted
     * @throws ApiError
     */
    public deleteListByUuid(
        uuid: string,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/alist/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                403: `UUID does not match that of the logged in user`,
                404: `List is not in the system`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Query the lists the user has access to and apply jq filters to include or exclude rows (it does not return data, so aim to filter true or false)
     * @param requestBody A jq filter, if it runs in the command line, it should run here (using gojq), defaults to "true"
     * @returns Alist Return an array of lists
     * @throws ApiError
     */
    public postSearchWithJq(
        requestBody?: string,
    ): CancelablePromise<Array<Alist>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/alist/search/jq',
            body: requestBody,
            mediaType: 'text/plain',
            errors: {
                500: `unexpected error`,
            },
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
    public getListsByMe(
        labels?: string,
        listType?: string,
        includeSystemLists?: 0 | 1,
    ): CancelablePromise<Array<Alist>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/alist/by/me',
            query: {
                'labels': labels,
                'list_type': listType,
                'include_system_lists': includeSystemLists,
            },
            errors: {
                422: `Something wrong with the input`,
            },
        });
    }

    /**
     * Set share access for a list
     * @param requestBody What type of sharing should be done
     * @returns HttpResponseMessage Share updated
     * @throws ApiError
     */
    public shareList(
        requestBody: ShareListInput,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/alist/share',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Your user needs to be the owner of the list`,
                404: `List is not in the system`,
                422: `Unable to share the list for different reasons`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Setting specific access for the user, a user can request access via action.
     * @param requestBody What type of sharing should be done
     * @returns HttpResponseMessage Access updated for a specific user based on permission
     * @throws ApiError
     */
    public setListAccessForUser(
        requestBody: ShareListWithUserInput,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/alist/share/access',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `List is not in the system`,
                403: `Your user needs to be the owner of the list`,
                404: `List is not in the system`,
                422: `Unable to share the list for different reasons`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get list of users requesting raccess
     * @returns ShareListReadAccessRequest List of users waiting request access
     * @throws ApiError
     */
    public v1GetShareListAccessRequest(): CancelablePromise<ShareListReadAccessRequest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/alist/share/access/request',
            errors: {
                500: `unexpected error`,
            },
        });
    }

}
