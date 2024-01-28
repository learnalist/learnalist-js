/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistItemImage } from './AlistItemImage';
import type { AlistItemPOI } from './AlistItemPOI';
import type { AlistItemV2 } from './AlistItemV2';

export type AlistItemV6 = {
    image: AlistItemImage;
    poi?: AlistItemPOI;
    annotation: AlistItemV2;
};

