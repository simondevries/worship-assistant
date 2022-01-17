import slideSizeResolver from "./slideSizeResolver"

describe(('Slide size resolver spec'), () => {
    it('Can set correct height for 16/9 ratio', () => {
        const result = slideSizeResolver.getSmallerVersionOfProjectorView(100, 160, 90)

        expect(result).toBe(56.25);
    })


    it('Can set correct height for 16/9 ratio', () => {
        const result = slideSizeResolver.getSmallerVersionOfProjectorView(100, 250, 120)

        expect(result).toBe(48);
    })


    it('will have a min ratio of 1:1', () => {
        const result = slideSizeResolver.getSmallerVersionOfProjectorView(100, 100, 200)

        expect(result).toBe(100);
    })


    it('will have a max ratio of 2.35:1', () => {
        const result = slideSizeResolver.getSmallerVersionOfProjectorView(100, 236, 100)

        expect(result).toBe(42.5531914893617);
    })


    it('Can handle nulls', () => {
        //@ts-ignore
        const result = slideSizeResolver.getSmallerVersionOfProjectorView(100, null, null)

        expect(result).toBe(56.25);
    })
})