module.exports.config = {
    name: '/check-xsmb.json',
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
} = require('axios');
module.exports.run = async function ({
    req, res, next, utils, config, address
}) {
    try {
        var data = [];
        const response = await get(`https://xoso.me/xsmb-sxmb-xstd-xshn-kqxsmb-ket-qua-xo-so-mien-bac.html`);
        const $ = load(response.data);
        $(`.tit-mien.clearfix h2`).each((j,el) => {
        var infoXS = {xs: []},
        i;
        infoXS.title = $(el).text();
        infoXS.xs.push([$(`.v-gdb `).eq(j).text()]);
        infoXS.xs.push([$('.v-g1').eq(j).text()]);
        const g2 = [];
        for (i = 0; i < 2; i++) g2.push($(`.v-g2-${i} `).eq(j).text());
        infoXS.xs.push(g2);
        const g3 = [];
        for (i = 0; i < 6; i++) g3.push($(`.v-g3-${i} `).eq(j).text());
        infoXS.xs.push(g3);
        const g4 = [];
        for (i = 0; i < 4; i++) g4.push($(`.v-g4-${i} `).eq(j).text());
        infoXS.xs.push(g4);
        const g5 = [];
        for (i = 0; i < 6; i++) g5.push($(`.v-g5-${i} `).eq(j).text());
        infoXS.xs.push(g5);
        const g6 = [];
        for (i = 0; i < 3; i++) g6.push($(`.v-g6-${i} `).eq(j).text());
        infoXS.xs.push(g6);
        const g7 = [];
        for (i = 0; i < 4; i++) g7.push($(`.v-g7-${i} `).eq(j).text());
        infoXS.xs.push(g7);
        infoXS.date = infoXS.title.split(/ /g).pop().replace(/-/g, '/');
        infoXS.message = `${infoXS.title}\n\n${infoXS.xs.map((d,i) => `${i == 0 ? 'Giải Đặc Biệt': `Giải ${i}`}: ${d.join(' - ')}`).join('\n')}`;
/*push*/data.push(infoXS);
});
        res.status(200).json({
            messages: ``,
            data
        });
    }catch(err) {
        console.log(err);
        res.send(err);
        res.end();
    };
};