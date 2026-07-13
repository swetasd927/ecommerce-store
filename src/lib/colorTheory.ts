export type HSL = { h: number; s: number; l: number };

const clamp = (value: number, max = 100) => Math.max(0, Math.min(max, value));

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = parseInt(full, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export function hexToHsl(hex: string): HSL {
  const [r8, g8, b8] = hexToRgb(hex);
  const r = r8 / 255;
  const g = g8 / 255;
  const b = b8 / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: l * 100 };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;

  return { h: (h / 6) * 360, s: s * 100, l: l * 100 };
}

function wedgeRgb(c: number, x: number, h: number): [number, number, number] {
  const segment = Math.floor(((h % 360) + 360) % 360 / 60);
  const table: [number, number, number][] = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];
  return table[segment];
}

export function hslToHex({ h, s, l }: HSL): string {
  const sN = clamp(s) / 100;
  const lN = clamp(l) / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  const [r, g, b] = wedgeRgb(c, x, h);

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type ShadeStep = (typeof SHADE_STEPS)[number];

const LIGHTNESS_CURVE: Record<ShadeStep, number> = {
  50: 96,
  100: 92,
  200: 84,
  300: 74,
  400: 64,
  500: 54,
  600: 46,
  700: 38,
  800: 30,
  900: 22,
  950: 14,
};

export function generateShades(baseHex: string): Record<ShadeStep, string> {
  const { h, s } = hexToHsl(baseHex);
  const scale = {} as Record<ShadeStep, string>;

  for (const step of SHADE_STEPS) {
    const adjustedS = step <= 200 ? s * (step === 50 ? 0.45 : 0.6) : step >= 800 ? clamp(s * 1.08) : s;
    scale[step] = hslToHex({ h, s: adjustedS, l: LIGHTNESS_CURVE[step] });
  }

  return scale;
}

export function deriveSecondary(primaryHex: string): string {
  const { h, s, l } = hexToHsl(primaryHex);
  return hslToHex({ h: (h + 150) % 360, s, l });
}

export function getReadableTextColor(hex: string): "#ffffff" | "#111827" {
  const [r, g, b] = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111827" : "#ffffff";
}

export const PRESET_THEMES: { name: string; primary: string }[] = [
  { name: "Blue", primary: "#2541b2" },
  { name: "Green", primary: "#16a34a" },
  { name: "Purple", primary: "#7c3aed" },
  { name: "Rose", primary: "#e11d48" },
  { name: "Amber", primary: "#d97706" },
  { name: "Teal", primary: "#0d9488" },
];

export type RadiusOption = "none" | "sm" | "md" | "lg" | "full";
export const RADIUS_VALUES: Record<RadiusOption, string> = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "16px",
  full: "9999px",
};

export type ShadowOption = "none" | "soft" | "medium" | "strong";
export const SHADOW_VALUES: Record<ShadowOption, string> = {
  none: "none",
  soft: "0 1px 2px rgba(15,23,42,0.06), 0 1px 1px rgba(15,23,42,0.04)",
  medium: "0 4px 10px rgba(15,23,42,0.10), 0 2px 4px rgba(15,23,42,0.06)",
  strong: "0 12px 24px rgba(15,23,42,0.16), 0 4px 8px rgba(15,23,42,0.08)",
};