/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistInfo } from './AlistInfo';
import type { AlistItemV6 } from './AlistItemV6';

export type AlistV6New = {
    /**
     * List type, for now make sure it matches info.type, as info.type will be used
     */
    kind: 'v6';
    info: AlistInfo;
    data: Array<AlistItemV6>;
};

