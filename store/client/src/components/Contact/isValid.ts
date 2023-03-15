const isValid = (input: HTMLInputElement): boolean => {
  let pattern;

  switch (input.name) {
    case 'company':
      return input.value.trim() !== '';
    case 'name':
      pattern = /^[-а-я]{2,}( [-а-я]{2,}){1,2}$/i;

      return pattern.test(input.value.trim());
    case 'email':
      pattern = /^[-_.a-z]+@([-a-z]+\.){1,2}[a-z]+$/i;

      return pattern.test(input.value.trim());
    case 'phone':
      pattern = /^\+375\([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/i;

      return pattern.test(input.value.trim());
    case 'question':
      return input.value.trim() !== '';
    case 'type':
      return input.value.trim() === 'commercial' || input.value.trim() === 'privat';
    default: return false;
  }
};

export default isValid;
