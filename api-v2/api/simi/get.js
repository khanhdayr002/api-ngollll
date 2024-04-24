module.exports.config = {
    name: '/get',
    credits: 'DC-Nam',
    description: 'Simi chat',
    client: {
        limit_request: [30,
            60]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}\nBody: ask (hỏi) -> trả về câu trả lời!'
};
const {
    readFileSync
} = require('fs-extra');
const dest = `${__dirname}/cache/simi_chat.json`;
module.exports.run = function( {
    req, res, next, utils, config, address
}) {
    const data = JSON.parse(readFileSync(dest));
    const allAsk = data.map(i => i.ask);
    
    const{ask}=req.query;
  if(!ask)return res.send('error');
    const findAsk = find_similarly(ask, allAsk);
    if (!findAsk) return res.send({status: false,msg: 'Simi không hiểu gì hết á, dạy simi đi😢'});
    const findDataAsk = data.find(i => i.ask == findAsk);
    const answer = findDataAsk.answer[Math.floor(Math.random()*findDataAsk.answer.length)];
     res.send({status:true,msg:answer});

    function find_similarly(a, b) {
        const reduce_compare = k => (a, b) => a[k] > b[k] ? a: b;
        const arrSimi = [];;
        for (const i of b) {
            const similarity = utils.strSimilarity(a, i);
            arrSimi.push({
                similarity,
                i
            });
        };
        const max = arrSimi.reverse().reduce(reduce_compare('similarity'));
        return max.similarity >= a.length/2 ? max.i: false;
    };
};