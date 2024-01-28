/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Price option, used with stripe
 */
export type PaymentPriceOption = {
    id: string;
    currency: string;
    unit_amount: number;
    human_amount: number;
};

