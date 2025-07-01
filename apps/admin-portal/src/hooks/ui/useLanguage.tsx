import { LanguageContext } from '@/providers/LanguageProvider';
import { useContext } from 'react';

export const useLanguage = () => useContext(LanguageContext);
