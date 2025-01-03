import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(globalLogger)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
