import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { ApiTags } from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('goal')
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalService.create(createGoalDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(+id, updateGoalDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.goalService.remove(+id);
  }
}
