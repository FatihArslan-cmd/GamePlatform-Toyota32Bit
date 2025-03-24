import { useTranslation } from 'react-i18next';

const getFormattedDate = () => {
  const { i18n } = useTranslation(); 
  const locale = i18n.language || 'tr-TR'; 
  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Intl.DateTimeFormat(locale, options).format(today);
};

export default getFormattedDate;
