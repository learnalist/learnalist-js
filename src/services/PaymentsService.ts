/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentCheckoutSession } from '../models/PaymentCheckoutSession';
import type { PaymentPriceData } from '../models/PaymentPriceData';
import type { PaymentSupportV1Input } from '../models/PaymentSupportV1Input';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PaymentsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get public information of stripe key + prices
     * @param tier Our tier name that then maps to a stripe product_id
     * @returns PaymentPriceData Public information of stripe key + prices
     * @throws ApiError
     */
    public getStripeDataByTier(
        tier: string,
    ): CancelablePromise<PaymentPriceData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/payments/tier/{tier}/stripedata',
            path: {
                'tier': tier,
            },
            errors: {
                403: `You need to be logged in to see the payment options`,
            },
        });
    }

    /**
     * Get public information of stripe key + prices
     * @returns PaymentPriceData Public information of stripe key + prices
     * @throws ApiError
     */
    public getStripeData(): CancelablePromise<PaymentPriceData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/payments/stripedata',
            errors: {
                403: `You need to be logged in to see the payment options`,
            },
        });
    }

    /**
     * Create a checkout session in the system
     * @param requestBody
     * @returns PaymentCheckoutSession Created session id
     * @throws ApiError
     */
    public createCheckoutSession(
        requestBody: PaymentSupportV1Input,
    ): CancelablePromise<PaymentCheckoutSession> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/payments/create-checkout-session',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `You need to be logged in to create a checkout session`,
            },
        });
    }

    /**
     * Consume webhooks, today this only accepts webhooks from Stripe
     * @returns any Returns no content
     * @throws ApiError
     */
    public postWebhook(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/payments/webhooks/stripe',
            errors: {
                400: `Error message from verifying the payload is from stripe`,
            },
        });
    }

}
