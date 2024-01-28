/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type HttpUserInfoInput = {
    /**
     * This will be used to address you in the app(s) or website.
     */
    display_name?: string;
    /**
     * Let the server know the user was created via the plank app.
     */
    created_via?: 'plank.app.v1' | 'na';
    /**
     * Give this user the ability to write public lists
     */
    grant_public_list_write_access?: string;
};

