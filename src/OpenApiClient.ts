/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AListService } from './services/AListService';
import { AppSettingsService } from './services/AppSettingsService';
import { AssetService } from './services/AssetService';
import { ChallengeService } from './services/ChallengeService';
import { DefaultService } from './services/DefaultService';
import { ListSlideshowService } from './services/ListSlideshowService';
import { MobileService } from './services/MobileService';
import { PaymentsService } from './services/PaymentsService';
import { PlankService } from './services/PlankService';
import { RemindService } from './services/RemindService';
import { SpacedRepetitionService } from './services/SpacedRepetitionService';
import { UserService } from './services/UserService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class OpenApiClient {

    public readonly aList: AListService;
    public readonly appSettings: AppSettingsService;
    public readonly asset: AssetService;
    public readonly challenge: ChallengeService;
    public readonly default: DefaultService;
    public readonly listSlideshow: ListSlideshowService;
    public readonly mobile: MobileService;
    public readonly payments: PaymentsService;
    public readonly plank: PlankService;
    public readonly remind: RemindService;
    public readonly spacedRepetition: SpacedRepetitionService;
    public readonly user: UserService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://learnalist.net/api/v1',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.aList = new AListService(this.request);
        this.appSettings = new AppSettingsService(this.request);
        this.asset = new AssetService(this.request);
        this.challenge = new ChallengeService(this.request);
        this.default = new DefaultService(this.request);
        this.listSlideshow = new ListSlideshowService(this.request);
        this.mobile = new MobileService(this.request);
        this.payments = new PaymentsService(this.request);
        this.plank = new PlankService(this.request);
        this.remind = new RemindService(this.request);
        this.spacedRepetition = new SpacedRepetitionService(this.request);
        this.user = new UserService(this.request);
    }
}

