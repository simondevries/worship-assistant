// https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color

export default function invertHex(hex: string) {
    return `#${(Number(`0x1${hex.replace('#','')}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()}`
}
