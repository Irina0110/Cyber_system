import { PartialType } from '@nestjs/mapped-types';
import { CreateCompletedTrackDto } from './create-completed-track.dto';

export class UpdateCompletedTrackDto extends PartialType(
  CreateCompletedTrackDto,
) {}
