const axios = require("axios");
const rq = require('request')
var data = ""
const igInfo = async function(username) {
  return new Promise(async (resolve, reject) => {
    if (!username) return reject({
      message: "Invaild Username"
    });
   let buff = new Buffer(data, 'base64');
let cookie = buff.toString('ascii');
   // var cookie = (await axios.get('https://pastebin.com/raw/Ypfg7H1b')).data
  const config = {
            method: 'get',
            url: `https://www.instagram.com/${username}/?__a=1&__d=dis`,
            headers: {
          cookie: cookie
        }
        };
    
   await axios(config).then(data => {
      var json = data.data.graphql.user
     // console.log(json)
      var resul = {
        data: {
          username: json.username,
          fullname: json.full_name,
          private: json.is_private ? "Yes" : "No",
          id: json.id,
          followers: json.edge_followed_by.count,
          following: json.edge_follow.count,
          post_cout: json.edge_owner_to_timeline_media.count,
          website: json.external_url ? json.external_url : "No",
          bio: json.biography,
          picture: json.profile_pic_url_hd
        },
        author: "Phùng Tuấn Hải"
      }

      resolve(resul)
    }).catch(err => {
      reject(err)
    })
  })
}
const videodl = async function(url) {
  return new Promise(async (resolve, reject) => {
  
    if (!url) return reject({
      statut: false,
      error: "Vui lòng nhập link video!"
    })
	let buff = new Buffer(data, 'base64');
let cookie = buff.toString('ascii');
    let str = await searchID(url);
    console.log(str)
    axios({
      method: "get",
      url: `https://www.instagram.com/p/` + str + "/?__a=1&__d=dis",
      headers: {
        cookie: cookie
      }
    }).then(body => {
    //  resolve(body.data)
	  var json = body.data.items[0]
      var resul = {
        statut: true,
        author: "Phùng Tuấn Hải",
        user_id: json.caption.user_id,
        title: json.caption.text,
        name: json.user.full_name,
        video_duration: json.video_duration + 's',
         like: json.like_count,
         comment: json.comment_count,
         view_count: json.view_count,
         play_count: json.play_count,
        user: json.caption.user,
        video_versions: json.video_versions,
        thumbnail: json.image_versions2.candidates[0],
        caption: json.caption,
        is_verified: json.user.is_verified,
        is_private: json.user.is_private,
        has_anonymous_profile_picture: json.user.has_anonymous_profile_picture,
        account_badges: json.user.account_badges,
        fan_club_info: json.user.fan_club_info
      }
      
	  resolve(resul)
    }).catch(err => {
    reject(err)
  })
})
}
const audiodl = async function(url) {
  return new Promise(async (resolve, reject) => {
  
    if (!url) return reject({
      statut: false,
      error: "Vui lòng nhập link video!"
    })
	let buff = new Buffer(data, 'base64');
let cookie = buff.toString('ascii');
    let str = await searchID(url);
    console.log(str)
    axios({
      method: "get",
      url: `https://www.instagram.com/p/` + str + "/?__a=1&__d=dis",
      headers: {
        cookie: cookie
      }
    }).then(body => {
    // resolve(body.data)
	  var json = body.data.items[0]
      var resul = {
        statut: true,
        author: "Phùng Tuấn Hải",
        user_id: json.caption.user_id,
        title: json.caption.text,
        name: json.user.full_name,
        ig_artist: json.clips_metadata.music_info.music_consumption_info.ig_artist,
        audio: {
          id: json.clips_metadata.music_info.music_asset_info.audio_cluster_id,
         audio_duration: json.clips_metadata.music_info.music_asset_info.duration_in_ms + 'ms',
         url: json.clips_metadata.music_info.music_asset_info.progressive_download_url
        },
        thumbnail: json.image_versions2.candidates[0],
        caption: json.caption,
        is_verified: json.user.is_verified,
        is_private: json.user.is_private,
      }
      
	  resolve(resul)
    }).catch(err => {
    reject(err)
  })
})
}
const search = async function(username) {
  return new Promise(async (resolve, reject) => {
    if (!username) return reject({
      message: "Invaild Username"
    });
    let buff = new Buffer(data, 'base64');
let cookie = buff.toString('ascii');
   // var cookie = (await axios.get('https://pastebin.com/raw/Ypfg7H1b')).data
  const config = {
            method: 'get',
            url: `https://www.instagram.com/web/search/topsearch/?query=${username}`,
            headers: {
          cookie: cookie
        }
    };
    
   await axios(config).then(data => {
      var json = data.data
     
      resolve(json)
    }).catch(err => {
      reject(err)
    })
  })
}
const searchID = function (url) {
  const regex = /(?:https?:\/\/)?(?:www.)?instagram.com\/?([a-zA-Z0-9\.\_\-]+)?\/([p]+)?([reel]+)?([tv]+)?([stories]+)?\/([a-zA-Z0-9\-\_\.]+)\/?([0-9]+)?/gm;
  return regex.exec(url)[6]
}

module.exports = {
  igInfo,
  search,
  videodl,
  audiodl,
  searchID
}

 // authority: "www.instagram.com",
 //        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
 //        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
 //        'accept-language': 'vi,en;q=0.9',
 //        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
 //        'sec-ch-ua-mobile': '?1',
 //        'sec-ch-ua-platform': "Android",
 //        'sec-fetch-dest': 'document',
 //        'sec-fetch-mode': 'navigate',
 //        'sec-fetch-site': 'same-origin',
 //        'sec-fetch-user': '?1',
 //        'upgrade-insecure-requests': '1',