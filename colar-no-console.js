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



const tempo = 500 // Envio de voto a cada 500ms ( meio segundo ). Alterar se quiser, mas pode crashar o navegador. Se tiver travando muito, aumenta o tempo

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


const headers = new Headers();
  headers.append("authority", "gs-voting.oddb.co");
  headers.append("accept", "*/*");
  headers.append("accept-language", "pt-BR,pt;q=0.9");
  headers.append("origin", "https://vote.globesoccer.com");
  headers.append("referer", "https://vote.globesoccer.com/");
  headers.append("sec-ch-ua", "\"Opera\";v=\"105\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"");
  headers.append("sec-ch-ua-mobile", "?1");
  headers.append("sec-ch-ua-platform", "\"Android\"");
  headers.append("sec-fetch-dest", "empty");
  headers.append("sec-fetch-mode", "cors");
  headers.append("sec-fetch-site", "cross-site");
  headers.append("user-agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36");


function enviarSolicitacao() {
  

  var formdata = new FormData();
  formdata.append("eventCode", "FINALMENCLUB2023");
  formdata.append("voterId", generateUUID());
  formdata.append("hash", "");
  formdata.append("vote", "5");

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://gs-voting.oddb.co/votes", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


// Inicia o loop de envio da solicitação POST a cada segundo
var intervalId = setInterval(enviarSolicitacao, tempo);


