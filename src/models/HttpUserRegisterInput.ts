/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpUserInfoInput } from './HttpUserInfoInput';

export type HttpUserRegisterInput = {
    username: string;
    password: string;
    extra?: HttpUserInfoInput;
};

