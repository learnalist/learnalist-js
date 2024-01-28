/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HttpAssetShareRequestBody } from '../models/HttpAssetShareRequestBody';
import type { HttpAssetUploadRequestBody } from '../models/HttpAssetUploadRequestBody';
import type { HttpAssetUploadResponse } from '../models/HttpAssetUploadResponse';
import type { HttpResponseMessage } from '../models/HttpResponseMessage';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AssetService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Set asset for public or private access
     * @param requestBody Share with...
     * @returns HttpResponseMessage Asset updated
     * @throws ApiError
     */
    public shareAsset(
        requestBody: HttpAssetShareRequestBody,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/assets/share',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Most likely the wrong action`,
                403: `Access denied, due to not being owner of asset`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Upload asset and link it to the user logged in
     * @param formData File to upload
     * @returns HttpAssetUploadResponse Asset uploaded
     * @throws ApiError
     */
    public addUserAsset(
        formData: HttpAssetUploadRequestBody,
    ): CancelablePromise<HttpAssetUploadResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/assets/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad request, missing uuid`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * @param uuid UUID of entry
     * @returns any The asset.
     * @throws ApiError
     */
    public getAsset(
        uuid: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/assets/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * Deletes a single asset based on the UUID
     * @param uuid UUID of asset
     * @returns void
     * @throws ApiError
     */
    public deleteAsset(
        uuid: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/assets/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                400: `Bad request, missing uuid`,
                403: `Access denied, due to not being owner of asset`,
                404: `Asset is not in the system`,
                500: `unexpected error`,
            },
        });
    }

}
