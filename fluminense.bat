@echo off
setlocal EnableDelayedExpansion

set "baseUrl=https://0l51a8xu73.execute-api.eu-west-1.amazonaws.com/production/votes"
set "eventCode=MENCLUB2023"
set "referer=https://vote.globesoccer.com/"

for /l %%i in (1, 1, 10000) do (
       :: Chama o PowerShell para gerar o UUID
    for /f %%a in ('powershell -Command "[guid]::NewGuid().ToString()"') do (
        set "id=%%a"
        echo UUID gerado: !id!
    )
    curl -X POST "%baseUrl%" ^
         -H "authority: 0l51a8xu73.execute-api.eu-west-1.amazonaws.com" ^
         -H "accept: */*" ^
         -H "accept-language: pt-BR,pt;q=0.9" ^
         -H "origin: https://vote.globesoccer.com" ^
         -H "referer: %referer%" ^
         -H "sec-ch-ua: \"Chromium\";v=\"118\", \"Opera\";v=\"104\", \"Not=A?Brand\";v=\"99\"" ^
         -H "sec-ch-ua-mobile: ?0" ^
         -H "sec-ch-ua-platform: \"Windows\"" ^
         -H "sec-fetch-dest: empty" ^
         -H "sec-fetch-mode: cors" ^
         -H "sec-fetch-site: cross-site" ^
         -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0" ^
         -d "eventCode=%eventCode%&voterId=!id!&hash=&vote=9"

    rem Clearing the generated ID for the next iteration
    set "id="
)
