import { createClient } from '@sanity/client'
import fs from 'fs'
import readline from 'readline'

const projectId = 'wplpjccf'
const dataset = 'production'
const token = 'skP6K00qHVZoYOgigF1ep2DnWJiXsEsdwmBKOwTiGBhTCwg5VtJEkfdX0HdthuifFCKsLnVf0dk6U5Nhno9OtyELMn7sleDvOmsaB5nsNCj5CRuG15LG0SMjpiBSyPuEjtLEhjdBJUKEA5MDP8NE0tCFdUtQsjEEUxJvQ7awBN3KvWGwMxQa'

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-04-14',
  useCdn: false,
})

async function importNdjson(filePath) {
  const docs = []
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    if (line.trim()) {
      docs.push(JSON.parse(line))
    }
  }

  // Remove _id if present to let Sanity generate one, unless it's meant to be fixed
  const prepared = docs.map(doc => {
    if (!doc._id) {
      delete doc._id
    }
    return doc
  })

  console.log(`Importing ${prepared.length} documents from ${filePath}...`)
  const transaction = client.transaction()
  for (const doc of prepared) {
    transaction.create(doc)
  }
  await transaction.commit()
  console.log(`Successfully imported ${prepared.length} documents.`)
}

async function main() {
  await importNdjson('./sample-data/clinic-sample.ndjson')
  await importNdjson('./sample-data/articles-10.ndjson')
}

main().catch(err => {
  console.error('Import failed:', err)
  process.exit(1)
})
