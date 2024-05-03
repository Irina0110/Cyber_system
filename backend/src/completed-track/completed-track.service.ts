import { Injectable } from '@nestjs/common';
import { CreateCompletedTrackDto } from './dto/create-completed-track.dto';
import { UpdateCompletedTrackDto } from './dto/update-completed-track.dto';

@Injectable()
export class CompletedTrackService {
  create(createCompletedTrackDto: CreateCompletedTrackDto) {
    return 'This action adds a new completedTrack';
  }

  findAll() {
    return `This action returns all completedTrack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completedTrack`;
  }

  update(id: number, updateCompletedTrackDto: UpdateCompletedTrackDto) {
    return `This action updates a #${id} completedTrack`;
  }

  remove(id: number) {
    return `This action removes a #${id} completedTrack`;
  }
}
