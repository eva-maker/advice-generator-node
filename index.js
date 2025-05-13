const https = require('https');
const fs = require('fs');

// Функція для отримання активності з API
async function getActivity() {
  const url = 'https://api.adviceslip.com/advice';

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(`Помилка: код статусу ${res.statusCode}`);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

// Основна функція
async function main() {
  try {
    const activityData = await getActivity();

    // Вивід короткої інформації у консоль
    console.log('Ідея для активності: ');
    console.log('Активність:', activityData.activity);
    console.log('Тип:', activityData.type);
    console.log('Кількість учасників:', activityData.participants);

    // Збереження у файл
    fs.writeFileSync('output.json', JSON.stringify(activityData, null, 2));
    console.log('\n Дані збережено у "output.json"');

  } catch (error) {
    console.error('Виникла помилка: ' , error);
  }
}

main();
