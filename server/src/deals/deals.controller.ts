import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Private } from 'src/auth/decorators/private.decorator';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';

@Controller('deals')
export class DealsController {
    constructor(private readonly dealsService: DealsService) {}

    @Post()
    @Private()
    async create(@Body() createDealDto: CreateDealDto, @Req() request: Request) {
        const user = request['user'];
        return this.dealsService.create(createDealDto, user.id);
    }

    @Get()
    @Private()
    async findAll(@Req() request: Request) {
        const user = request['user'];
        return this.dealsService.findAll(user.id);
    }

    @Delete(':id')
    @Private()
    async remove(@Param('id') id: string, @Req() request: Request) {
        const user = request['user'];
        return this.dealsService.remove(+id, user.id);
    }
}
