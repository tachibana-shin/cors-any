import { defineConfig } from "epact"

export default defineConfig({
  baseUrl: "/api",
  boot: ["dotenv", "plugins"],
  build: {
    footer: "module.exports = module.exports.default",
    pkgFile: true
  }
})
