import 'reflect-metadata';
import { Container } from 'inversify';
import { Server } from './server';
import { ILogger, Logger, logger } from './utils/logger';

async function bootstrap() {
    const container = new Container({
        autoBindInjectable: true,
    });

    container.bind<ILogger>(Logger).toConstantValue(logger);

    container
        .resolve<Server>(Server)
        .start();
}

bootstrap();
