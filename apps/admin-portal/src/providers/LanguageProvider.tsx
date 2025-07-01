import { type LanguageType } from '@/type';
import en, { type TranslationType } from '@/common/locales/en';
import de from '@/common/locales/de';
import { LanguageProviderCreator } from 'shared';

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};
const defaultLang: LanguageType = 'en';

const { LanguageContext, LanguageProvider } = LanguageProviderCreator<
  LanguageType,
  TranslationType
>(defaultLang, resources);

export { LanguageContext, LanguageProvider };
