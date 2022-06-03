import { boot } from "epact"
import { verify } from "jsonwebtoken"

export default boot(() => {
  return function (req, res, next) {
    try {
      // eslint-disable-next-line functional/no-throw-statement
      if (!req.headers.authorization) throw new Error()
      // eslint-disable-next-line functional/immutable-data
      req.user = verify(
        req.headers.authorization.replace(/^Bearer /, ""),
        process.env.SECRET_JWT
        // eslint-disable-next-line no-undef
      ) as Express.Request["user"]
    } catch {
      // eslint-disable-next-line functional/immutable-data
      req.user = null
    }

    next()
  }
})
