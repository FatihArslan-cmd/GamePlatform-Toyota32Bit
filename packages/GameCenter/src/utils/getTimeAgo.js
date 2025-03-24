import { useTranslation } from 'react-i18next';

export const getTimeAgo = (timestamp) => {
  const { t } = useTranslation(); 

  const seconds = Math.floor((new Date() - timestamp) / 1000);

  let interval = seconds / 31536000; 
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('years');
  }

  interval = seconds / 2592000; 
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('months');
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('days');
  }

  interval = seconds / 3600; 
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('hours');
  }

  interval = seconds / 60; 
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('minutes');
  }

  if (seconds < 10) return t('justNow'); 

  return Math.floor(seconds) + ' ' + t('seconds');
};
