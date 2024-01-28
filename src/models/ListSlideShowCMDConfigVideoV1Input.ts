/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ListSlideShowCMDConfigVideoV1Input = {
    title?: string;
    alist_uuid: string;
    kind: string;
    /**
     * duration per slide / item or one entry to be applied to all
     */
    duration: Array<string>;
    /**
     * Share video with others. Currently will only work with private
     */
    shared_with?: 'private';
};

