const timeAgo = (dateStr: string): string => {
  if (!dateStr) return '';
  const now = new Date();
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('.').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  const pastDate = new Date(year, month - 1, day, hours, minutes);

  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const minuteInSeconds = 60;
  const hourInSeconds = minuteInSeconds * 60;
  const dayInSeconds = hourInSeconds * 24;
  const weekInSeconds = dayInSeconds * 7;
  const monthInSeconds = dayInSeconds * 30;
  const yearInSeconds = dayInSeconds * 365;

  if (diffInSeconds < minuteInSeconds) {
    return `${diffInSeconds} СЕК`;
  } else if (diffInSeconds < hourInSeconds) {
    const minutes = Math.floor(diffInSeconds / minuteInSeconds);
    return `${minutes} МИН`;
  } else if (diffInSeconds < dayInSeconds) {
    const hours = Math.floor(diffInSeconds / hourInSeconds);
    return `${hours} ЧАС`;
  } else if (diffInSeconds < weekInSeconds) {
    const days = Math.floor(diffInSeconds / dayInSeconds);
    return `${days} ДЕН`;
  } else if (diffInSeconds < monthInSeconds) {
    const weeks = Math.floor(diffInSeconds / weekInSeconds);
    return `${weeks} НЕД`;
  } else if (diffInSeconds < yearInSeconds) {
    const months = Math.floor(diffInSeconds / monthInSeconds);
    return `${months} МЕС`;
  } else {
    const years = Math.floor(diffInSeconds / yearInSeconds);
    return `${years} ГОД`;
  }
};

export default timeAgo;
