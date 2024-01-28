/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistItemV2 } from './AlistItemV2';
import type { SpacedRepetitionBaseNew } from './SpacedRepetitionBaseNew';
import type { SpacedRepetitionSettingsV2 } from './SpacedRepetitionSettingsV2';

export type SpacedRepetitionV2New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV2;
    settings?: SpacedRepetitionSettingsV2;
} & {
    data: AlistItemV2;
    settings: SpacedRepetitionSettingsV2;
});

