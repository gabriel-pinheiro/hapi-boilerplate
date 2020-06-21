import { Provider } from "./utils/decorators/provider";
import { ILogger, Logger } from './utils/logger';
import { inject } from "inversify";
import {ConfigProvider} from "./config/config.service";
import * as Hapi from '@hapi/hapi';
import * as laabr from 'laabr';

@Provider()
export class Server {
    private app: Hapi.Server;

    constructor(
        @inject(Logger)
        private readonly logger: ILogger,
        private readonly config: ConfigProvider
    ) { }

    async start(): Promise<Server> {
        this.logger.info('Starting server');
        this.app = new Hapi.Server({
            host: this.config.get('SERVER_HOST'),
            port: this.config.getNumber('SERVER_PORT')
        });

        await this.app.register({
            plugin: laabr,
            options: {
                formats: {
                    response: this.config.get('SERVER_LOG-FORMAT'),
                    onPostStart: '\0',
                    onPostStop: '\0',
                }
            }
        });
        await this.app.start();
        this.logger.info('Server is running on ' + this.app.info.uri);

        return this;
    }

    async stop() {
        this.logger.info('Stopping server');
        await this.app.stop();
        this.logger.info('Bye :)');
        process.exit(0);
    }
}
