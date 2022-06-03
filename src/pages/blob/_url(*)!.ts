import axios from "axios"
import { page } from "epact"

function isUrlHttp(str: string): boolean {
  return !!/https?:\/{2}/.test(str)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const url = decodeURIComponent(req.params[0])
    const customHeaders = parseJSON(req.query["cs-headers"] as string)
    const inheritHeaders = parseJSON(req.query["cs-inherit-headers"] as string)
    const appendResponseHeaders = parseJSON(
      req.query["cs-append-response-headers"] as string
    )

    if (!isUrlHttp(url)) {
      res.status(405).end("Invalid URL: " + url)
      return
    }

    const requestQueries = Object.fromEntries(
      Object.entries(req.query).filter(([name]) => !name.startsWith("cs-"))
    )
    // eslint-disable-next-line no-undef
    const requestHeaders = new Headers(
      inheritHeaders === false
        ? undefined
        : (req.headers as Record<string, string>)
    )

    if (customHeaders) {
      for (const [name, value] of Object.entries(customHeaders))
        requestHeaders.append(name, value as string)
    }

    const response = await axios.get(url, {
      params: requestQueries,
      headers: customHeaders,
      responseType: "arraybuffer"
    })

    // set headers
    if (appendResponseHeaders !== false) {
      for (const [name, value] of Object.entries(response.headers)) {
        if (name.toLowerCase() === "host") continue
        res.append(name, value)
      }
    }

    res.send(Buffer.from(response.data))
  }
})
