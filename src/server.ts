import { Provider } from "./utils/decorators/provider";
import { ILogger, Logger } from './utils/logger';
import { inject } from "inversify";
import {ConfigProvider} from "./config/config.service";
import * as Hapi from '@hapi/hapi';
import {MainRouter} from "./main.router";
import {PluginProvider} from "./plugins";

const debug = require('debug')('app:server');

@Provider()
export class Server {
    private app: Hapi.Server;
    private startDate: Date;

    constructor(
        @inject(Logger)
        private readonly logger: ILogger,
        private readonly config: ConfigProvider,
        private readonly router: MainRouter,
        private readonly pluginProvider: PluginProvider,
    ) { }

    async start(): Promise<Server> {
        debug('creating the server');
        this.startDate = new Date();
        this.app = new Hapi.Server({
            host: this.config.get('SERVER_HOST'),
            port: this.config.getNumber('SERVER_PORT')
        });

        debug('mapping routes');
        this.app.route(this.router.routes);

        debug('Registering plugins');
        const pluginRegistrationTasks = this.pluginProvider.plugins.map(plugin => this.app.register(plugin));
        await Promise.all(pluginRegistrationTasks);

        debug('Starting the server');
        await this.app.start();

        const deltaT = (new Date().getTime() - this.startDate.getTime()) / 1000;
        this.logger.info(`Server started on port ${this.config.getNumber('SERVER_PORT')} after ${deltaT} seconds`);
        return this;
    }

    async stop() {
        debug('Stopping the server');
        await this.app.stop();
        this.logger.info('Bye :)');
    }
}
