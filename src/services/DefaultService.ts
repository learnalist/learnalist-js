/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Version } from '../models/Version';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get information about the server, linked to the git repo
     * @returns Version OK
     * @throws ApiError
     */
    public getServerVersion(): CancelablePromise<Version> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/version',
        });
    }

}
