import ISchedule, { ProjectorViewMode } from "../Interfaces/Schedule";
import ActiveResourceBuilder from "./activeResourcePointerBuilder";

export class CurrentScheduleBuilder {

    build(): ISchedule {
        return {
            id: 'anid',
            activeResourcePointer: new ActiveResourceBuilder().build(),
            activeSongs: [],
            activeVideos: [],
            date: new Date(),
            resourceOrder: [],
            resources: [],
            title: '',
            currentProjectorViewMode: { mode: ProjectorViewMode.Standard },
        }
    }
}