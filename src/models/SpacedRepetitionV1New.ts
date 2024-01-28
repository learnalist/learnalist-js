/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistItemV1 } from './AlistItemV1';
import type { SpacedRepetitionBaseNew } from './SpacedRepetitionBaseNew';
import type { SpacedRepetitionBaseSettings } from './SpacedRepetitionBaseSettings';

export type SpacedRepetitionV1New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV1;
    settings?: SpacedRepetitionBaseSettings;
} & {
    data: AlistItemV1;
    settings: SpacedRepetitionBaseSettings;
});

