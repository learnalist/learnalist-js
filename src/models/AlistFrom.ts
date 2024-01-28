/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Give context of where this list was imported / synced from, if it is quizlet, cram, brainscape it is not possible to make this list public
 */
export type AlistFrom = {
    /**
     * Context of where it came from, when coming from quizlet, cram, brainscape, it is not possible to make the list public.
     */
    kind: 'quizlet' | 'cram' | 'brainscape' | 'learnalist';
    ext_uuid: string;
    ref_url: string;
};

