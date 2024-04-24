module.exports.config = {
    name: '/check-address.json',
    credits: 'DC-Nam',
    description: '!',
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
const {
    load
} = require('cheerio'),
{
    get
} = require('axios'),
checkText = a => a.replace(/null/g, 'Chưa Có Dữ Liệu!').replace(/undefined/g, 'Chưa Xác Định!').replace(/true/g, 'Có').replace(/false/g, 'Không');
module.exports.run = async function ({
    req, res, next, utils, config, address
}) {
    try {
        const {
            h
        } = req.query;
        if (!/\./.test(h)) return res.json({
            code: -1, msg: `Vui lòng nhập địa chỉ cần kiểm tra!`
        });
        const obj = {},
        resRQ = await get(`https://check-ip.com/${h}`),
        $ = load(resRQ.data);
        obj.ip = $(`.your-ip`).text().replace(/\n| /g, '');
        $(`.ip-data__col.ip-data__col_param div`).each(($idx, $el) => obj[$($el).text().replace(/\n|\t|:/g, '').replace(/ /g, '_').toLowerCase()] = $(`.ip-data__col.ip-data__col_value:eq(${$idx}) div span`).text().replace(/\n/g, '').trim() || null);
        $(`.card__col.card__col_param`).each(($idx, $el) => {
            if ($idx != 0) obj[$($el).text().replace(/\n|\t|:/g, '').replace(/ /g, '_').toLowerCase()] = $(`.card__col.card__col_value:eq(${$idx}) span`).text().replace(/\n/g, '').trim() || null
        })
        res.json({
            code: 200,
            msg: checkText(`- IP: ${obj.ip}\n- Quốc Gia: ${obj.country}\n- Thành phố: ${obj.city}\n- Mã ZIP: ${obj.zip_code}\n- Tên Máy Chủ: ${obj.hostname}\n- Dải IP: ${obj.ip_range}\n- Proxy: ${obj.proxy == 'No'?'Không':obj.proxy}\n- Vùng, Miền: ${obj.region}\n- Nhà Cung Cấp DV Internet: ${obj.isp}\n- Vĩ Độ: ${obj.latitude}\n- Kinh Độ: ${obj.longitude}\n- Khu Vực: ${obj.zone}\n- Giờ Địa Phương: ${obj.local_time}\n- Giờ GMT: ${obj.gmt_time}`),
            data: obj
        });
    }catch(err) {
        res.json(err);
    };
};