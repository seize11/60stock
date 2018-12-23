export const formatTimestamp = (date, format) => {
  let newDate = null;
  if (typeof date === 'object') {
    newDate = date;
  } else if (typeof date === 'string') {
    newDate = new Date(parseInt(date, 10));
  } else {
    return null;
  }
  const newFormat = format || 'YYYY-MM-DD';
  const values = {
    Y: newDate.getFullYear(),
    M: newDate.getMonth() + 1,
    D: newDate.getDate(),
    h: newDate.getHours(),
    m: newDate.getMinutes(),
    s: newDate.getSeconds(),
  };

  return newFormat.replace(/Y+|M+|D+|h+|m+|s+/g, (match) => {
    let result = values[match[0]];
    if (match.length > 1 && result.toString().length !== match.length) {
      result = ((new Array(match.length)).join('0') + result).slice(-2);
    }
    return result;
  });
};
