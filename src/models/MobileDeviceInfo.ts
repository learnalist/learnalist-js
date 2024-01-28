/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpMobileRegisterInput } from './HttpMobileRegisterInput';

/**
 * Information linking a mobile device and app to a user
 */
export type MobileDeviceInfo = ({
    user_uuid?: string;
} & HttpMobileRegisterInput & {
    user_uuid: string;
});

