import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompletedTrackService } from './completed-track.service';
import { CreateCompletedTrackDto } from './dto/create-completed-track.dto';
import { UpdateCompletedTrackDto } from './dto/update-completed-track.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('completed-track')
@Controller('completed-track')
export class CompletedTrackController {
  constructor(private readonly completedTrackService: CompletedTrackService) {}

  @Post()
  create(@Body() createCompletedTrackDto: CreateCompletedTrackDto) {
    return this.completedTrackService.create(createCompletedTrackDto);
  }

  @Get()
  findAll() {
    return this.completedTrackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completedTrackService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompletedTrackDto: UpdateCompletedTrackDto,
  ) {
    return this.completedTrackService.update(+id, updateCompletedTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completedTrackService.remove(+id);
  }
}
