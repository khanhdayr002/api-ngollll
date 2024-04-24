module.exports.config = {
    name: '/add',
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
    docs: '{url}'
};
const {
    readFileSync,
    writeFileSync
} = require('fs-extra');
const dest = `${__dirname}/cache/simi_chat.json`;

module.exports.run = function( {
    req, res, next, utils, config, address
}) {
    let
    {
        ask,
        answer
    } = req.query,
    data = JSON.parse(readFileSync(dest)),
    find = data.find(el=>el.ask == ask),
    msg = '';
    if (!ask || !answer) return res.send('error');
    if (!!find) {
        if (find.answer.includes(answer))return res.send({status: false,msg:'Câu hỏi và câu trả lời đã tồn tại.'});
        find.answer.push(answer)
        msg = 'Câu hỏi đã tồn tại, câu trả lời được thêm vào câu hỏi';
} else (data.push({
        ID: data.length+1,
        timestamp: Date.now(),
        ask: ask,
        answer: [answer]
    }), msg = 'đã thêm câu hỏi & câu trả lời mới');

writeFileSync(dest, JSON.stringify(data, 0, 4));
res.send({status:true,msg})
};