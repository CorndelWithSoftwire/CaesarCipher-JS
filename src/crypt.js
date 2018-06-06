const alphabet = 'abcdefghijklmnopqrstuvwxyz';

exports.encrypt = function (message, shift) {
  return Array.from(message).map(function (character) {
    const originalIndex = alphabet.indexOf(character);

    if (originalIndex < 0) {
      return character;
    }

    const newIndex = originalIndex + shift;
    return alphabet[newIndex];
  }).join('');
};
