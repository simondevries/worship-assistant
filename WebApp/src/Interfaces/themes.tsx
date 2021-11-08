export interface ITheme {
  backgroundColor: string;
  textColor: string;
  primary: string;
  lineHeight: string;
  textAlign: string;
  name: string;
  textVerticalAlign: 'T' | 'M' | 'B';
  textHorizontalAlign: 'L';
  M;
  R;
  textIsBold: boolean;
  textIsItalic: boolean;
  textIsUnderlined: boolean;
}

export const defaultSongTheme = {
  backgroundColor: '#333333',
  textColor: '#000000',
  primary: '#e0e0e0',
  lineHeight: 'normal',
  textVerticalAlign: 'M',
  textHorizontalAlign: 'M',
  textIsBold: 'M',
  textIsItalic: 'M',
  textIsUnderlined: 'M',
  name: 'Default',
};

export const lightSongTheme = {
  backgroundColor: '#e0e0e0',
  textColor: '#000000',
  primary: '#333333',
  lineHeight: 'normal',
  textAlign: 'center',
  name: 'Light',
};

const presentationTheme = {
  backgroundColor: '#333333',
  textColor: '#000000',
  primary: '#e0e0e0',
  lineHeight: 'normal',
  textAlign: 'left',
  name: 'Presentation',
};
export const themes: ITheme[] = [
  // defaultSongTheme,
  // lightSongTheme,
  // presentationTheme,
];

// export const themes = [defaultSongTheme, lightSongTheme, presentationTheme];
