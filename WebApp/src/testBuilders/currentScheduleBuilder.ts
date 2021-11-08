import IResourceReference from "../Interfaces/ResourceReference";
import ISchedule from "../Interfaces/Schedule";
import ActiveResourceBuilder from "./activeResourcePointerBuilder";

export class CurrentScheduleBuilder {
    
    build(): ISchedule {
        return {
            id: 'anid',
            activeResourcePointer: new ActiveResourceBuilder().build(),
            activeSongs: [],
            activeVideos: [],
            date: '',
            resourceOrder: [],
            resources: [],
            title: ''
        }
    }
}