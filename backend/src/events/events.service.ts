import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class EventService {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    userCreatedAsPlayer(payload: any) {
        this.eventEmitter.emit('user.createdAsPlayer', payload);
    }

    userCreatedAsCoach(payload: any) {
        this.eventEmitter.emit('user.createdAsCoach', payload);
    }
    onUserCreatedAsPlayer(handler: (...args: any[]) => void) {
        this.eventEmitter.on('user.createdAsPlayer', handler);
    }

    onUserCreatedAsCoach(handler: (...args: any[]) => void) {
        this.eventEmitter.on('user.createdAsCoach', handler);
    }
}
