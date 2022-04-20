const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const config = require('./config')

const earthquake = function () {
  request({
    url: config.team, // 中央氣象局網頁
    method: "GET"
  }, function (error, response, body) {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body); // 載入 body
    const result = []; // 建立一個儲存結果的容器
    const teamDetail = $(".team-detail"); // 爬最外層的 Table(class=BoxTable) 中的 tr

    const averageList = []
    const averageItem = teamDetail.find(".average-item");
    for (let i = 0; i < averageItem.length; i++) {
      averageList.push(averageItem.eq(i).find('.point').text())
    }

    const teamTable = []
    const teamTableTr = teamDetail.find("#team-table tr");
    for (let i = 0; i < teamTableTr.length -1; i++) {
      if ( i < 2 ) continue

      let time = new Date(teamTableTr.eq(i).find('td').eq(0).html().replace('<br>',' '))
      let timestamp = time.getTime()
      let competitor = teamTableTr.eq(i).find('td').eq(1).find('a').eq(1).text()
      let score = teamTableTr.eq(i).find('td').eq(2).find('a').text().split(':')
      let myScore = parseInt(score[0])
      let youScore = parseInt(score[1])
      let goal2 = teamTableTr.eq(i).find('td').eq(4).text().trim()
      let shot2 = teamTableTr.eq(i).find('td').eq(5).text().trim()
      let goal3 = teamTableTr.eq(i).find('td').eq(7).text().trim()
      let shot3 = teamTableTr.eq(i).find('td').eq(8).text().trim()
      let goalFree = teamTableTr.eq(i).find('td').eq(10).text().trim()
      let shotFree = teamTableTr.eq(i).find('td').eq(11).text().trim()
      let offensiveRebound = parseInt(teamTableTr.eq(i).find('td').eq(13).text().trim())
      let defensiveRebound = parseInt(teamTableTr.eq(i).find('td').eq(14).text().trim())
      let rebound = offensiveRebound + defensiveRebound
      let assist = teamTableTr.eq(i).find('td').eq(16).text().trim()
      let steal = teamTableTr.eq(i).find('td').eq(17).text().trim()
      let blockShot = teamTableTr.eq(i).find('td').eq(18).text().trim()
      let foul = teamTableTr.eq(i).find('td').eq(19).text().trim()
      let turnover = teamTableTr.eq(i).find('td').eq(20).text().trim()

      teamTable.push({
        timestamp, competitor, score, myScore, youScore, goal2, shot2, goal3, shot3, goalFree, shotFree, offensiveRebound, defensiveRebound, 
        rebound, assist, steal, blockShot, foul, turnover
      })
    }

    console.log('L25', result)
    console.log('L26', teamTable)

    // const PPG = teamDetail.find('.point')
    // const name = teamDetail.find('')
    // const name = teamDetail.find('')
    // const name = teamDetail.find('')
    // const name = teamDetail.find('')
    // const name = teamDetail.find('')
    // const name = teamDetail.find('')
    // const name = teamDetail.find('')

    // for (let i = 1; i < table_tr.length; i++) { // 走訪 tr
    //   const table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)
    //   const time = table_td.eq(1).text(); // time (台灣時間)
    //   const latitude = table_td.eq(2).text(); // latitude (緯度)
    //   const longitude = table_td.eq(3).text(); // longitude (經度)
    //   const amgnitude = table_td.eq(4).text(); // magnitude (規模)
    //   const depth = table_td.eq(5).text(); // depth (深度)
    //   const location = table_td.eq(6).text(); // location (位置)
    //   const url = table_td.eq(7).text(); // url (網址)
    //   // 建立物件並(push)存入結果
    //   result.push(Object.assign({ time, latitude, longitude, amgnitude, depth, location, url }));
    // }
    // 在終端機(console)列出結果
    // console.log(result);
    // 寫入 result.json 檔案
    // fs.writeFileSync("result.json", JSON.stringify(result));
  });
};

earthquake();
// 每半小時爬一次資料
// setInterval(earthquake, 30 * 60 * 1000);