//Функция возвращает рандомное целое число из диапазона включительно
function getRandomInt(min, max) {
  if (min < 0 || max <0) {
    throw new Error('negative value');
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//функция возвращает рандомное число с запятое из диапазона включительно. передается точность после запятой
function getRandomFloat (min, max, accuracy) {
  if (min < 0 || max <0) {
    throw new Error('negative float value');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return getRandomInt (Math.floor(min * Math.pow(10,accuracy)), Math.floor(max * Math.pow(10, accuracy))) / Math.pow(10, accuracy);
}
getRandomInt(100, 20);
getRandomFloat(200, 201, 2);
