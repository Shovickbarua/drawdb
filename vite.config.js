import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  configureServer(server) {
    const diagramsDir = path.resolve(__dirname, 'public', 'diagrams')

    server.middlewares.use(async (req, res, next) => {
      const url = req.url || ''

      if (url === '/__local_api/diagrams/list' && req.method === 'GET') {
        try {
          await fs.promises.mkdir(diagramsDir, { recursive: true })
          const files = await fs.promises.readdir(diagramsDir)
          const jsonFiles = files.filter((f) => f.toLowerCase().endsWith('.json'))
          // Write index.json for static listing fallback
          const indexPath = path.join(diagramsDir, 'index.json')
          await fs.promises.writeFile(indexPath, JSON.stringify(jsonFiles, null, 2))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(jsonFiles))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Failed to list diagrams' }))
        }
        return
      }

      if (url === '/__local_api/diagrams/save' && req.method === 'POST') {
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}')
            const name = data.name
            const payload = data.payload
            if (!name || typeof payload !== 'object') {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Invalid payload' }))
              return
            }
            await fs.promises.mkdir(diagramsDir, { recursive: true })
            const filePath = path.join(diagramsDir, `${name}.json`)
            await fs.promises.writeFile(filePath, JSON.stringify(payload, null, 2))
            // Update index.json after save
            const files = await fs.promises.readdir(diagramsDir)
            const jsonFiles = files.filter((f) => f.toLowerCase().endsWith('.json'))
            const indexPath = path.join(diagramsDir, 'index.json')
            await fs.promises.writeFile(indexPath, JSON.stringify(jsonFiles, null, 2))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to save diagram' }))
          }
        })
        return
      }

      next()
    })
  },
})
