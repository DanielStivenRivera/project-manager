import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Config } from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://${Config.DB_USER}:${Config.DB_PASSWORD}@bases.554ve.mongodb.net/project_manager?retryWrites=true&w=majority`,
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'DB_PASSWORD', useValue: process.env.DB_PASSWORD },
    { provide: 'DB_USER', useValue: process.env.DB_USER },
  ],
})
export class AppModule {}
