import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param, UseGuards,
} from '@nestjs/common';
import {PlayerService} from './player.service';
import {CreatePlayerDto} from './dto/create-player.dto';
import {UpdatePlayerDto} from './dto/update-player.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('player')
@Controller('player')
@ApiBearerAuth()
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playerService.create(createPlayerDto);
    }


    @Get('/team/:teamId')
    @UseGuards(AuthGuard)
    findPlayersByTeamId(@Param('teamId') teamId: string) {
        return this.playerService.findPlayersByTeamId(+teamId);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.playerService.findOne(+id);
    }

    @Get('/statistics/:id')
    @UseGuards(AuthGuard)
    getPlayerStatistics(@Param('id') id: string) {
        return this.playerService.getPlayerStatistics(+id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.playerService.update(+id, updatePlayerDto);
    }
}
