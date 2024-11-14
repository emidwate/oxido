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
                        Jesteś deweloperem edytującym podany przez użytkownika artykuł. Artykuł zwróć w formacie tekstowym. 
                        Nie dodawaj znaczników innych niż podano poniżej. Po każdym tytule pod dwoma akapitami dodaj zdjęcie, które ma być w znaczniku <figure>. 
                        Wewnątrz znacznika <figure> zdjęcie ma być w znaczniku <img> gdzie atrybut src=”image_placeholder.jpg” 
                        zaś atrybut alt jest skróconą do jednego zdania wersją dwóch powyższych akapitów. Dodaj podpis figcaption do każdej z grafik, 
                        podpis ma składać się z jednego słowa.
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