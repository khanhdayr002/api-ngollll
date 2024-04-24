module.exports.config = {
    name: '/check',
    credits: 'DC-Nam',
    description: 'Banking',
    client: {
        limit_request: [30,
            60]
    },
    contacts: {
        facebook: 'www.facebook.com/Danggiakhanh18t.vanhungcl'
    },
    method: 'post',
    docs: 'API "{url}"\nBody: id'
};
const {
    readFileSync
} = require('fs-extra');
const locaStr = n=>(+n).toLocaleString();
module.exports.run = function( {
    req, res, address, utils, config
}) {
    const {
        id
    } = req.body;
    const data = JSON.parse(readFileSync(__dirname + '/cache/data_user.json', 'utf-8'));
    const info = data.find(i => i.fb_id == id || i.stk == id || i.id == id);
    if (!info) return res.json({
        status: 200,
        message: `STK "${id}" không bật công khai hoặc không tồn tại trong hệ thống!`
    });
    res.json({
        status: 200,
        message: `[===[ BANKING ]===]

🔎 ID: ${info.id}.     
⭕ STK: ${info.stk}.
👤 Chủ STK: ${info.name_stk}.
💰 Tiền: ${locaStr(info.money)}$.
______
✡ Lãi Suất: ${info.interest.rate}%(uớc tính + ${locaStr((info.money*info.interest.rate)/100)}$).
⏳ Thời Gian Cộng: ${new Date(info.interest.period).toLocaleString()}.
 -> Còn ${utils.baoLauNua(info.interest.period-(Date.now()+25200000), 'HH:MM:SS, dd/mm/yyyy')}.`,
        data: info
    });
};