import { ITheme } from "Interfaces/themes";

export class ThemeBuilder {

    build(): ITheme {
        return {
            backgroundColor: 'red',
            fontSize: 1,
            lineHeight: '12',
            name: 'main',
            textColor: 'white',
            textHorizontalAlign: 'M',
            textIsBold: true,
            textIsItalic: true,
            textIsUnderlined: true,
            textVerticalAlign: 'M'
        }
    }
}

