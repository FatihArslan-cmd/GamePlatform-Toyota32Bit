const formatDate = (dateString, includeTime = false) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  let formattedDate = `${day}/${month}/${year}`;

  if (includeTime) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    formattedDate += ` ${hours}:${minutes}`;
  }

  return formattedDate;
};

export default formatDate;