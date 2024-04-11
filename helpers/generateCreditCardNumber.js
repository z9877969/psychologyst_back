function generateValidCreditCardNumber() {
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Генеруємо перші 15 цифр (з 1 по 15)
  let cardNumber = '';
  for (let i = 0; i < 15; i++) {
    cardNumber += getRandomNumber(0, 9);
  }

  // Відбираємо останню цифру як контрольну суму
  let sum = 0;
  let isSecondDigit = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);

    if (isSecondDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isSecondDigit = !isSecondDigit;
  }

  let checksumDigit = 10 - (sum % 10);
  if (checksumDigit === 10) {
    checksumDigit = 0;
  }

  cardNumber += checksumDigit;

  return cardNumber;
}

// Приклад використання:
const validCreditCardNumber = generateValidCreditCardNumber();
console.log(
  'Згенерований валідний номер кредитної картки:',
  validCreditCardNumber
);
// 7824894019722173
