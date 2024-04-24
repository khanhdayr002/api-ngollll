const config = {
    name: '/downloader',
    credits: 'DC-Nam',
    description: 'www.facebook.com/levy.nam.2k5',
    client: {
        limit_request: [30,
            10]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: 'API "{url}"'
},
axios = require('axios'),
cheerio = require('cheerio');
async function run( {
    req, res, address, utils, config
}) {
    try {
        const {
            url
        } = req.query;

        if (!url)return res.status(400).send('thiếu link; nhập ?url=link vd');

        const o = (await axios.post(`https://api.onlinevideoconverter.pro/api/convert`, {
            url
        })).data,
        video = o.url.find(el => el.quality <= 360 && !el.no_audio),
        video2 = o.url.find(el => el.quality <= 360 && el.no_audio),
        audio = o.url.find(el => el.quality < 100 && el.audio);

        res.status(200).json({
            code: 200, msg: 'ok', data: {
                title: o.meta.title,
                tags: o.meta.tags,
                duration: o.meta.duration,
                thumbnails: o.thumb,
                video: {
                    url: video.url, size: video.filesize || video2.filesize
                },
                music: {
                    url: audio.url, size: audio.filesize
                }
            }
        });
    }catch(e) {
        res.status(500).json(e)
    };
};
module.exports = {
    config,
    run
};