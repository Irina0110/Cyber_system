import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param, UseGuards
} from '@nestjs/common';
import {CoachService} from './coach.service';
import {CreateCoachDto} from './dto/create-coach.dto';
import {UpdateCoachDto} from './dto/update-coach.dto';
import {ApiTags} from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('coach')
@Controller('coach')
export class CoachController {
    constructor(private readonly coachService: CoachService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createCoachDto: CreateCoachDto) {
        return this.coachService.create(createCoachDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.coachService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
        return this.coachService.update(+id, updateCoachDto);
    }
}
