import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Private } from 'src/auth/decorators/private.decorator';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';

@Controller('deals')
@Private()
export class DealsController {
    constructor(private readonly dealsService: DealsService) {}

    @Post()
    async create(@Body() createDealDto: CreateDealDto, @Req() request: Request) {
        const user = request['user'];
        return this.dealsService.create(createDealDto, user.id);
    }

    @Get()
    async findActive(@Req() request: Request) {
        const user = request['user'];
        return this.dealsService.findActive(user.id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() request: Request) {
        const user = request['user'];
        return this.dealsService.remove(+id, user.id);
    }
}
