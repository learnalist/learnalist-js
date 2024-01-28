/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PlankStreakStat = {
    /**
     * How many days in a row has this user planked for
     */
    streak?: number;
    /**
     * When did the streak start
     */
    startDate?: string;
    /**
     * When did the streak end or today
     */
    endDate?: string;
};

