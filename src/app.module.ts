import { Module } from '@nestjs/common';
import { CommendationModule } from './api/commendation/commendation.module';

@Module({
  imports: [CommendationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
