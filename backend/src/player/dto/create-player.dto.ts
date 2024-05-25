import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreatePlayerDto {
    id?: number;
    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty({required: false})
    beatLeaderId?: string;

    @ApiProperty({required: false})
    scoreSaberId?: string;
}
