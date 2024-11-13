import "dotenv/config"
import OpenAI from "openai"
import fs from "fs/promises"
import readArticleFile from "./articleContent.js"

const API_KEY = process.env.OPENAI_API_KEY

const outcomeFileName = "artykul.html"

const openai = new OpenAI({
    apiKey: API_KEY
})

async function prompt() {
    const articleContent = await readArticleFile
    
    async function chatCompletion() {
        const messages = [
            {
                role: "system",
                content: `
                            Jesteś deweloperem edytującym podany przez użytkownika artykuł. Nie dodawaj nagłówków ani komentarzy.
                            Artykuł zwróć w formacie tekstowym. Po tytule pod dwoma akapitami dodaj zdjęcie, które ma być w znaczniku <figure>. 
                            Wewnątrz znacznika <figure> zdjęcie ma być w znaczniku <img> gdzie atrybut src=”image_placeholder.jpg” zaś 
                            atrybut alternatywny tekst jest skróconą do jednego zdania wersją dwóch powyższych akapitów. 
                            Dodaj podpis figcaption do każdej z grafik, podpis ma składać się z jednego słowa. Całość składa się razem z 3 takich zdjęć. 
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
    chatCompletion()
}

prompt()