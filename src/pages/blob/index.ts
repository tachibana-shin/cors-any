import { page } from "epact"

export default page({
  get(req, res) {
    res.sendFile(`${__dirname}/index.html`)
  }
})
