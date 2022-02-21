import AppEvent from "./appEvent";
import { CrossBrowserMessage, crossBrowserMessageMapper } from "./CrossBrowserMessage"

const appEvent: AppEvent = { isExternalEvent: true, eventType: 'openingSong' };

describe('Cross Browser Messag', () => {
    it('mapper should convert ToController object to string', () => {

        const message = new CrossBrowserMessage(appEvent, 'ToController');

        const result = crossBrowserMessageMapper.toString(message);

        expect(result).toEqual(JSON.stringify({ "payload": appEvent, "direction": "ToController", }))
    })
    it('mapper should convert ToProjector object to string', () => {

        const message = new CrossBrowserMessage({ isExternalEvent: true, eventType: 'openingSong' } as AppEvent, 'ToProjector');

        const result = crossBrowserMessageMapper.toString(message);

        expect(result).toEqual(JSON.stringify({ "payload": appEvent, "direction": "ToProjector" }))
    })


    it('mapper should convert ToProjector string to object ', () => {

        const message = JSON.stringify({ direction: "ToProjector", payload: { isExternalEvent: true, eventType: 'openingSong' } })

        const result = crossBrowserMessageMapper.toObject(message);

        expect(result).toEqual(new CrossBrowserMessage({ isExternalEvent: true, eventType: 'openingSong' }, 'ToProjector'))
    })
    it('mapper should convert ToController string to object ', () => {

        const message = JSON.stringify({ "direction": "ToController", "payload": appEvent as AppEvent })

        const result = crossBrowserMessageMapper.toObject(message);

        expect(result).toEqual(new CrossBrowserMessage({ isExternalEvent: true, eventType: 'openingSong' }, 'ToController'))
    })

    it('mapper should change non external event to external ', () => {

        let modifiedAppEvent: AppEvent = { ...appEvent, isExternalEvent: false }

        const message = JSON.stringify({ "direction": "ToController", "payload": modifiedAppEvent as AppEvent })

        const result = crossBrowserMessageMapper.toObject(message);

        expect(result).toEqual(new CrossBrowserMessage({ isExternalEvent: true, eventType: 'openingSong' }, 'ToController'))
    })
})