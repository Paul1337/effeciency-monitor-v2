import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Private } from 'src/auth/decorators/private.decorator';
import { CreateLongPlanDto } from './dto/create-long-plan.dto';
import { LongPlansService } from './long-plans.service';

@Controller('long-plans')
@Private()
export class LongPlansController {
    constructor(private readonly longPlansService: LongPlansService) {}

    @Post()
    create(@Body() createLongPlanDto: CreateLongPlanDto, @Req() request: Request) {
        const user = request['user'];
        return this.longPlansService.create(createLongPlanDto, user.id);
    }

    @Get()
    findAll(@Req() request: Request) {
        return this.longPlansService.findAll(request['user'].id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() request: Request) {
        return this.longPlansService.remove(+id, request['user'].id);
    }
}
