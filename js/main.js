//Функция возвращает рандомное целое число из диапазона включительно
function getRandomInt(min, max) {
  if (min > max) {
    let storage = min;
    min = max;
    max = storage;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//функция возвращает рандомное число с запятое из диапазона включительно. передается точность после запятой
function getRandomFloat (min, max, accuracy) {
  if (min > max) {
    let storage = min;
    min = max;
    max = storage;
  }

  return Math.floor(Math.random() * (max - min + 1) * Math.pow(10, accuracy)) / Math.pow(10, accuracy) + min;
}


console.log(getRandomInt(100, 20));
console.log(getRandomFloat(250, 200, 2));
