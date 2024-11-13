# Oxido zadanie rekrutacyjne
Created using Javascript and Node.js
To run this project you need to have Node environment installed on your machine,
simply download files to your computer, open terminal in root directory, 
type 'npm i' then 'node openAIQuery.js' and voilà.
Don't forget to place your API key in .env file, otherwise it won't work!

The program works in a simple way, downloaded content of the article from tresc_artykulu.txt file in the articleContent.js 
is passed to openAIQuery.js where as a prompt we give it to AI and wait for response which will appear in artykul.html 