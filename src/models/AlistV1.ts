/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistV1New } from './AlistV1New';

export type AlistV1 = ({
    uuid?: string;
} & AlistV1New & {
    uuid: string;
});

