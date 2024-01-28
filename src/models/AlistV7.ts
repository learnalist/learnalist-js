/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistV7New } from './AlistV7New';

export type AlistV7 = ({
    uuid?: string;
} & AlistV7New & {
    uuid: string;
});

