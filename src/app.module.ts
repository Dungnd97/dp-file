import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './routers/auth/auth.service'
import { AuthModule } from './routers/auth/auth.module'
import { MinioModule } from './minio/minio.module'
import { ClientProxyModule } from './common/clients/client-proxy.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, MinioModule, ClientProxyModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
