module.exports.config = {
    name: '/paymoney',
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
    docs: 'API "{url}"\nQuery: id'
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
        id_p,
        money_p
    } = req.body;
    if (!id || !id_p || !money_p || isNaN(money_p) || money_p <= 0 || id == id_p) return res.json({
        status: 200,
        message: `Không có ID hoặc money cần pay nhỏ hơn 0`
    });
     const data = JSON.parse(readFileSync(dest, 'utf-8'));
     const find_id = data.find(i => i.fb_id == id || i.stk == id);
     const find_id_p = data.find(i => i.fb_id == id_p || i.stk == id_p);
     if (!find_id || !find_id_p) return res.json({
         status: 200,
         message: `${!find_id ? `Bạn chưa có tài khoản banking!`: !find_id_p ? `Người cần chuyển tiền không tồn tại trong hệ thống!`: 'lỗi chưa xác định, LH admin: ' + config.contacts.facebook}`
     });
     if (find_id.money < money_p) return res.json({
         status: 200, message: `Tài khoản của bạn còn ${locaStr(find_id.money)}$ không đủ ${locaStr(money_p)}$ để chuyển tiền!`
     })
     find_id.money -= +money_p,
     find_id_p.money += +money_p;
     writeFileSync(dest, JSON.stringify(data, 0, 4), 'utf-8');
     res.json({
         status: 201,
         message: `Chuyển tiền thành công!`,
         author: {
             fb_id: find_id.fb_id,
             logged: textPay(find_id, find_id_p)
             },
         dest: {
             fb_id: find_id_p.fb_id,
             logged: textPay(find_id_p, find_id)
         }
     });
     function textPay(a, b, c){
    return `[==[ BANKING PAY ]==]
         
🔎 STK: ${a.stk}.
👤 Chủ STK: ${a.name_stk}.
💰 Tiền: ${locaStr(a.money)}(${a.stk == find_id.stk ? `-`: `+`}${locaStr(money_p)}$).
_____
[pay]
✈👤 Người ${b.stk == find_id_p.stk ? `Nhận`: `Chuyển`}: 
• Tên: ${b.name_stk}.
• STK: ${b.stk}.
• FB: www.facebook.com/${b.fb_id}.
• Số Tiền ${b.stk == find_id_p.stk ? `Nhận`: `Chuyển`}: ${locaStr(money_p)}.`
};
};