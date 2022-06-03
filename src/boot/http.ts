import fs, { rmSync } from "fs"
import os from "os"
import { join } from "path"
import url from "url"

import axios from "axios"
import { setupCache } from "axios-cache-adapter"
import axiosRetry from "axios-retry"
import { boot } from "epact"

const baseURL = "http://truyenqqmoi.com"
const cacheDir = join(os.tmpdir(), "api-truyenqq")
const expiresCache = 15 * 6e4 // 60 * 1000

class Store {
  private _length = 0
  private _localStorage = new Map<
    string,
    {
      created: number
      data: string
    }
  >()

  constructor() {
    if (fs.existsSync(cacheDir) === false) fs.mkdirSync(cacheDir)

    setInterval(() => {
      this._localStorage.forEach(({ created }, key) => {
        if (Date.now() - created > expiresCache) this._localStorage.delete(key)
      })
    }, expiresCache)
  }

  getItem(url: string) {
    const key = encodeURIComponent(url)

    console.log("[cache]: get " + key + " by " + url)
    try {
      if (this._localStorage.has(key)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._localStorage.get(key)!.data
      }

      const dataFs = JSON.parse(fs.readFileSync(join(cacheDir, key), "utf8"))
      this._localStorage.set(key, {
        data: dataFs,
        created: Date.now()
      })

      return dataFs
    } catch {
      return null
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem(url: string, value: any) {
    const key = encodeURIComponent(url)

    console.log("[cache]: set " + key + " by " + url)
    try {
      const data = JSON.stringify(value)

      fs.writeFileSync(join(cacheDir, key), data, "utf8")

      this._localStorage.set(key, {
        data,
        created: Date.now()
      })
    } catch (err) {
      console.log(err)
    }
  }

  removeItem(key: string) {
    try {
      fs.unlinkSync(join(cacheDir, key))
      this._localStorage.delete(key)
    } catch {}
  }

  clear(): void {
    rmSync(cacheDir, {
      recursive: true
    })
    this._localStorage.clear()
  }

  get length(): number {
    return this._length
  }
}

const { adapter } = setupCache({
  maxAge: expiresCache,
  store: new Store()
})

const http = axios.create({
  baseURL,
  withCredentials: true,
  // maxRedirects: 0,
  adapter,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; Storebot-Google/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"
  },
  transformRequest: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data, headers: any) => {
      if (
        "Content-Type" in headers &&
        headers["Content-Type"] !== "application/x-www-form-urlencoded"
      ) {
        // bypass;
        return data
      }

      return new url.URLSearchParams(data).toString()
    }
  ]
})

axiosRetry(http, {
  retries: 3
})

export default boot(() => {
  return (req, res, next) => {
    console.log("inject http")

    if (req.user) {
      // eslint-disable-next-line functional/immutable-data
      http.defaults.headers.common.Cookie = `token=${req.user.token}`
    }
    // eslint-disable-next-line functional/immutable-data
    req.http = http
    next()
  }
})
