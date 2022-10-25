import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/di/DatabaseModule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';



@Module({
  imports: [
    AuthModule,
    DatabaseModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
