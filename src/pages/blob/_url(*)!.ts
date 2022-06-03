import { page } from "epact"
import axios from "axios"

function isUrlHttp(str: string): boolean {
  return !!/https?:\/{2}/.test(str)
}

function parseJSON(json?: string): any | null {
  if (!json) return null

  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export default page({
  async get(req, res) {
    const url = req.params[0]
    const customHeaders = parseJSON(req.query["cs-headers"])
    const inheritHeaders = parseJSON(req.query["cs-inherit-headers"])
    const appendResponseHeaders = parseJSON(
      req.query["cs-append-response-headers"]
    )

    if (!isUrlHttp(url)) {
      res.status(405).end("Invalid URL: " + url)
      return
    }

    const requestQueries = Object.fromEntries(
      Object.entries(req.query).filter(([name]) => !name.startsWith("cs-"))
    )
    const requestHeaders = new Headers(
      inheritHeaders === false ? undefined : req.headers
    )

    if (customHeaders) {
      for (const [name, value] of Object.entries(customHeaders)) {
        requestHeaders.append(name, value)
      }
    }

    const response = await axios.get(url, {
      query: requestQueries,
      headers: customHeaders,
      responseType: "arraybuffer"
    })

    // set headers
    if (appendResponseHeaders !== false)
      for (const [name, value] of Object.entries(response.headers)) {
        if (name.toLowerCase() === "host") continue
        res.append(name, value)
      }

    res.send(Buffer.from(response.data))
  }
})
