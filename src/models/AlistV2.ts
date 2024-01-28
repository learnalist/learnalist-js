/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistV2New } from './AlistV2New';

export type AlistV2 = ({
    uuid?: string;
} & AlistV2New & {
    uuid: string;
});

