import "dotenv/config"
import OpenAI from "openai"
import fs from "fs/promises"

const API_KEY = process.env.OPENAI_API_KEY

const templateFileName = "szablon.html"

const openai = new OpenAI({
    apiKey: API_KEY
})

async function template() {
    const messages = [
        {
            role: "system",
            content: `
                        Jesteś deweloperem tworzącym szablon dla artykułu. Stwórz plik html, który uzupełnisz o dane podane przez użytkownika. 
                        Nie dodawaj komentarzy, bez prefiksu, bez oznaczenia bloku kodu. Pozostaw tag body pusty wewnątrz.
                    `
        },
        {
            role: "user",
            content: `
                        Do pliku dodaj styl 
                        * {margin: 0; padding: 0; box-sizing: border-box;} 
                        body {margin: 2rem; background-color: #f4f4f4; line-height: 1.6; font-family: 'Cambria', 'Cochin', 'Georgia', 'Times', 'Times New Roman', serif;} 
                        .article {margin-bottom: 2rem;} 
                        .content {padding: 3rem; margin-bottom: 2rem; text-align: center; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);} 
                        .title {color: #333; padding-bottom: 0.5rem; border-bottom: 2px solid #f5a623;} 
                        .paragraph {font-size: 1.1rem; margin: 1rem 0; color: #666;} 
                        .img {width: 100%; height: auto; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);} 
                        figure {text-align: center;} 
                        figcaption {font-size: 1.2rem; color: #666; font-style: italic;} 
                        @media screen and (min-width: 600px) {body {max-width: 1000px; margin: 3rem auto;} 
                        .article {display: flex; gap: 3rem; margin-bottom: 3rem;} .content {width: 60%;} .title {font-size: 2.2rem;} .img {width: 100%; height: 450px;}}


                     `
        }
    ]
    
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",                                                                       // if you want a different gpt model, change it here
        messages: messages
    })
    fs.writeFile(templateFileName, completion.choices[0].message.content)                            // file creation with gpt response 
}

template()