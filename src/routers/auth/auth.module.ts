import { Module, Global } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { InterServiceAuthGuard } from './auth.guard'

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, InterServiceAuthGuard],
  exports: [AuthService, InterServiceAuthGuard],
})
export class AuthModule {}
