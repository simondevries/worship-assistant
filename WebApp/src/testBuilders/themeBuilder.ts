import { ITheme } from "Interfaces/themes";

export class ThemeBuilder {

    fontColor: string = '#ffffff';

    withFontColor(fontColor: string): ThemeBuilder {
        this.fontColor = fontColor;
        return this;
    }

    build(): ITheme {
        return {
            backgroundColor: 'black',
            fontSize: 2,
            lineHeight: '12',
            name: 'main',
            textColor: 'white',
            textHorizontalAlign: 'M',
            textIsBold: true,
            textIsItalic: true,
            textIsUnderlined: true,
            textVerticalAlign: 'M',
            fontFamily: 'Helvetica',
            showTextBorder: true,
            lineSpacing: 1,
            letterSpacing: 1
        }
    }
}

