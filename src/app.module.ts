import { Module } from '@nestjs/common';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [RatingsModule],
})
export class AppModule {}
