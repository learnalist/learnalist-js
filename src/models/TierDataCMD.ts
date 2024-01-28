/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TierDataCMD = {
    kind: 'cmd';
    uuid: string;
    action: 'grant' | 'revoke' | 'request';
    data: {
        tier: string;
        user_uuid: string;
        /**
         * Set to UTC
         */
        when: string;
    };
};

