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
const fs = require('fs');

// КРОК 4. Зчитування config.json
async function loadConfig(filename) {
  try {
    const data = await fs.promises.readFile(filename, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Не вдалося зчитати config.json:', error);
    return null;
  }
}
const https = require('https');

// КРОК 5. Отримання поради з API
async function getDataFromApi(apiKey) {
  const url = 'https://api.adviceslip.com/advice'; // apiKey не потрібен, але вказуємо як приклад

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(`❌ Помилка запиту: ${res.statusCode}`);
        }
      });
    }).on('error', err => reject(err));
  });
}
const readline = require('readline');

async function main() {
  const config = await loadConfig('config.json');
  if (!config) return;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Натисніть Enter, щоб отримати пораду 🧠: ', async () => {
    try {
      const data = await getDataFromApi(config.api_key);
      const advice = data.slip.advice;

      console.log('\n💡 Порада дня:');
      console.log(advice);

      fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
      console.log('\n✅ Відповідь збережено у "output.json"');

    } catch (err) {
      console.error(err);
    }

    rl.close();
  });
}

main();
