const alphabet = 'abcdefghijklmnopqrstuvwxyz';

exports.encrypt = function (message, shift) {
  return Array.from(message).map(function (character) {
    const originalIndex = alphabet.indexOf(character);
    const newIndex = originalIndex + shift;
    return alphabet[newIndex];
  }).join('');
};
