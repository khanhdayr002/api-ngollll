module.exports.config = {
    name: '/find-hero',
    credits: 'DC-Nam',
    description: '!',
    client: {
        limit_request: [20, 60]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}'
};
const {load} = require('cheerio'),
{get} = require('axios'),
lq = 'https://lienquan.garena.vn',
data = [];
module.exports.run = async function ({
    req, res, next, utils, config, address
}){
    const {
        s=1,c
    } = req.query;
    const fsia = await find_hero(s, utils);
    if(c == 'listhero') return res.status(200).json({message: data.map((d,i) => `${i+1}. ${d.name}\n • ID: ${d.id}`).join('\n\n')});
    if(!fsia) return res.status(404).json({
        status: 404,
        message: `Không tìm thấy tướng có ${isFinite(s)?'ID':'name'} là "${s}"`
    }); else res.status(201).json({
        status: 201,
        message: ``,
        data: fsia
    });
    res.end();
};
module.exports.findHero = find_hero;
async function find_hero(s, utils){
     if(data ==0){
    const response = await get(`${lq}/tuong`);
    const $ = load(response.data);
    $(`.list-champion .heroes`).each((index, el) => {
       data.push({
           id: $(el).find('div p').attr('data-id'),
           name: $(el).find('div p').attr('data-name'),
           image: `${lq}/${$(el).find('div a img').attr('src')}`
       });
    });
    };
    return isFinite(s) && (s > data.length+2||s<1)?false:utils.findSimilarlyInArray(s, data, utils, {status: true, keys: isFinite(s)?'id':'name'});
};