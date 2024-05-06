import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
} from '@nestjs/common';
import {PlayerService} from './player.service';
import {CreatePlayerDto} from './dto/create-player.dto';
import {UpdatePlayerDto} from './dto/update-player.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('player')
@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {
    }

    @Post()
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playerService.create(createPlayerDto);
    }


    @Get('/team/:teamId')
    findPlayersByTeamId(@Param('teamId') teamId: string) {
        return this.playerService.findPlayersByTeamId(+teamId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playerService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.playerService.update(+id, updatePlayerDto);
    }
}
