/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistFrom } from './AlistFrom';
import type { AlistInteract } from './AlistInteract';

export type AlistInfo = {
    title: string;
    type: string;
    labels?: Array<string>;
    shared_with?: 'private' | 'friends' | 'public';
    system?: {
        created: boolean;
    };
    interact?: AlistInteract;
    from?: AlistFrom;
};

