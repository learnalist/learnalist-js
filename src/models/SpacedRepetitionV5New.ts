/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistItemV5 } from './AlistItemV5';
import type { SpacedRepetitionBaseNew } from './SpacedRepetitionBaseNew';
import type { SpacedRepetitionBaseSettings } from './SpacedRepetitionBaseSettings';

export type SpacedRepetitionV5New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV5;
    settings?: SpacedRepetitionBaseSettings;
} & {
    data: AlistItemV5;
    settings: SpacedRepetitionBaseSettings;
});

