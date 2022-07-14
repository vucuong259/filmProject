import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConst } from './commons/consts/app.const';
import { appConfig } from './configs/app.config';
import { initSwagger } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(`/${AppConst.API_PREFIX}`);
  initSwagger(app);
  await app.listen(appConfig.port, () => {
    console.log('listening on port: ' + appConfig.port);
  });
}
bootstrap();
