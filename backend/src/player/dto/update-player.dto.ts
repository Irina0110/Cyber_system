import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
    @ApiProperty({required: false})
    teamId?: number;

    @ApiProperty({required: false})
    beatLeaderId?: string;

    @ApiProperty({required: false})
    scoreSaberId?: string;
}
