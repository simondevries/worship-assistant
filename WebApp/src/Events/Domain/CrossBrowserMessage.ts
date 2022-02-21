// oop based js experiment

import AppEvent from "./appEvent";

export class CrossBrowserMessage {
    payload: AppEvent;
    direction: 'ToController' | 'ToProjector';

    constructor(payload: AppEvent, direction: 'ToController' | 'ToProjector') {
        this.payload = { ...payload, isExternalEvent: true }
        this.direction = direction;
    }

    isToController = () => this.direction === 'ToController';
    isToProjector = () => this.direction === 'ToProjector';
}

export class MessageToProjector extends CrossBrowserMessage {
    constructor(payload: AppEvent) {
        super(payload, 'ToProjector')
    }
}

export class MessageToController extends CrossBrowserMessage {
    constructor(payload: AppEvent) {
        super(payload, 'ToController')
    }
}


interface DTO { payload: AppEvent, direction: 'ToController' | 'ToProjector' };

export const crossBrowserMessageMapper = {
    toObject: (message: string): CrossBrowserMessage | undefined => {
        if (!message || message.trim() === '') {
            return undefined;
        }
        const dto: DTO = JSON.parse(message);
        if (dto.direction === 'ToController') {
            return new MessageToController(dto.payload)
        } else {
            return new MessageToProjector(dto.payload)
        }
    },
    toString: (message: CrossBrowserMessage): string => {
        return JSON.stringify({ ...message })
    }
}