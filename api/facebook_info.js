let axios = require('axios')
let cheerio = require('cheerio')

const facebook = async function (uid,tokens) {
    return new Promise(async (resolve, reject) => {
      var headers = {
  Accept: "*/*",
  Connection: "Keep-Alive",
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
cookie: "vpd=v1%3B712x360x2;sb=O9KDZKIx9afpn24XNkhMu9tr;datr=XdaDZIesMfAyGaq3EN1qr0n9;dpr=2;wd=360x712;c_user=100000554797296;xs=4%3AbT-cAoqDXBsPiw%3A2%3A1686960877%3A-1%3A8229;fr=0Gy1uKP634XPR8BrI.AWVq1grTayFpiKesKJgrTl5zHe0.BkhFCu.my.AAA.0.0.BkjPrv.AWV3B3TOjFY;fbl_cs=AhADk7TyfMnJiWk8JMI83EwBGGpJeVhuMHlmelRWNEVPQ2ZPYkV4N01Gcg;fbl_ci=1171597913532623;locale=vi_VN;m_page_voice=100000554797296;fbl_st=100628270%3BT%3A28117001;wl_cbv=v2%3Bclient_version%3A2274%3Btimestamp%3A1687020117;"
};
         axios({
        method: "get",
        url: `https://graph.facebook.com/v1.0/${uid}?fields=name,email,languages,name_format,is_verified,cover,first_name,about,birthday,gender,website,hometown,link,location,quotes,relationship_status,significant_other,likes,education,username,age_range,subscribers.limite(0)&access_token=EAAGNO4a7r2wBANXane3PkrBUH5GtiRtiTSUgHh6WPqTd6fCTwLwrwhBjA2AsSwswTZB2Gu0fRYmnwtsYJ7zTgnJ89FWwtiEZC3RwZCvUXucuTKyX8L2FK7Ku5uKP30taCWpec3bPvaZCuCMOQLJRnjFw1UiMfkZC0lP8ujiO36zT3OP7DJnvE`,
       headers: headers
      }).then(async body => {
           var name = body.data.name || "...",
          very = body.data.is_verified,
          first_name = body.data.first_name || "...",
          username = body.data.username || "...",
          uid = body.data.id || "...",
             age = body.data.age_range , 
             email = body.data.email || "...", 
             education = body.data.education || "...", 
          about = body.data.about || "...", 
             like = body.data.likes,
             languages = body.data.languages,
          follow = body.data.subscribers.summary.total_count || "private",
            name_format = body.data.first_name + " " + body.data.name, 
          birthday = body.data.birthday || "private",
          gender = body.data.gender,
          hometown = body.data.hometown,
         //hometown_id = body.data.hometown.id || null,
          link = body.data.link || "...",
          location = body.data.location,
         //location_id = body.data.location.id,
          relationship = body.data.relationship_status || "...",
          love = body.data.significant_other,
        // id_love = body.data.significant_other.id,
          quotes = body.data.quotes || "...",
          website = body.data.website || "...",
          avatar = `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
     location_id = null == location ? '...' : location.id ,location = null == location ? '...' : location.name, hometown_id = null == hometown ? '...' : hometown.id ,hometown = null == hometown ? '...' : hometown.name, id_love = null == love ? 'private' : love.id ,love = null == love ? 'private' : love.name, gender = "male" == gender ? "Nam" : "female" == gender ? "Nữ" : "private"; 
      very = true == very ? 'đã xác minh' : 'chưa xác minh' ;
            resolve({
                status: 200,
           result: {
           uid: uid,
          name: name,
             age: age,
             email: email,
          very: very,
          first_name: first_name,
          username: username,
             name_format : name_format,
          about: about,
          follow: follow,
             like: like,
             languages: languages,
          birthday: birthday,
          gender: gender,
          education: education, 
          hometown: {
            name: hometown,
            id: hometown_id
          },
          link: link,
          location: {
            name: location,
           id: location_id
          },
          relationship: relationship,
          love: {
            name: love,
            id: id_love
          },
          quotes: quotes,
          website: website,
          avatar: avatar
        },
        author: "Phùng Tuấn Hải"
            })
        }).catch(err => {
            reject(err)
        })
    })

}

module.exports = {
  facebook
}