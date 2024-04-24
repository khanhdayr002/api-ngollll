const config = {
    name: '/ma-tinh-tp',
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
cheerio = require('cheerio'),
web = 'https://luatvietnam.vn/tin-phap-luat/y-nghia-12-chu-so-tren-the-can-cuoc-cong-dan-230-17670-article.html',
data = [];
async function run( {
    req, res, address, utils, config
}) {
    try {
        var {
            s
        } = req.query,
        resp;
        if (data == 0) {
            const response = await axios.get(web),
            $ = cheerio.load(response.data);
            $('tr').each((index, el) => data.push([$(el).find('td:eq(1) p').text(), $(el).find('td:eq(2) p').text()]));
            data.shift();
        };
        if (!!s) resp = utils.findSimilarlyInArray(s, data, utils, {
            status: true, keys: 0
        }); else resp = data;
        res.json({
            code: 200, msg: 'ok', data: resp
        })
    } catch (e) {
        res.json(e)}
};
module.exports = {
    config,
    run
}