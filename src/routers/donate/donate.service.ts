import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { PostgresService } from '../../database/postgres.service';

@Injectable()
export class DonateService {
      private readonly logger = new Logger(DonateService.name);

constructor(
    private readonly postgresService: PostgresService,
  ) {}
    //Thêm mới Giao dịch
  async createDonate(
    amount: number,
    userInfo: any
  ): Promise<{ amount: number, userInfo: any }> {
    try {
      const userId = await userInfo.id
      
      return userId;
    } catch (error) {
      this.logger.error(``, error.stack);
      throw error;
    }
  }
}
