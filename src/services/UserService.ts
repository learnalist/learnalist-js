/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HttpResponseMessage } from '../models/HttpResponseMessage';
import type { HttpTokenToCookieRequest } from '../models/HttpTokenToCookieRequest';
import type { HttpUserInfoInput } from '../models/HttpUserInfoInput';
import type { HttpUserInfoResponse } from '../models/HttpUserInfoResponse';
import type { HttpUserLoginIDPInput } from '../models/HttpUserLoginIDPInput';
import type { HttpUserLoginRequest } from '../models/HttpUserLoginRequest';
import type { HttpUserLoginResponse } from '../models/HttpUserLoginResponse';
import type { HttpUserRegisterInput } from '../models/HttpUserRegisterInput';
import type { HttpUserRegisterResponse } from '../models/HttpUserRegisterResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Register a new user with username and password
     * @param requestBody Username and password
     * @param xUserRegister Restrict access to this endpoint, if you add the header and it matches the key, you are in.
     * @returns HttpUserRegisterResponse User already exists
     * @throws ApiError
     */
    public registerUserWithUsernameAndPassword(
        requestBody: HttpUserRegisterInput,
        xUserRegister?: string,
    ): CancelablePromise<HttpUserRegisterResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/register',
            headers: {
                'x-user-register': xUserRegister,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Given a token, confirm its valid and then return it in a cookie
     * @param requestBody A hack to be able to create a cookie from the server with a valid token
     * @returns HttpUserLoginResponse You now have a login session
     * @throws ApiError
     */
    public tokenToCookie(
        requestBody: HttpTokenToCookieRequest,
    ): CancelablePromise<HttpUserLoginResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/token/to/cookie',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad input, most likely, invalid json`,
                403: `token not found or user_uuid not matching the token`,
                422: `Something wrong with the post data, token and user_uuid can not be empty`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Login with idToken, mostly to support mobile devices.
     * @param requestBody Based on the idp, we will verify your id_token and log you in.
     * @returns HttpUserLoginResponse You now have a login session
     * @throws ApiError
     */
    public loginWithIdpIdToken(
        requestBody: HttpUserLoginIDPInput,
    ): CancelablePromise<HttpUserLoginResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/login/idp',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad input, most likely, invalid json`,
                403: `Missing data or invalid id_token`,
                422: `Idp not supported`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Login with username and password. The token can be used in future api requests via bearerAuth
     * @param requestBody Username and password
     * @returns HttpUserLoginResponse You now have a login session
     * @throws ApiError
     */
    public loginWithUsernameAndPassword(
        requestBody: HttpUserLoginRequest,
    ): CancelablePromise<HttpUserLoginResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                403: `Username and password did not match what was in the system`,
                500: `unexpected error`,
            },
        });
    }

    /**
     * Get user information, app settings, preferences some user state
     * @param uuid UUID of user
     * @returns HttpUserInfoResponse user info has been changed
     * @throws ApiError
     */
    public getUserInfo(
        uuid: string,
    ): CancelablePromise<HttpUserInfoResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/info/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * Single or many updates to the users information
     * @param uuid UUID of user to modify
     * @param requestBody Allowed attributes to update
     * @returns HttpResponseMessage user info has been changed
     * @throws ApiError
     */
    public patchUserInfo(
        uuid: string,
        requestBody: HttpUserInfoInput,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/user/info/{uuid}',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `unexpected error`,
            },
        });
    }

    /**
     * Deletes a user and there lists
     * @param uuid UUID of entry
     * @returns HttpResponseMessage user deleted
     * @throws ApiError
     */
    public deleteUser(
        uuid: string,
    ): CancelablePromise<HttpResponseMessage> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/user/{uuid}',
            path: {
                'uuid': uuid,
            },
            errors: {
                403: `UUID does not match that of the logged in user`,
                500: `unexpected error`,
            },
        });
    }

}
