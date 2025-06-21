import { Controller, Post, Body, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { InterServiceAuthGuard } from '../auth/auth.guard';
import { DonateService } from './donate.service';
import { responseObject } from '../../common/helpers/response.helper'

@Controller('donate')
export class DonateController {
constructor(private readonly donateService: DonateService) { }

  @UseGuards(InterServiceAuthGuard)
  @Post()
  async handlePayment(@Body() body: { amount: number }, @Req() req) {
     try {
    const result = await this.donateService.createDonate(body.amount, req.user);
          return responseObject(1, 'Success', result);

    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
