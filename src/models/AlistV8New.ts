/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistInfo } from './AlistInfo';
import type { AlistItemV8 } from './AlistItemV8';

export type AlistV8New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v8';
    info: AlistInfo;
    data: AlistItemV8;
};

