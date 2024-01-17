import {
  BadRequestException,
  // Body,
  Controller,
  Header,
  Post,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { CommendationService } from './commendation.service';

@Controller('commendations')
export class CommendationController {
  constructor(private readonly commendationService: CommendationService) {}

  @Post()
  @Header('Content-Type', 'application/pdf')
  async createReport(@Req() request: Request, @Res() res: Response) {
    const name = 'Luka Jadrijević Mladar';
    const filename = 'luka';
    const commendee =
      await this.commendationService.getCommendationFromRemoteApi(name);

    res.set(
      'Content-Disposition',
      `attachment; filename=Nelt-Report-${filename}.pdf`,
    );
    return new StreamableFile(
      await this.commendationService.generateReport(commendee),
    )
      .getStream()
      .pipe(res);
  }
}
