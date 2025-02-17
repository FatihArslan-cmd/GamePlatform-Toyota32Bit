export const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
  
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + ' yıl önce';
    }
    
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' ay önce';
    }
    
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' gün önce';
    }
    
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' saat önce';
    }
    
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' dakika önce';
    }
    
    if (seconds < 10) return 'şimdi';
    
    return Math.floor(seconds) + ' saniye önce';
  };