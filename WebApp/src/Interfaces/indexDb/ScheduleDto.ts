import IResourceReference from 'Interfaces/ResourceReference';
import ActiveResourcePointer from 'Interfaces/ActiveResourcePointer';

export default interface IScheduleDto {
    id: string;
    date: Date;

    activeResourcePointer: ActiveResourcePointer;
    resourceOrder: string[];
    resources: IResourceReference[];
    title: string;
}