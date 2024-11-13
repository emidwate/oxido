import fs from "fs/promises"

const articleName = "tresc_artykulu.txt"

async function readArticleFile() {
  try {
    const data = await fs.readFile(articleName, "utf-8")
    return data
  } catch (err) {
    console.error("Error reading file: ", err)
    return null
  }
}

export default readArticleFile()