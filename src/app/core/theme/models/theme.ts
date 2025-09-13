export enum Palettes {
  LIGHT = 'light',
  DARK = 'dark',
  OCEAN = 'ocean',
  FOREST = 'forest',
  PASTEL = 'pastel',
  SUNSET = 'sunset',
}

export interface Theme {
  palette: Palettes;
}

export const themes: Theme[] = [{ palette: Palettes.LIGHT }, { palette: Palettes.DARK }, { palette: Palettes.OCEAN }];
