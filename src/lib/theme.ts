export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "acestar-theme";

/**
 * Runs synchronously in <head> before first paint (see app/layout.tsx).
 * - Reads the saved preference (light | dark | system), defaulting to system.
 * - Writes the resolved theme to <html data-theme>.
 * - Follows OS changes while the preference is "system".
 * - Adds the `js` class so scroll-reveal styles only hide content when JS is running.
 * Kept dependency-free and wrapped in try/catch: storage can be unavailable.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');var k='${THEME_STORAGE_KEY}';function pref(){try{return localStorage.getItem(k)||'system'}catch(e){return 'system'}}var mq=window.matchMedia('(prefers-color-scheme: dark)');function apply(){var p=pref();var t=p==='system'?(mq.matches?'dark':'light'):p;d.setAttribute('data-theme',t);d.style.colorScheme=t}apply();try{mq.addEventListener('change',function(){if(pref()==='system')apply()})}catch(e){}})();`;
