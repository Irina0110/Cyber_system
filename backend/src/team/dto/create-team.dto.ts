import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateTeamDto {
    id?: number;
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    coachId: number;

    coachName: string;
}
