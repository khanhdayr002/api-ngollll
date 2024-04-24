const axios = require("axios")
var headers = {
  Accept: "*/*",
  Connection: "Keep-Alive",
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  cookie: "sb=AyAsYrmU8zTmEso9AH7qK-Ez; c_user=100086063221253; datr=IOhdY6YmPDVDUUXmjjsBOG1N; presence=C%7B%22lm3%22%3A%22g.5603212373119942%22%2C%22t3%22%3A%5B%7B%22i%22%3A%22g.5610985895649769%22%7D%2C%7B%22i%22%3A%22g.8304165522956762%22%7D%2C%7B%22i%22%3A%22g.4853893041400316%22%7D%2C%7B%22i%22%3A%22g.5485296998174114%22%7D%2C%7B%22i%22%3A%22g.5276644389066301%22%7D%2C%7B%22i%22%3A%22g.5662772543774327%22%7D%2C%7B%22i%22%3A%22g.5749987811718063%22%7D%2C%7B%22i%22%3A%22g.5781807905196455%22%7D%2C%7B%22i%22%3A%22g.5720511897959125%22%7D%2C%7B%22i%22%3A%22g.5691247034275029%22%7D%2C%7B%22i%22%3A%22g.5626638014040850%22%7D%2C%7B%22i%22%3A%22g.5395952733798939%22%7D%2C%7B%22i%22%3A%22g.5401143363277628%22%7D%2C%7B%22i%22%3A%22g.5647264628622398%22%7D%2C%7B%22i%22%3A%22g.6680728675285668%22%7D%2C%7B%22i%22%3A%22g.5542934792461624%22%7D%2C%7B%22i%22%3A%22g.8179442292129793%22%7D%2C%7B%22i%22%3A%22g.5505349076239714%22%7D%2C%7B%22i%22%3A%22g.4995261347237178%22%7D%2C%7B%22i%22%3A%22g.5866453186731947%22%7D%2C%7B%22i%22%3A%22g.4710272262407315%22%7D%2C%7B%22i%22%3A%22u.100000272507589%22%7D%2C%7B%22i%22%3A%22g.4405076099617693%22%7D%5D%2C%22utc3%22%3A1667907958795%2C%22v%22%3A1%7D; wd=925x636; xs=1%3AdZIChQ_XLJKqtw%3A2%3A1667098654%3A-1%3A8520%3A%3AAcVKqhmoYR63xJEPXZiYgRKapZkh2iclO1orIx9Rw70; fr=0GUe6zjogVdgqDh7j.AWX00rRDX1p6bfAHr4HTCkaQzTA.BjbJIe.vv.AAA.0.0.BjbJIe.AWVAlx-jC-c"
};
const token = "EAAD6V7os0gcBAGHZBIuFEZBuASfLuw2GaJZBhgn5Id5bByX7XGV2ZBRPoZCfdhN0vnZBPA6AEFB7TRigc2Ov4Eoy6eBOzqka1aBZAVrpE2uoRzyqir0ypGhEhsHzZB0s5E9OBaVrZCajt44FVry9jt1PjzZA2lhUHX9aYT3YgZA2K14aliFy8jkE20k";
module.exports = {
  name: "getinfo",
  run: async (req, res) => {
    var {
      uid: uid
    } = req.query;
    if (!uid) return res.json({
      error: "Vui long nhap uid can xem info"
    });
    axios({
        method: "get",
        url: `https://graph.facebook.com/${uid}?fields=name,first_name,email,about,birthday,gender,website,hometown,link,location,quotes,relationship_status,significant_other,username,subscribers.limite(0)&access_token=${token}`,
        //headers: headers
      }).then((async body => {
        var name = body.data.name || null,
          first_name = body.data.first_name || null,
          username = body.data.username || null,
          uid = body.data.id || null,
          about = body.data.about || null,
          follow = body.data.subscribers.summary.total_count || "private",
          birthday = body.data.birthday || "private",
          gender = body.data.gender,
          hometown = body.data.hometown,
          link = body.data.link || null,
          location = body.data.location,
          relationship = body.data.relationship_status || null,
          love = body.data.significant_other,
          quotes = body.data.quotes || null,
          website = body.data.website || null,
          avatar = `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        location = null == location ? null : location.name, hometown = null == hometown ? null : hometown.name, love = null == love ? null : love.name, gender = "male" == gender ? "Nam" : "female" == gender ? "Nữ" : "private";
        res.json({
          uid: uid,
          name: name,
          first_name: first_name,
          username: username,
          about: about,
          follow: follow,
          birthday: birthday,
          gender: gender,
          hometown: hometown,
          link: link,
          location: location,
          relationship: relationship,
          love: love,
          quotes: quotes,
          website: website,
          avatar: avatar
        })
      }))
    }
}