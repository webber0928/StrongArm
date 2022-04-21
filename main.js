const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
const config = require('./config')

const work = function () {
  request({
    url: config.team,
    method: "GET"
  }, function (error, response, body) {
    if (error || !body) {
      return
    }
    const $ = cheerio.load(body) // 載入 body
    const teamDetail = $(".team-detail")

    const myTeam = {}
    const averageItem = teamDetail.find(".average-item")
    const teamInfo = teamDetail.find(".team-title-info")
    myTeam['teamSince'] = teamInfo.find('.team-since-info').text()
    myTeam['teamName'] = teamInfo.find('.team-name').text()
    myTeam['ppg'] = averageItem.eq(0).find('.point').text()
    myTeam['rpg'] = averageItem.eq(1).find('.point').text()
    myTeam['apg'] = averageItem.eq(2).find('.point').text()
    myTeam['oppg'] = averageItem.eq(2).find('.point').text()

    const teamList = []
    const teamTableTr = teamDetail.find("#team-table tr")
    for (let i = 0; i < teamTableTr.length - 1; i++) {
      if (i < 2) continue

      let time = new Date(teamTableTr.eq(i).find('td').eq(0).html().replace('<br>', ' '))
      let timestamp = time.getTime() // 比賽時間
      let competitor = teamTableTr.eq(i).find('td').eq(1).find('a').eq(1).text() // 對手名稱
      let score = teamTableTr.eq(i).find('td').eq(2).find('a').text().split(':')
      let myScore = parseInt(score[0]) // 我方分數
      let youScore = parseInt(score[1]) // 敵方分數
      let goal2 = parseInt(teamTableTr.eq(i).find('td').eq(4).text().trim()) // 2分球進球
      let shot2 = parseInt(teamTableTr.eq(i).find('td').eq(5).text().trim()) // 2分球投球
      let goal3 = parseInt(teamTableTr.eq(i).find('td').eq(7).text().trim()) // 3分球進球
      let shot3 = parseInt(teamTableTr.eq(i).find('td').eq(8).text().trim()) // 3分球投球
      let goalFree = parseInt(teamTableTr.eq(i).find('td').eq(10).text().trim()) // 罰球進球
      let shotFree = parseInt(teamTableTr.eq(i).find('td').eq(11).text().trim()) // 罰球投球
      let offensiveRebound = parseInt(teamTableTr.eq(i).find('td').eq(13).text().trim()) // 進攻籃板
      let defensiveRebound = parseInt(teamTableTr.eq(i).find('td').eq(14).text().trim()) // 防守籃板
      let rebound = offensiveRebound + defensiveRebound // 籃板
      let assist = parseInt(teamTableTr.eq(i).find('td').eq(16).text().trim()) // 助攻
      let steal = parseInt(teamTableTr.eq(i).find('td').eq(17).text().trim()) // 抄截
      let blockShot = parseInt(teamTableTr.eq(i).find('td').eq(18).text().trim()) // 阻攻
      let foul = parseInt(teamTableTr.eq(i).find('td').eq(19).text().trim()) // 犯規
      let turnover = parseInt(teamTableTr.eq(i).find('td').eq(20).text().trim()) // 失誤

      teamList.push({
        timestamp, competitor, myScore, youScore, goal2, shot2, goal3, shot3, goalFree, shotFree, offensiveRebound, defensiveRebound,
        rebound, assist, steal, blockShot, foul, turnover
      })
    }

    // 寫入 result.json 檔案
    fs.writeFileSync("gameResult.json", JSON.stringify({ myTeam, teamList }, null, 2))
  })
}

work()
// 每半小時爬一次資料
// setInterval(earthquake, 30 * 60 * 1000)