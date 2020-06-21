import { Provider } from "./utils/decorators/provider";
import { ILogger, Logger } from './utils/logger';
import { inject } from "inversify";
import {ConfigProvider} from "./config/config.service";

@Provider()
export class Server {
    constructor(
        @inject(Logger)
        private readonly logger: ILogger,
        private readonly config: ConfigProvider
    ) { }

    start() {
        
    }
}
