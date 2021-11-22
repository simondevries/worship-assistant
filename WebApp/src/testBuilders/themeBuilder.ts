import { ITheme } from "Interfaces/themes";

export class ThemeBuilder {

    fontColor: string = '#ffffff';

    withFontColor(fontColor: string): ThemeBuilder {
        this.fontColor = fontColor;
        return this;
    }

    build(): ITheme {
        return {
            backgroundColor: 'red',
            fontSize: 1,
            lineHeight: '12',
            name: 'main',
            textColor: '#333333',
            textHorizontalAlign: 'M',
            textIsBold: true,
            textIsItalic: true,
            textIsUnderlined: true,
            textVerticalAlign: 'M',
            fontFamily: 'Helvetica'
        }
    }
}

