/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type HttpMobileRegisterInput = {
    /**
     * FCM token linked to the device
     */
    token: string;
    /**
     * A unique identifier to allow the system to link a user with an app and use the correct token.
     */
    app_identifier: 'plank_v1' | 'remind_v1';
};

