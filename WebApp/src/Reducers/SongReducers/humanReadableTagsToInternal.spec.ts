import { humanReadableTagsToInternal } from "./humanReadableTagsToInternal";

describe("Human readable tag names to interal tests", () => {
    it("should convert verse to v", () => {
        const result = humanReadableTagsToInternal("verse");
        expect(result).toBe('v')
    })
    it("should convert chorus to c", () => {
        const result = humanReadableTagsToInternal("chorus");
        expect(result).toBe('c')
    })
    it("should convert chorus 1A to c1A", () => {
        const result = humanReadableTagsToInternal("chorus 1a");
        expect(result).toBe('c1A')
    })


    it("should convert chorus1A to c1A", () => {
        const result = humanReadableTagsToInternal("chorus1a");
        expect(result).toBe('c1A')
    })

    it("should convert chorus1 to c1", () => {
        const result = humanReadableTagsToInternal("chorus1A");
        expect(result).toBe('c1A')
    })

    it("should not change already converted v to v", () => {
        const result = humanReadableTagsToInternal("v");
        expect(result).toBe('v')
    })

    it("should not change already converted v1a to v1a", () => {
        const result = humanReadableTagsToInternal("v1a");
        expect(result).toBe('v1a')
    })

    it("should not recognize somerandomstring123 ", () => {
        const result = humanReadableTagsToInternal("somerandomstring123");
        expect(result).toBe('')
    })

    it("should convert \"instrumental solo\" to s", () => {
        const result = humanReadableTagsToInternal("instrumental solo");
        expect(result).toBe('s')
    })

    it("should convert \"chorus arandomstring\" to c", () => {
        const result = humanReadableTagsToInternal("chorus arandomstring");
        expect(result).toBe('c')
    })

})