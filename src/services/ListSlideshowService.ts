/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Alist } from '../models/Alist';
import type { ListSlideShowCMDConfigPDFV1Input } from '../models/ListSlideShowCMDConfigPDFV1Input';
import type { ListSlideShowCMDConfigVideoV1Input } from '../models/ListSlideShowCMDConfigVideoV1Input';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ListSlideshowService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Add to the queue to have a custom slideshow made
     * @param kind Slideshow kind
     * @param requestBody Slideshow configuration
     * @returns Alist Success, slideshow is queued for creation
     * @throws ApiError
     */
    public listSlideshowCreate(
        kind: 'pdf' | 'video',
        requestBody: (ListSlideShowCMDConfigPDFV1Input | ListSlideShowCMDConfigVideoV1Input),
    ): CancelablePromise<Alist> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/slideshow/create/{kind}',
            path: {
                'kind': kind,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `You do not have access to this list`,
                422: `Something wrong with the input`,
                500: `unexpected error`,
            },
        });
    }

}
