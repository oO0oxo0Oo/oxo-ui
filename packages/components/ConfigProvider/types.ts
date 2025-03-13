import type { Language, TranslatePair } from "@oxo-ui/locale";

export interface ConfigProviderProps {
  locale?: Language;
  extendsI18nMsg?: TranslatePair;
}
