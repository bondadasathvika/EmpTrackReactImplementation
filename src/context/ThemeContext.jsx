import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS, THEMES } from '../utils/constants';
import { readStorage, writeStorage } from '../utils/helpers';

export const ThemeContext = createContext(null);

function getInitialTheme() {
  const saved = readStorage(STORAGE_KEYS.THEME);
  if (saved === THEMES.LIGHT || saved === THEMES.DARK) return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Colors are CSS variables keyed off [data-theme] (see styles/variables.css).
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeStorage(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)),
    [],
  );

  const value = useMemo(
    () => ({ theme, isDark: theme === THEMES.DARK, setTheme, toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
