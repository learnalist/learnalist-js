/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SpacedRepetitionOvertimeInputBase = {
    /**
     * List type / kind
     */
    kind: string;
    /**
     * List UUID that you want to add
     */
    alist_uuid: string;
    /**
     * User needs to match the one you are logged in with (today)
     */
    user_uuid: string;
};

