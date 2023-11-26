import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Private } from 'src/auth/decorators/private.decorator';
import { DoDealDto } from './dto/do-deal.dto';
import { Request } from 'express';

@Controller('history')
@Private()
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Post('do-deal')
    @HttpCode(HttpStatus.OK)
    doDeal(@Req() request: Request, @Body() doDealDto: DoDealDto) {
        const user = request['user'];
        return this.historyService.doDeal(doDealDto, user.id);
    }
}
