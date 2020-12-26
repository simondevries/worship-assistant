export interface ITheme {
    backgroundColor: string,
    textColor: string,
    primary: string,
    lineHeight: string,
    textAlign: string,
    fontSize: string,
    name: string,
}

export const defaultSongTheme = {
  backgroundColor: '#333333',
  textColor: '#000000',
  primary: '#e0e0e0',
  lineHeight: 'normal',
  textAlign: 'center',
  fontSize: '30pt',
  name: 'Default',
};

export const lightSongTheme = {
  backgroundColor: '#e0e0e0',
  textColor: '#000000',
  primary: '#333333',
  lineHeight: 'normal',
  textAlign: 'center',
  fontSize: '80pt',
  name: 'Light',
};

const presentationTheme = {
  backgroundColor: '#333333',
  textColor: '#000000',
  primary: '#e0e0e0',
  lineHeight: 'normal',
  textAlign: 'left',
  fontSize: '30pt',
  name: 'Presentation',
};
export const themes: ITheme[] = [
    defaultSongTheme,
    lightSongTheme,
    presentationTheme,
]

// export const themes = [defaultSongTheme, lightSongTheme, presentationTheme];
