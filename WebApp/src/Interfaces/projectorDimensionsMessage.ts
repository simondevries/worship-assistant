
export const projectorDimensionsMessageKey = 'ping-project-views--to-controller';

export interface ProjectorDimensionsMessage {
    message: string;
    width: number;
    height: number
}

export const fromMessageToProjectorDimensionsMessage = (message: string) => {
    const m = message.split(":");


    const width = Number(m[1]);
    const height = Number(m[2]);

    return { width, height, message: projectorDimensionsMessageKey } as ProjectorDimensionsMessage
}

export const generateProjectorDimensionsMessage = () => {
    return projectorDimensionsMessageToString({ message: projectorDimensionsMessageKey, width: window.innerWidth, height: window.innerHeight } as ProjectorDimensionsMessage)
}

export const projectorDimensionsMessageToString = (projectorDimensionsMessage: ProjectorDimensionsMessage) => {
    return `${projectorDimensionsMessage.message}:${projectorDimensionsMessage.width}:${projectorDimensionsMessage.height}`
}

