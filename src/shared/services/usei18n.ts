import { computed } from 'vue';
import { t, toggleLanguage, getCurrentLocale } from './i18n';

export function useI18n() {
  return {
    t,
    toggleLanguage,
    currentLocale: computed(() => getCurrentLocale()),
    availableLocales: ['en', 'es'] as const
  };
}
