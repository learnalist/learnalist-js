/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistInfo } from './AlistInfo';
import type { AlistItemV7 } from './AlistItemV7';

export type AlistV7New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v7';
    info: AlistInfo;
    data: AlistItemV7;
};

