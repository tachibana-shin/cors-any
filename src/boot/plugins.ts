import cookieParser from "cookie-parser"
// eslint-disable-next-line n/no-unpublished-import
import cors from "cors"
import { boot } from "epact"
import { json, urlencoded } from "express"
import helmet from "helmet"
import morgan from "morgan"

export default boot(() => {
  return [
    ...(process.env.NODE_ENV === "development"
      ? [morgan("dev"), helmet()]
      : []),
    cors(),
    cookieParser(),
    urlencoded({ extended: true }),
    json()
  ]
})
