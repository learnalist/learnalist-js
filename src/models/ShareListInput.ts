/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Set the share option on a list. When private it means only the owner of the list.
 */
export type ShareListInput = {
    alist_uuid: string;
    action: 'private' | 'friends' | 'public';
};

