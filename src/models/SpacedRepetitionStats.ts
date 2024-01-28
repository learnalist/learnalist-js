/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SpacedRepetitionStatsActivityInfo } from './SpacedRepetitionStatsActivityInfo';
import type { SpacedRepetitionStatsStreakInfo } from './SpacedRepetitionStatsStreakInfo';

export type SpacedRepetitionStats = {
    /**
     * Set to UTC
     */
    last_activity_created: string;
    latest_streak: {
        day1?: SpacedRepetitionStatsStreakInfo;
        day3?: SpacedRepetitionStatsStreakInfo;
        day5?: SpacedRepetitionStatsStreakInfo;
        week1?: SpacedRepetitionStatsStreakInfo;
    };
    last_7days: Array<SpacedRepetitionStatsActivityInfo>;
};

