import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
} from '@nestjs/common';
import {TeamService} from './team.service';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('team')
@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {
    }

    @Post()
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamService.create(createTeamDto);
    }

    @Get('/coach/:coachId')
    findAllTeamWithCoach(@Param('coachId') coachId: string) {
        return this.teamService.findAllTeamWithCoach(+coachId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teamService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamService.update(+id, updateTeamDto);
    }
}
