/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TierDataStripe = {
    kind: 'stripe';
    uuid: string;
    action: 'grant' | 'revoke' | 'request';
    data: {
        event_id: string;
        price_id: string;
        product_id: string;
        payment_intent_id: string;
        tier: string;
        user_uuid: string;
        /**
         * Set to UTC
         */
        when: string;
    };
};

