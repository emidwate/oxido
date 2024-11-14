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
                        Nie dodawaj komentarzy, bez prefiksu. Pozostaw tag body pusty wewnątrz.
                    `
        },
        {
            role: "user",
            content: `
                        Dodaj styl do pliku 
                        <style>
                            * {padding: 0;margin: 0;box-sizing: border-box;}body{width: 300px;margin: 3rem auto;text-align: center;} 
                            figure {margin: 3rem auto;max-width: 650px;text-align: center;display: flex;flex-direction: column;gap: 1rem;}
                            .content {margin: 1rem 0;font-size: 1rem;color: #333333;font-family: Georgia, 'Times New Roman', Times, serif;}
                            .title {padding-bottom: 1rem;border-bottom: 2px solid black;}
                            @media screen and (min-width: 600px) {body {width: 800px;}}
                        </style>

                        Dodaj skrypt JavaScript do pliku 
                        const originalBody = document.body.cloneNode(true)
                        const bodyNodes = Array.from(originalBody.childNodes)
                        document.body.innerHTML = ""
                        for (let bodyChild of bodyNodes) {
                            if(bodyChild.nodeName == '#text') {
                                const textToArray = Array.from(bodyChild.nodeValue.split("\n"))
                                const trimmedText = textToArray.filter(item => item !== "")
                                trimmedText.forEach((elem, index) => {
                                    if (index == 0) {
                                        const h2 = createHTMLTag('h2', ["innerText", "className"], [elem, "title"])
                                        document.body.appendChild(h2)
                                    } else {
                                        const p = createHTMLTag("p", ["innerText", "className"], [elem, "content"])
                                        p.innerText == "undefined" ? '' : document.body.appendChild(p)
                                    }
                                })
                            } else if (bodyChild.nodeName == "FIGURE") {
                                document.body.appendChild(bodyChild)
                            }
                        }
                        function createHTMLTag(tagName, attributes, values) {
                            const element = document.createElement(tagName)
                            attributes.forEach((option, index) => {
                                element[option] = values[index]
                            })
                            return element
                        }    
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