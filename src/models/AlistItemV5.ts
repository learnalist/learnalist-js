/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistItemImage } from './AlistItemImage';
import type { AlistItemPOI } from './AlistItemPOI';

export type AlistItemV5 = {
    image: AlistItemImage;
    poi?: AlistItemPOI;
    annotation: string;
};

