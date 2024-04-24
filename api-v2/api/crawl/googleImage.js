module.exports.config = {
    name: '/ggimg',
    credits: 'DC-Nam',
    description: 'Tìm hình ảnh bằng từ khóa!',
    client: {
        limit_request: [10,
            60]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}'
};
const {
    load
} = require('cheerio');
const {
    get
} = require('axios');
module.exports.run = async function ({
    req, res, next, utils, config, address
}) {
    var {
        s,
        f = 1,
        v
    } = req.query,
    arr = [],
    test = [],
    i = 1;
    if(v != '1.1.2') return res.json({
        status: -1, message: `new version: https://raw.githubusercontent.com/duongcongnam02/Module-Miraiv2/main/gganh.js`
    });
    for (;i<(f<5?2:10);i++) {
        const response = await get(`https://www.bing.com/images/search?q=anime&first=${(12*i)-11}&count=12&FORM=IBASEP` )
        const $ = load(response.data); // load HTML
        $('.imgpt .iusc').each((index, el) => {
            const obj = JSON.parse($(el).attr('m'));
            test.push(obj);
            if (!arr.includes(obj.murl) /*&& (obj.murl.endsWith('jpg') || obj.murl.endsWith('png'))*/) arr.push(obj.murl);
        });
    };
    if (arr == 0) res.json({
        status: 403,
        message: `Từ khóa "${s}" không lành mạnh vui lòng nhập từ khóa khác`
    }); else res.json({
        status: 200,
        message: test[Math.floor(Math.random()*test.length)].t,
        data: {
            count: arr.length,
            url_image: arr
        }
    });
};