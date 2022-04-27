const fs = require("fs")
const config = require('./config')

const libs = require('./libs')

const work = async function () {

    const $ = await libs.html.query(config.team)
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
      let url = teamTableTr.eq(i).find('td').eq(2).find('a').attr('href')
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
        url,
        timestamp, competitor, myScore, youScore, goal2, shot2, goal3, shot3, goalFree, shotFree, offensiveRebound, defensiveRebound,
        rebound, assist, steal, blockShot, foul, turnover
      })
    }

    const playerList = []
    const playerTableTr = teamDetail.find("#players-table tr")
    for (let i = 0; i < playerTableTr.length - 1; i++) {
      if (i < 2) continue

      let nameAndId = playerTableTr.eq(i).find('td').eq(0).find('a').text().split(' #') // 球員姓名
      let name = nameAndId[0] // 球員姓名
      let id = parseFloat(nameAndId[1]) // 球員背號
      let averageScore = parseFloat(playerTableTr.eq(i).find('td').eq(1).text()) // 平均得分
      let goal2 = parseFloat(playerTableTr.eq(i).find('td').eq(2).text().trim()) // 2分球進球
      let shot2 = parseFloat(playerTableTr.eq(i).find('td').eq(3).text().trim()) // 2分球投球
      let goal3 = parseFloat(playerTableTr.eq(i).find('td').eq(5).text().trim()) // 3分球進球
      let shot3 = parseFloat(playerTableTr.eq(i).find('td').eq(6).text().trim()) // 3分球投球
      let goalFree = parseFloat(playerTableTr.eq(i).find('td').eq(8).text().trim()) // 罰球進球
      let shotFree = parseFloat(playerTableTr.eq(i).find('td').eq(9).text().trim()) // 罰球投球
      let offensiveRebound = parseFloat(playerTableTr.eq(i).find('td').eq(11).text().trim()) // 進攻籃板
      let defensiveRebound = parseFloat(playerTableTr.eq(i).find('td').eq(12).text().trim()) // 防守籃板
      let rebound = offensiveRebound + defensiveRebound // 籃板
      let assist = parseFloat(playerTableTr.eq(i).find('td').eq(14).text().trim()) // 助攻
      let steal = parseFloat(playerTableTr.eq(i).find('td').eq(15).text().trim()) // 抄截
      let blockShot = parseFloat(playerTableTr.eq(i).find('td').eq(16).text().trim()) // 阻攻
      let foul = parseFloat(playerTableTr.eq(i).find('td').eq(17).text().trim()) // 犯規
      let turnover = parseFloat(playerTableTr.eq(i).find('td').eq(18).text().trim()) // 失誤
      let count = parseFloat(playerTableTr.eq(i).find('td').eq(19).text().trim()) // 出場次數

      playerList.push({
        name, id, averageScore, goal2, shot2, goal3, shot3, goalFree, shotFree, offensiveRebound, defensiveRebound,
        rebound, assist, steal, blockShot, foul, turnover, count
      })
    }

    console.log(playerList)

    // 寫入 result.json 檔案
    fs.writeFileSync("gameResult.json", JSON.stringify({ myTeam, teamList, playerList }, null, 2))
}

work()
// 每半小時爬一次資料
// setInterval(earthquake, 30 * 60 * 1000)