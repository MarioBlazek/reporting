import { Module } from '@nestjs/common';
import { CommendationController } from './commendation.controller';
import { CommendationService } from './commendation.service';

@Module({
  controllers: [CommendationController],
  providers: [CommendationService],
})
export class CommendationModule {
  constructor(private readonly commendationService: CommendationService) {}
}
