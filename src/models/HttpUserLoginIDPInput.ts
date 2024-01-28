/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type HttpUserLoginIDPInput = {
    idp: 'google' | 'apple';
    /**
     * We will verify this to confirm your identity and create an account linked to your id.
     */
    id_token?: string;
    /**
     * Code from the server, part of a possible handshake
     */
    code?: string;
};

