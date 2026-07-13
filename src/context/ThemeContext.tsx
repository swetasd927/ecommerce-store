import { createContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  PRESET_THEMES,
  RADIUS_VALUES,
  SHADOW_VALUES,
  deriveSecondary,
  generateShades,
  type RadiusOption,
  type ShadowOption,
} from "../lib/colorTheory";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  radius: RadiusOption;
  setRadius: (radius: RadiusOption) => void;
  shadow: ShadowOption;
  setShadow: (shadow: ShadowOption) => void;
  resetTheme: () => void;
}

const STORAGE_KEY = "theme";
const PRIMARY_KEY = "theme-primary";
const SECONDARY_KEY = "theme-secondary";
const SECONDARY_CUSTOM_KEY = "theme-secondary-custom";
const RADIUS_KEY = "theme-radius";
const SHADOW_KEY = "theme-shadow";

const DEFAULT_PRIMARY = PRESET_THEMES[0].primary;
const DEFAULT_RADIUS: RadiusOption = "md";
const DEFAULT_SHADOW: ShadowOption = "soft";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  });

  const [primaryColor, setPrimaryColorState] = useState<string>(
    () => localStorage.getItem(PRIMARY_KEY) ?? DEFAULT_PRIMARY,
  );

  const [secondaryColor, setSecondaryColorState] = useState<string>(() => {
    const stored = localStorage.getItem(SECONDARY_KEY);
    const isCustom = localStorage.getItem(SECONDARY_CUSTOM_KEY) === "true";
    if (stored && isCustom) return stored;
    return deriveSecondary(primaryColor);
  });

  const hasCustomSecondary = useRef<boolean>(
    localStorage.getItem(SECONDARY_CUSTOM_KEY) === "true",
  );

  const [radius, setRadius] = useState<RadiusOption>(
    () => (localStorage.getItem(RADIUS_KEY) as RadiusOption | null) ?? DEFAULT_RADIUS,
  );
  const [shadow, setShadow] = useState<ShadowOption>(
    () => (localStorage.getItem(SHADOW_KEY) as ShadowOption | null) ?? DEFAULT_SHADOW,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(PRIMARY_KEY, primaryColor);
    const shades = generateShades(primaryColor);
    for (const [step, hex] of Object.entries(shades)) {
      document.documentElement.style.setProperty(`--color-primary-${step}`, hex);
    }
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem(SECONDARY_KEY, secondaryColor);
    const shades = generateShades(secondaryColor);
    for (const [step, hex] of Object.entries(shades)) {
      document.documentElement.style.setProperty(`--color-secondary-${step}`, hex);
    }
  }, [secondaryColor]);

  useEffect(() => {
    localStorage.setItem(RADIUS_KEY, radius);
    document.documentElement.style.setProperty("--radius-theme", RADIUS_VALUES[radius]);
  }, [radius]);

  useEffect(() => {
    localStorage.setItem(SHADOW_KEY, shadow);
    document.documentElement.style.setProperty("--shadow-theme", SHADOW_VALUES[shadow]);
  }, [shadow]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
    if (!hasCustomSecondary.current) {
      setSecondaryColorState(deriveSecondary(color));
    }
  };

  const setSecondaryColor = (color: string) => {
    hasCustomSecondary.current = true;
    localStorage.setItem(SECONDARY_CUSTOM_KEY, "true");
    setSecondaryColorState(color);
  };

  const resetTheme = () => {
    hasCustomSecondary.current = false;
    localStorage.setItem(SECONDARY_CUSTOM_KEY, "false");
    setPrimaryColorState(DEFAULT_PRIMARY);
    setSecondaryColorState(deriveSecondary(DEFAULT_PRIMARY));
    setRadius(DEFAULT_RADIUS);
    setShadow(DEFAULT_SHADOW);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        radius,
        setRadius,
        shadow,
        setShadow,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;