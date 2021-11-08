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
}

export const defaultSongTheme: ITheme = {
  backgroundColor: '#333333',
  textColor: '#000000',
  lineHeight: 'normal',
  textVerticalAlign: 'M',
  textHorizontalAlign: 'M',
  textIsBold: true,
  textIsItalic: true,
  textIsUnderlined: true,
  fontSize: 1,
  name: 'Default',
};

export const lightSongTheme: ITheme = {
  backgroundColor: '#e0e0e0',
  textColor: '#000000',
  lineHeight: 'normal',
  textVerticalAlign: 'M',
  textHorizontalAlign: 'M',
  textIsBold: true,
  textIsItalic: true,
  textIsUnderlined: true,
  fontSize: 1,
  name: 'Light',
};

const presentationTheme: ITheme = {
  backgroundColor: '#333333',
  textColor: '#000000',
  lineHeight: 'normal',
  textVerticalAlign: 'M',
  textHorizontalAlign: 'M',
  textIsBold: true,
  textIsItalic: true,
  fontSize: 1,
  textIsUnderlined: true,
  name: 'Presentation',
};
export const themes: ITheme[] = [
  // defaultSongTheme,
  // lightSongTheme,
  // presentationTheme,
];

// export const themes = [defaultSongTheme, lightSongTheme, presentationTheme];
