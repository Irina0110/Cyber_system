import {
    Controller,
    Get,
    Post,
    Body,
    Param, UseGuards,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiTags} from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }
}
