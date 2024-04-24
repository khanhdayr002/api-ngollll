module.exports.config = {
    name: '/sendmoney',
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
    docs: 'API "{url}"\nBody: id, money'
};
const {
    readFileSync,
    writeFileSync
} = require('fs-extra');
const dest = `${__dirname}/cache/data_user.json`;
const locaStr = n=>(+n).toLocaleString();
module.exports.run = function( {
    req, res, address, utils, config
}) {
    const {
        id,
        money
    } = req.body;
    if (isNaN(money) || money <= 0) return res.json({
        status: 200,
        message: `Tiền cần gửi phải là con số và lớn hơn 0!`
    });
    const data = JSON.parse(readFileSync(dest, 'utf-8'));
    const info = data.find(i => i.fb_id == id);
    if (!info) return res.json({
        status: 200,
        message: `Bạn chưa có tài khoản trong hệ thống!`
    });
    info.money += +money;
    writeFileSync(dest, JSON.stringify(data, 0, 4), 'utf-8');
    res.json({
        status: 201,
        message: `Gửi thành công ${locaStr(money)}$ vào tài khoản!`,
        data: info
    });
};