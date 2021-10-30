import ActiveResourcePointer from "../Interfaces/ActiveResourcePointer";
export class ActiveResourceBuilder {


    build(): ActiveResourcePointer {
        return {
            resourceId: '1',
            slideIndex: 0
        }
    }
}