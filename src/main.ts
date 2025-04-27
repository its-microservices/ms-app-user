import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('USER-MS main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.HOST,
        port: envs.PORT
      }
    }
  );

  logger.log(`Microservicio escuchando desde le puerto: ${envs.PORT}`);
  await app.listen();

}
bootstrap();
