export interface ITheme {
  backgroundColor: string;
  textColor: string;
  lineHeight: string;
  name: string;
  textVerticalAlign: 'T' | 'M' | 'B';
  textHorizontalAlign: 'L' | 'M' | 'R';
  textIsBold: boolean;
  textIsItalic: boolean;
  fontSize: number;
  textIsUnderlined: boolean;
  fontFamily: string;
  showTextBorder: boolean;
}

export const defaultSongTheme: ITheme = {
  backgroundColor: 'black',
  textColor: '#333333',
  lineHeight: 'normal',
  textVerticalAlign: 'M',
  textHorizontalAlign: 'M',
  textIsBold: true,
  textIsItalic: true,
  textIsUnderlined: true,
  fontSize: 1,
  name: 'Default',
  fontFamily: '"Myriad Pro" "Helvetica" "Century Gothic" "Arial"',
  showTextBorder: true,
};

export const themes: ITheme[] = [
  // defaultSongTheme,
  // lightSongTheme,
  // presentationTheme,
];

// export const themes = [defaultSongTheme, lightSongTheme, presentationTheme];
