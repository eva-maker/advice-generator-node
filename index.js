// Імпорти
const https = require('https');
const fs = require('fs');
const readline = require('readline');

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

// КРОК 5. Отримання поради з API
async function getDataFromApi(apiKey) {
  const url = 'https://api.adviceslip.com/advice'; 

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

// КРОК 6. Основна логіка
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
