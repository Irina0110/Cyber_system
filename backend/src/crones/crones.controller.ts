import { Controller } from '@nestjs/common';
import { CronesService } from './crones.service';

@Controller('crones')
export class CronesController {
  constructor(private readonly cronesService: CronesService) {}
}
