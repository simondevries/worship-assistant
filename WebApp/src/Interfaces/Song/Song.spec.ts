import { assert } from "console"
import { toInternalVerseTag } from "./Song"

it('should map tags', () => {
    expect(toInternalVerseTag('verse1')).toBe('v1');
    expect(toInternalVerseTag('v1')).toBe('v1');
    expect(toInternalVerseTag('verses1')).toBe('v1');
    expect(toInternalVerseTag('verses 1')).toBe('v1');
    expect(toInternalVerseTag(' verses 1 ')).toBe('v1');
    expect(toInternalVerseTag(' verses     1 ')).toBe('v1');
    expect(toInternalVerseTag('verse')).toBe('v');

    expect(toInternalVerseTag('bridge1')).toBe('b1');
    expect(toInternalVerseTag('b1')).toBe('b1');
    expect(toInternalVerseTag('bridgeses1')).toBe('b1');
    expect(toInternalVerseTag('bridgeses 1')).toBe('b1');
    expect(toInternalVerseTag('bridge')).toBe('b');

    expect(toInternalVerseTag('chrous')).toBe('c');
    expect(toInternalVerseTag('b1')).toBe('b1');
    expect(toInternalVerseTag('bridgeses1')).toBe('b1');
    expect(toInternalVerseTag('bridge')).toBe('b');

    expect(toInternalVerseTag('caa')).toBe('caa');
    expect(toInternalVerseTag('vab')).toBe('vab');
    expect(toInternalVerseTag('cbd')).toBe('cbd');
    expect(toInternalVerseTag('bridge')).toBe('b');
})



it('should return default with invalid inputs', () => {
    expect(toInternalVerseTag('1')).toBe('-');
    expect(toInternalVerseTag('')).toBe('-');
    expect(toInternalVerseTag('vrese')).toBe('-');
    expect(toInternalVerseTag('caa part two')).toBe('-');

})
