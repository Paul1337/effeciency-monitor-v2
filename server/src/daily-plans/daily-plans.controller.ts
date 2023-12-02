import { Controller, Get, Post, Body, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
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

    @Get(':id/stat/daily-relative')
    getDailyRelativeStat(@Req() request: Request, @Param('id', ParseIntPipe) planId: number) {
        return this.dailyPlansService.getDailyRelativeStat(request['user'].id, planId);
    }

    @Get(':id/stat/accumulation')
    getAccumulationStat(@Req() request: Request, @Param('id', ParseIntPipe) planId: number) {
        return this.dailyPlansService.getAccumulationStat(request['user'].id, planId);
    }

    @Get(':id/stat/accumulation-relative')
    getAccumulationRelativeStat(@Req() request: Request, @Param('id', ParseIntPipe) planId: number) {
        return this.dailyPlansService.getAccumulationRelativeStat(request['user'].id, planId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() request: Request) {
        return this.dailyPlansService.remove(+id, request['user'].id);
    }
}
