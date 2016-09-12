export const pluralizer = (text, number) => {
  if(number > 1){
    if(text.substring(text.length - 2) === "es"){
      return text + 'es';
    } else {
      return text + 's';
    }

  } else {
    return text;
  }
}
