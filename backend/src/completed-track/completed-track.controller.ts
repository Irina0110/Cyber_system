import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards,
} from '@nestjs/common';
import { CompletedTrackService } from './completed-track.service';
import { CreateCompletedTrackDto } from './dto/create-completed-track.dto';
import { UpdateCompletedTrackDto } from './dto/update-completed-track.dto';
import { ApiTags } from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('completed-track')
@Controller('completed-track')
export class CompletedTrackController {
  constructor(private readonly completedTrackService: CompletedTrackService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCompletedTrackDto: CreateCompletedTrackDto) {
    return this.completedTrackService.create(createCompletedTrackDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.completedTrackService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.completedTrackService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCompletedTrackDto: UpdateCompletedTrackDto,
  ) {
    return this.completedTrackService.update(+id, updateCompletedTrackDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.completedTrackService.remove(+id);
  }
}
