import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { getLocalIpAddress } from './presentation/utils/ip_address';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
getLocalIpAddress()
bootstrap();