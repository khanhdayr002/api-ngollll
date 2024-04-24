module.exports.config = {
    name: '/translate.json',
    credits: 'DC-Nam',
    description: 'google.com',
    client: {
        limit_request: [10,
            60]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}'
};
const Axios = require('axios');
module.exports.run = async function({
    req, res, next, utils, config, address
}) {
    try {
        var {
            from,
            to,
            text
        } = req.query,
        dataISO = global.data.get('/code-language.json'),
        findISO = a => dataISO.find(i => i.code == a);
        to = to?to.trim(): to;
        if ((if0_a=!String(text).trim()) || (if0_b=!findISO(to) || (if0_c = (from != 'auto' && !findISO(from))))) return res.json({
            code: -1, msg: if0_a?`Vui lòng nhập văn bản cần dịch!`: if0_c?`Ngôn ngữ văn bản không có trong hệ thống(có thể chọn "auto" để tự động phát hiệnn ngôn ngữ!`: if0_b?`Mã ngôn ngữ cần dịch không tồn tại trong hệ thống!`: undefined
        });
        const configRequest = {
            method: 'get',
            url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURI(text)}`
        },
        {
            data
        } = await Axios(configRequest);
        res.json({
            code: 200, msg: `Được dịch từ ${findISO(data[2]).language} qua ${findISO(to).language}.`, data: {
                from: data[2], to, translate: data[0][0][0]
            }
        });
    }catch(err) {
        res.json({
            code: -1, msg: `err bad word`
        })
    };
};