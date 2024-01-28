/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistInfo } from './AlistInfo';
import type { AlistItemV5 } from './AlistItemV5';

export type AlistV5New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v5';
    info: AlistInfo;
    data: Array<AlistItemV5>;
};

