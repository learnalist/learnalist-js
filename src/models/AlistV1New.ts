/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistInfo } from './AlistInfo';
import type { AlistItemV1 } from './AlistItemV1';

export type AlistV1New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v1';
    info: AlistInfo;
    data: Array<AlistItemV1>;
};

