export const brand = { name: 'I2V Exchange', line: 'Ideas into visible progress.' };
export const themes = {
  light: { background: '#F7F6F2', surface: '#FFFFFF', mutedSurface: '#ECEDE8', text: '#192124', muted: '#596366', border: '#D5D9D7', primary: '#214BCB', onPrimary: '#FFFFFF', accent: '#C7E692', error: '#AF2525' },
  dark: { background: '#111619', surface: '#1A2226', mutedSurface: '#232E33', text: '#F5F5EF', muted: '#B8C2C7', border: '#3C4B53', primary: '#AEC1FF', onPrimary: '#102B77', accent: '#C7E692', error: '#FFB5AF' },
};
export const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32, xxl: 48 };
export const navigation = [{ id: 'discover', label: 'Discover' }, { id: 'arena', label: 'Arena' }, { id: 'network', label: 'Network' }, { id: 'workspace', label: 'Workspace' }, { id: 'exchange', label: 'Exchange' }] as const;
export type Destination = typeof navigation[number]['id'];
