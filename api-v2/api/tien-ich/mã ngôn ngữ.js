module.exports.config = {
    name: '/code-language.json',
    credits: 'DC-Nam',
    description: '!!!!',
    client: {
        limit_request: [5,
            10]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}'
};
const {
    get
} = require('axios'),
{
    load
} = require('cheerio'),
data = [];
module.exports.load = async function({config}) {
    const resR = await get(`https://webvn.com/ma-ngon-ngu-theo-chuan-iso/`),
    $ = load(resR.data);
    $(`.column-1`).each(($idx, $el)=> data[$idx] = {language: $($el).text()});
    $(`.column-2`).each(($idx, $el)=> data[$idx].code = $($el).text());
    global.data.set(config.name, data);
};
module.exports.run = async function({
    req, res, next, utils, config, address
}) {
    try {
        res.json({
            code: 200, msg: 'ok', data
        });
    }catch(err) {
        console.error(err);
        res.json(err);
    };
};