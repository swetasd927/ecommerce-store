import { useTheme } from "../hooks/useTheme";
import { PRESET_THEMES, type RadiusOption, type ShadowOption } from "../lib/colorTheory";
import { cn } from "../lib/cn";

const RADIUS_OPTIONS: RadiusOption[] = ["none", "sm", "md", "lg", "full"];
const SHADOW_OPTIONS: ShadowOption[] = ["none", "soft", "medium", "strong"];

function OptionGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (option: T) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "flex-1 rounded-lg border px-2 py-1.5 text-xs capitalize transition-colors",
            value === option
              ? "border-primary-500 text-primary-700 dark:text-primary-400"
              : "border-surface text-ink-secondary",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function ThemeCustomizer() {
  const {
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
  } = useTheme();

  return (
    <div className="surface-card border-surface w-80 space-y-6 rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-ink-primary font-display text-base font-semibold">Theme</h3>
        <button onClick={resetTheme} className="text-ink-secondary text-xs hover:underline">
          Reset to default
        </button>
      </div>

      <div>
        <p className="text-ink-secondary mb-2 text-xs font-medium uppercase tracking-wide">Mode</p>
        <div className="flex gap-2">
          {(["light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => mode !== theme && toggleTheme()}
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm capitalize transition-colors",
                theme === mode
                  ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400"
                  : "border-surface text-ink-secondary",
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-ink-secondary mb-2 text-xs font-medium uppercase tracking-wide">
          Primary color
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_THEMES.map((preset) => (
            <button
              key={preset.name}
              type="button"
              aria-label={preset.name}
              title={preset.name}
              onClick={() => setPrimaryColor(preset.primary)}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                primaryColor.toLowerCase() === preset.primary.toLowerCase()
                  ? "border-ink-900 dark:border-white"
                  : "border-transparent",
              )}
              style={{ backgroundColor: preset.primary }}
            />
          ))}
          <label
            title="Custom color"
            className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-dashed border-gray-300 dark:border-gray-700"
          >
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="absolute -left-1 -top-1 h-10 w-10 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div>
        <p className="text-ink-secondary mb-2 text-xs font-medium uppercase tracking-wide">
          Secondary color
        </p>
        <div className="flex items-center gap-2">
          <label className="relative inline-block h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-gray-300 dark:border-gray-700">
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="absolute -left-1 -top-1 h-10 w-10 cursor-pointer"
            />
          </label>
          <span className="text-ink-secondary text-xs">Auto-derived from primary unless picked</span>
        </div>
      </div>

      <div>
        <p className="text-ink-secondary mb-2 text-xs font-medium uppercase tracking-wide">Corners</p>
        <OptionGroup options={RADIUS_OPTIONS} value={radius} onChange={setRadius} />
      </div>

      <div>
        <p className="text-ink-secondary mb-2 text-xs font-medium uppercase tracking-wide">
          Shadow depth
        </p>
        <OptionGroup options={SHADOW_OPTIONS} value={shadow} onChange={setShadow} />
      </div>

      <div className="border-surface space-y-2 border-t pt-4">
        <p className="text-ink-secondary text-xs font-medium uppercase tracking-wide">Preview</p>
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-theme shadow-theme bg-primary-500 px-4 py-2 text-sm font-medium text-white">
            Primary
          </button>
          <button className="rounded-theme shadow-theme bg-secondary-500 px-4 py-2 text-sm font-medium text-white">
            Secondary
          </button>
          <span className="status-success rounded-full px-2.5 py-1 text-xs font-medium">Paid</span>
          <span className="status-danger rounded-full px-2.5 py-1 text-xs font-medium">Failed</span>
          <span className="status-neutral rounded-full px-2.5 py-1 text-xs font-medium">Pending</span>
        </div>
      </div>
    </div>
  );
}

export default ThemeCustomizer;