import 'reflect-metadata';
import { Container } from 'inversify';
import { Server } from './server';

async function bootstrap() {
    const container = new Container({
        autoBindInjectable: true,
    });

    container
        .resolve<Server>(Server)
        .start();
}

bootstrap();
