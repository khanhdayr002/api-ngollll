module.exports.config = {
    name: '/topmoney',
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
    docs: 'API "{url}"'
};
const {
    readFileSync,
    writeFileSync
} = require('fs-extra');
const dest = `${__dirname}/cache/data_user.json`;
const locaStr = n=>(+n).toLocaleString();
const sortCompare = k => (a, b) => (a[k] > b[k] ? 1: a[k] < b[k] ? -1: 0)*-1;
module.exports.run = function( {
    req, res, address, utils, config
}) {
    const {
        id
    } = req.body;
    const data = JSON.parse(readFileSync(dest, 'utf-8'));
    data.sort(sortCompare('money'));
    const index_Id = data.findIndex(i => i.fb_id == id);
    const lengthTop = data.length < 10 ? data.length: 10;
    var txt = `[==[ TOP ${lengthTop} ĐẠI GIA ]==]\n\n`;
    for (var i = 0; i < lengthTop; i++) txt += `${i+1}. ${data[i].name_stk} (${locaStr(data[i].money)}$).\n`;
    txt += `\n-> ${index_Id == -1 ? `Bạn chưa có tài khoản!`: `Bạn đứng top ${index_Id+1} BXH`}`;
    res.json({
        status: 200,
        message: txt
    });
};