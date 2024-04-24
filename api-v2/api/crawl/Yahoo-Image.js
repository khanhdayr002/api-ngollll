module.exports.config = {
    name: '/yahoo-image',
    credits: 'DC-Nam',
    description: 'Tìm hình ảnh bằng từ khóa!',
    client: {
        limit_request: [10, 60]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}'
};
const {load} = require('cheerio');
const {get} = require('axios');
const ddg = 'https://external-content.duckduckgo.com/iu/?u=';
module.exports.run = async function ({
    req, res, next, utils, config, address
}){
    try{
    var {s,f} = req.query, arr = [], title = [], i = 0;
  for (;++i<6;) await get(`https://images.search.yahoo.com/search/images?p=${encodeURI(s)}&ri=${(50*i)-50}`, {headers: {cookie: require('./cache/cookie/yahoo.json')[0], 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36' }}).then(response => {
    const $ = load(response.data); // load HTML
    $('.ld').each((index, el) => { 
    const obj = JSON.parse($(el).attr('data'));
       if (!arr.includes(ddg+obj.iurl)/* && (['jpg', 'png', 'jpge', 'JPG'].some(i => obj.iurl.endsWith(i)))*/) arr.push(ddg+obj.iurl), title.push(obj.alt)
      });
   });
    if (arr.length == 0) res.json({
        status: 403,
        message: `Từ khóa "${s}" không lành mạnh vui lòng nhập từ khóa khác`
    }); else res.json({
          status: 200,
          message: title[Math.floor(Math.random()*title.length)],
          data: {
              count: arr.length,
              url_image: arr
          }
      });
    }catch(err){
        res.json(err);
    };
};