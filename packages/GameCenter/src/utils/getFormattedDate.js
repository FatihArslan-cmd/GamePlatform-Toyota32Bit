const getFormattedDate = () => {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(today);
  };
export default getFormattedDate;  