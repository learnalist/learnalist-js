/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlistItemV6 } from './AlistItemV6';
import type { SpacedRepetitionBaseNew } from './SpacedRepetitionBaseNew';
import type { SpacedRepetitionSettingsV6 } from './SpacedRepetitionSettingsV6';

export type SpacedRepetitionV6New = (SpacedRepetitionBaseNew & {
    data?: AlistItemV6;
    settings?: SpacedRepetitionSettingsV6;
} & {
    data: AlistItemV6;
    settings: SpacedRepetitionSettingsV6;
});

