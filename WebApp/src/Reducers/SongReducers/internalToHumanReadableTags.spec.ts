import { mapFromInternalToHumanReadableTags } from './internalToHumanReadableTags';


describe('map from internal to human readable', () => {

    it('should convert v1 to verse 1', () => {
        const result = mapFromInternalToHumanReadableTags('v1');

        expect(result).toBe('Verse 1')

    })

    it('should convert v1b to verse 1b', () => {
        const result = mapFromInternalToHumanReadableTags('v1b');

        expect(result).toBe('Verse 1b')

    })

    it('should convert c to chorus', () => {
        const result = mapFromInternalToHumanReadableTags('c');

        expect(result).toBe('Chorus')

    })
    it('should convert e to Ending', () => {
        const result = mapFromInternalToHumanReadableTags('c');

        expect(result).toBe('Chorus')

    })
    it('should convert p to Pre', () => {
        const result = mapFromInternalToHumanReadableTags('c');

        expect(result).toBe('Chorus')

    })

    it('should handle blank', () => {
        const result = mapFromInternalToHumanReadableTags('');

        expect(result).toBe('')

    })
})
