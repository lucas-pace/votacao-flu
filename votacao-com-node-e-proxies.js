// require fetch
const fetch = require('node-fetch');

const baseUrl = 'https://0l51a8xu73.execute-api.eu-west-1.amazonaws.com/production/votes';
const eventCode = 'MENCLUB2023';
const referer = 'https://vote.globesoccer.com/';
let proxies = []; // Lista de proxies inicial vazia

function fetchProxyList() {
  fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt')
    .then(response => response.text())
    .then(data => {
      proxies = data.split('\n').filter(proxy => proxy); // Divide as linhas e remove linhas vazias
      console.log('Lista de proxies atualizada:', proxies);
    })
    .catch(error => {
      console.error('Erro ao buscar lista de proxies:', error);
    });
}

function makeRequest() {
  return new Promise(resolve => {
    const id = generateUUID();
    console.log('UUID gerado:', id);

    if (proxies.length === 0) {
      console.log('Aguardando atualização da lista de proxies...');
      resolve();
      return;
    }

    const randomIndex = Math.floor(Math.random() * proxies.length);
    const proxy = proxies[randomIndex];

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authority': '0l51a8xu73.execute-api.eu-west-1.amazonaws.com',
        'accept': '*/*',
        'accept-language': 'pt-BR,pt;q=0.9',
        'origin': 'https://vote.globesoccer.com',
        'referer': referer,
        'sec-ch-ua': '"Chromium";v="118", "Opera";v="104", "Not=A?Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0',
        'X-Forwarded-For': proxy
      },
      body: `eventCode=${eventCode}&voterId=${id}&hash=&vote=9`
    })
    .then(response => {
      console.log('Response:', response.status);
      resolve();
    })
    .catch(error => {
      console.error('Error:', error);
      resolve();
    });
  });
}

async function sendRequests() {
  fetchProxyList(); // Busca a lista de proxies inicialmente
  setInterval(fetchProxyList, 5 * 60 * 1000); // Atualiza a lista a cada 5 minutos

  while (true) {
    await makeRequest();
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

sendRequests();

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
