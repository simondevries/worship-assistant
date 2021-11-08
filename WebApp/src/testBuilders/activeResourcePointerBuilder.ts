import ActiveResourcePointer from "../Interfaces/ActiveResourcePointer";
export default class ActiveResourceBuilder {


    build(): ActiveResourcePointer {
        return {
            resourceId: '1',
            slideIndex: 0
        }
    }
}