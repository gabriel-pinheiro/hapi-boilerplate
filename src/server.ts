import { Provider } from "./utils/decorators/provider";
import { ILogger, Logger } from './utils/logger';
import { inject } from "inversify";

@Provider()
export class Server {
    constructor(
        @inject(Logger)
        private readonly logger: ILogger,
    ) { }

    start() {
        
    }
}
