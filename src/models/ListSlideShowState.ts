/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListSlideShowStateStatus } from './ListSlideShowStateStatus';

export type ListSlideShowState = {
    status: ListSlideShowStateStatus;
    message: string;
    /**
     * Set to UTC
     */
    when: string;
};

