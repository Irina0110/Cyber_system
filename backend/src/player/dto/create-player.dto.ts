import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreatePlayerDto {
    id?: number;
    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({required: false})
    beatLeaderId?: bigint;

    @ApiProperty({required: false})
    scoreSaberId?: bigint;
}
