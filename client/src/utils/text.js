export const pluralizer = (text, number = 0) => {
  if(number > 1 || number === 0){
    return (text.substring(text.length - 2) === "es") ? text + 'es' : text + 's';
  } else {
    return text;
  }
}
