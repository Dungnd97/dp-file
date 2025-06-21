import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InterServiceAuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(InterServiceAuthGuard)
  @Get('secure')
  getSecureData(@Req() req) {
    return req.user;
  }
}
