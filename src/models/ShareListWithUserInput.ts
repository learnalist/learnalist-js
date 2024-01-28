/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Able to give a user fine grain access, in conjuction with ShareListInput.
 */
export type ShareListWithUserInput = {
    user_uuid: string;
    alist_uuid: string;
    action: 'grant' | 'revoke' | 'request';
    permission: 'read' | 'write';
};

