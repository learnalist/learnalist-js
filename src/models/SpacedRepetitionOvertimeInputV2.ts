/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SpacedRepetitionOvertimeInputBase } from './SpacedRepetitionOvertimeInputBase';

export type SpacedRepetitionOvertimeInputV2 = ({
    settings?: {
        show: string;
    };
} & SpacedRepetitionOvertimeInputBase & {
    settings: {
        show: string;
    };
});

