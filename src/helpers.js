export function formatDate(date) {
  return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
}

export function parseJSON(string) {
  if (string && string !== undefined && string !== 'undefined') {
    return JSON.parse(string);
  } else {
    return null;
  }
}
