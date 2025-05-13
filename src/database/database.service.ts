import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  public async onModuleInit() {
    await this.$connect();
  }

  async OnModuleDestroy() {
    await this.$disconnect();
  }
}
