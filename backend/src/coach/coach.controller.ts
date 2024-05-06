import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param
} from '@nestjs/common';
import {CoachService} from './coach.service';
import {CreateCoachDto} from './dto/create-coach.dto';
import {UpdateCoachDto} from './dto/update-coach.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('coach')
@Controller('coach')
export class CoachController {
    constructor(private readonly coachService: CoachService) {
    }

    @Post()
    create(@Body() createCoachDto: CreateCoachDto) {
        return this.coachService.create(createCoachDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coachService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
        return this.coachService.update(+id, updateCoachDto);
    }
}
