/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Config for the command line tool, shared attributes
 */
export type ListSlideShowCMDConfig = {
    cliBootstrap: {
        /**
         * output directory for where to write the slideshow files and asset
         */
        dir: string;
        /**
         * path to the node script that will trigger the creation of the slideshow
         */
        entrypoint: string;
        pathToPdfGenerator: string;
        debug: boolean;
        insecureHttps: boolean;
    };
    /**
     * Slideshow uuid == alist uuid
     */
    slideshow_uuid: string;
    server: string;
    auth: {
        user_uuid: string;
        token: string;
    };
    config: Record<string, any>;
};

