import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { Private } from 'src/auth/decorators/private.decorator';
import { Request } from 'express';

@Controller('daily-plans')
@Private()
export class DailyPlansController {
    constructor(private readonly dailyPlansService: DailyPlansService) {}

    @Post()
    create(@Body() createDailyPlanDto: CreateDailyPlanDto, @Req() request: Request) {
        const user = request['user'];
        return this.dailyPlansService.create(createDailyPlanDto, user.id);
    }

    @Get()
    findAll(@Req() request: Request) {
        return this.dailyPlansService.findAll(request['user'].id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() request: Request) {
        return this.dailyPlansService.remove(+id, request['user'].id);
    }
}
