import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param, UseGuards,
} from '@nestjs/common';
import {TeamService} from './team.service';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {ApiTags} from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('team')
@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamService.create(createTeamDto);
    }

    @Get('/coach/:coachId')
    @UseGuards(AuthGuard)
    findAllTeamWithCoach(@Param('coachId') coachId: string) {
        return this.teamService.findAllTeamWithCoach(+coachId);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.teamService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamService.update(+id, updateTeamDto);
    }
}
