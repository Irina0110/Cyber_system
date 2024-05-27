import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateCoachDto {
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    userId: number

    username: string;
}
