/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistInfo } from './AlistInfo';
import type { AlistItemV2 } from './AlistItemV2';

export type AlistV2New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v2';
    info: AlistInfo;
    data: Array<AlistItemV2>;
};

