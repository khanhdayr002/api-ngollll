module.exports.config = {
    name: '/register',
    credits: 'DC-Nam',
    description: 'Banking',
    client: {
        limit_request: [30,
            60]
    },
    contacts: {
        facebook: 'www.facebook.com/Danggiakhanh18t.vanhungcl5'
    },
    method: 'post',
    docs: 'API "{url}"\nBody: fb_id, stk, name_stk'
};
const {
    readFileSync,
    writeFileSync,
    existsSync
} = require('fs-extra');
const dest = `${__dirname}/cache/data_user.json`;
const milisInterest = ((60*1000)*60);
module.exports.load = function() {
    if (!existsSync(dest)) writeFileSync(dest, '[]');
    setInterval(() => {
        const data = JSON.parse(readFileSync(dest, 'utf-8'));
        const timeNow = Date.now()+25200000;
        const filterP = data.filter(i => i.interest.period <= timeNow);
        if (filterP.length != 0) data.map(i => {
            if (filterP.some(j => j.fb_id == i.fb_id)) {
                i.money += (i.money*i.interest.rate)/100,
                i.interest.period = i.interest.period+milisInterest;
                writeFileSync(dest, JSON.stringify(data, 0, 4), 'utf-8');
            };
        });
    }, 1000);
};
module.exports.run = function( {
    req, res, address, utils, config
}) {
    const {
        fb_id,
        stk,
        name_stk
    } = req.body;
    const timeNow = Date.now()+25200000;
    const data = JSON.parse(readFileSync(dest, 'utf-8'));
    if (data.some(i => i.fb_id == fb_id)) return res.json({
        status: 200, message: `Bạn đã có tài khoản trong hệ thống!`
    });
    if (!fb_id || !stk || !name_stk) return res.json({
        status: 200, message: `Vui lòng nhập đúng định dạng: register + [STK] + [Tên]`
    });
    if (data.some(i => i.stk == stk)) return res.json({
        status: 200,
        message: `STK này đã có người sử dụng!`
    });
    if (isNaN(stk) || stk.length != 8) return res.json({
        status: 200,
        message: `${isNaN(stk) ? `STK phải là con số!`: stk.length != 8 ? `Độ dài STK không được khác 8`: `Lỗi không xác định, LH admin: ${config.contacts.facebook}`}`
    });
    const newUser = {
        id: ''+data.length,
        fb_id,
        stk,
        name_stk,
        money: 0,
        interest: {
            rate: 0.05,
            period: timeNow+milisInterest
        },
        timestamp: timeNow
    };
    data.push(newUser)
    writeFileSync(dest, JSON.stringify(data, 0, 4), 'utf-8')
    res.json({
        status: 200,
        message: `Đăng ký tài khoản banking thành công, gửi ít nhất 1$ để có lãi`,
        data: newUser
    })
};