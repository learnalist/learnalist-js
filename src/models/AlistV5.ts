/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistV5New } from './AlistV5New';

export type AlistV5 = ({
    uuid?: string;
} & AlistV5New & {
    uuid: string;
});

