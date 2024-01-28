/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AppSettingsRemindV1 } from './AppSettingsRemindV1';
import type { RemindDailySettings } from './RemindDailySettings';

export type HttpUserInfoResponse = {
    user_uuid?: string;
    display_name?: string;
    daily_reminder?: {
        remind_v1?: RemindDailySettings;
        plank_v1?: RemindDailySettings;
    };
    app_settings?: {
        remind_v1?: AppSettingsRemindV1;
    };
    spaced_repetition?: {
        lists_overtime?: Array<string>;
    };
    plank?: {
        share_history?: 'public' | 'private';
        share_stats?: 'public' | 'private';
    };
    acl?: {
        list_public_write?: number;
    };
};

