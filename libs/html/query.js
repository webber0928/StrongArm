
const request = require("request")
const cheerio = require("cheerio")

module.exports = async (url) => {
  try {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: "GET"
      }, function (error, response, body) {
        if (error || !body) {
          reject(error)
        }
        const $ = cheerio.load(body) // 載入 body
        resolve($)
      })
    })
  } catch (error) {
    throw error
  }
}