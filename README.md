# Oxido 
Created using Javascript and Node.js
To run this project you need to have Node environment installed on your machine,
simply download files to your computer, open terminal in root directory, 
type 'npm i' then 'node openAIQuery.js' and voilà.
To create template for this project simply type 'node template.js'.

It is best to delete the artykul.html and szablon.html files, they will be recreated after running the above commands.

You can see a sample preview in the file podglad.html, just open it in your browser by double-clicking on it.

Don't forget to place your API key in .env file, otherwise it won't work!

The program works in a simple way, downloaded content of the article from tresc_artykulu.txt file in the articleContent.js 
is passed to openAIQuery.js where as a prompt we give it to ChatGPT and wait for response which will appear in artykul.html 