/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChallengeInput } from './ChallengeInput';

export type ChallengeShortInfo = (ChallengeInput & {
    /**
     * Set to UTC
     */
    created?: string;
    /**
     * User who created the challenge
     */
    created_by?: string;
    uuid?: string;
} & {
    /**
     * User who created the challenge
     */
    created_by: string;
    uuid: string;
});

