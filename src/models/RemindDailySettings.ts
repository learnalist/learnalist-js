/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RemindDailySettings = {
    /**
     * Time of day HH:MM
     */
    time_of_day: string;
    /**
     * Timezone
     */
    tz: string;
    /**
     * Which app to link this too
     */
    app_identifier: string;
    /**
     * Which medium, look at RemindMedium
     */
    medium: Array<string>;
};

