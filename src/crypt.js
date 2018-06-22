const alphabet = 'abcdefghijklmnopqrstuvwxyz';

exports.encrypt = function (message, shift) {
  return shiftCharacters(message, shift);
};

exports.decrypt = function (message, shift) {
  return shiftCharacters(message, 0 - shift);
};

function shiftCharacters(message, shift) {
  return Array.from(message.toLowerCase()).map(function (character) {
    const originalIndex = alphabet.indexOf(character);

    if (originalIndex < 0) {
      return character;
    }

    const newIndex = positiveModulo(originalIndex + shift, 26);
    return alphabet[newIndex];
  }).join('');
}

function positiveModulo(n, divisor) {
  return ((n % divisor) + divisor) % divisor;
}
