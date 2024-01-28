/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChallengePlankRecord } from './ChallengePlankRecord';
import type { ChallengeShortInfo } from './ChallengeShortInfo';

export type ChallengeInfo = (ChallengeShortInfo & {
    /**
     * List of users
     */
    users?: Array<{
        /**
         * User uuid
         */
        user_uuid?: string;
        /**
         * Name the user wants for this challenge
         */
        name?: string;
    }>;
    /**
     * List of records, specific to the kind
     */
    records?: Array<ChallengePlankRecord>;
} & {
    /**
     * List of users
     */
    users: Array<{
        /**
         * User uuid
         */
        user_uuid?: string;
        /**
         * Name the user wants for this challenge
         */
        name?: string;
    }>;
    /**
     * List of records, specific to the kind
     */
    records: Array<ChallengePlankRecord>;
});

