import "dotenv/config"
import OpenAI from "openai"
import fs from "fs/promises"
import readArticleFile from "./articleContent.js"

const API_KEY = process.env.OPENAI_API_KEY

const outcomeFileName = "artykul.html"

const openai = new OpenAI({
    apiKey: API_KEY
})

async function query() {
    const articleContent = await readArticleFile

    const messages = [
        {
            role: "system",
            content: `
                        Utwórz dla każdego artykułu z osobna kontener z klasą article. Wewnątrz kontenera article stwórz kontener z klasą content, gdzie zamieścisz tytuł oraz paragrafy. 
                        Do każdego tytułu dodaj znacznik nagłówka <h2> z klasą title. Każdy akapit powinien być w znaczniku <p> z klasą paragraph.
                        Pod tytułem oraz dwoma akapitami umieść zdjęcie, które będzie w znaczniku <figure> ma znajdować się pod kontenerem content, ale nadal wewnątrz kontenera article. 
                        Wewnątrz <figure> dodaj zdjęcie w znaczniku <img> z klasą img, gdzie src="image_placeholder.jpg", 
                        a alt to skrócona do jednego zdania wersja dwóch poprzedzających go akapitów. Do każdej grafiki dodaj podpis w znaczniku <figcaption>, zawierający jedno słowo. 
                        Następnie przejdź do kolejnego artykułu i powtórz proces, zaczynając od stworzenia kontenera z klasą article.
                        Usuń ostatni paragraf. Nie dodawaj komentarzy, bez prefiksu, bez oznaczenia bloku kodu.
                    `
        },
        {
            role: "user",
            content: articleContent
        }
    ]
    
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",                                                                       // if you want a different gpt model, change it here
        messages: messages
    })
    fs.writeFile(outcomeFileName, completion.choices[0].message.content)                            // file creation with gpt response 
}

query()