module.exports.config = {
    name: '/chi-tiet-tuong',
    credits: 'DC-Nam',
    description: '!',
    client: {
        limit_request: [10, 60]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}'
};
const {readFileSync,writeFileSync,existsSync} = require('fs-extra'),
{load} = require('cheerio'),
{get} = require('axios'),
lq = 'https://lienquan.garena.vn',
dest = __dirname + '/cache/chi-tiet-tuong.json';
module.exports.load = function(){
   if(!existsSync(dest)) writeFileSync(dest, '[]');
};
module.exports.run = async function ({
    req, res, next, utils, config, address
}){
    try {
    var {h,l} = req.query, obj = {}, i = 1,l = l.trim();
    const hero = await require('./find-hero.js').findHero(h,utils);
    if (isNaN(l) || !hero) return res.status(404).json({
        status: 404, message: !hero ? `Không tìm thấy tướng có ${isFinite(h)?'ID':'name'} là: ${h}`: isNaN(l) ? `Cấp độ của tướng phải là con số`: null
    });
    const data = JSON.parse(readFileSync(dest));
    const f = data.find(i => i.hero_id == hero.id|| i.hero_name == hero.name);
    if(!f){
    const response = await get(`https://lienquan.garena.vn/tuong-chi-tiet/${hero.id}`);
    const $ = load(response.data); // load HTML
        var t_skin = [], o_skin = [], stat = [], skill = [], bkn = [], ngoc = [], tb = [], tb2 = [], tb3 = [], tttc = {status:[],icon:[]};
       $('.bxskin .skin li a img').each((index, el) => t_skin.push(lq+$(el).attr('src')));
       $('.bxskin .cont-skin div img').each((index, el) => {
         if (!!(a=$(el).attr('src'))) o_skin.push(`${lq}${a}`);
       });
       $('.bxnumeral .cont .col p').each((index, el) => stat.push([$(el).find('label').text(), $(el).find('.champion_stat').attr('data-original') || $(el).find('.champion_stat').text().trim(),$(el).find('.champion_stat').attr('data-increase')]));
       $('.col-skill .item-skill').each((index, el) => skill.push([lq+$(el).find('.img-skill img').attr('src'), $(el).find('.in-skill .name').text(), $(el).find('.in-skill .txt:eq(0)').text(), $(el).find('.in-skill .txt:eq(1)').text().replace(/  |\n/g, ''), $(el).find('.in-skill .txt:eq(2)').text()]));
      $('.tabs-content:eq(2) table:eq(0) tbody tr').each((index, el) => {
           var _=[],a,b,c,d,e,g,h;
           a=$(el).find('td span img').attr('src');
           _.push(lq+a);
           b=$(el).find('ul li span:eq(0)').text();
           _.push(b);
           c=$(el).find('ul li:eq(1)').text();
           d=$(el).find('ul li:eq(2)').text();
           e=$(el).find('ul li:eq(3)').text();
           g=$(el).find('ul li:eq(5)').text();
           if (c != ' ') _.push(c);
           if(d != '')_.push(d);
           if (e != '') _.push(e);
           if (g != '') _.push(g);
           bkn.push(_);
          });
          /* TRANG BỊ */
          $('.tabs-content:eq(2) table:eq(2) tbody tr').each((index, el) => tb.push([lq+$(el).find('td:eq(0) span img').attr('src'), $(el).find('td:eq(1) ul li').text()]));
          $('.tabs-content:eq(2) table:eq(3) tbody tr').each((index, el) => tb2.push([lq+$(el).find('td:eq(0) img').attr('src'), $(el).find('td:eq(1) ul li').text()]));
          $(`.tabs-content:eq(2) table:eq(1) tbody tr`).each((index, el) => tb3.push([((lq+$(el).find('td:eq(0) span img').attr('src'))||(lq+$(el).find('td:eq(0) img').attr('src'))), $(el).find(`td:eq(1) ul li`).text()]));
          /**/
          /* THu TU NANG CHIEu */
          $('.tabs-content:eq(2) table:eq(1) tbody tr:eq(0) td').each((index, el) => {
              var _=[],i=0;
              for(;i++<4;){
                  const c = $(`.tabs-content:eq(2) table:eq(1) tbody tr:eq(${i}) td:eq(${index+1})`).text();
                  _.push(!c.trim()?false:c.trim()=='x'?true:null);
              };
              tttc.status.push(_);
              });
          tttc.icon.push([lq+$(`.tabs-content:eq(2) table:eq(1) tbody tr:eq(1) td:eq(0) img`).attr('src'),lq+$(`.tabs-content:eq(2) table:eq(1) tbody tr:eq(2) td:eq(0) img`).attr('src'),lq+$(`.tabs-content:eq(2) table:eq(1) tbody tr:eq(3) td:eq(0) img`).attr('src'),lq+$(`.tabs-content:eq(2) table:eq(1) tbody tr:eq(4) td:eq(0) img`).attr('src')]);
          tttc.status.pop();
          /**/
          const tb_x_0=tb2==0?tb:tb2,
           trang_bi = tb_x_0==0?tb3:tb_x_0;
           trang_bi.map(i => {
             if(i[0].startsWith(`${lq}h`))i[0] = i[0].replace(`${lq}h`,'h')
              });
        function f_ngoc(a,b,c){
            return {
                a: $(`.tabs-content:eq(2) table:eq(${a}) tbody tr:eq(${b}) td:eq(${c}) img`).attr('src'),
                b: $(`.tabs-content:eq(2) table:eq(${a}) tbody tr:eq(${b}) td:eq(${c})`).text().trim()||$(`.tabs-content:eq(2) table:eq(${a}) tbody tr:eq(${b}) td:eq(${c}) p`).text().trim()
            };
        };
        obj.hero_id = hero.id,
        obj.hero_name = hero.name,
        obj['image-skin'] = {thumbnails: t_skin, original: o_skin},
        obj.stat = stat,
        obj.skill = skill,
        obj.tieusu = $('.tabs-content:eq(1)').text(),
        obj.vitri = $('.tabs-content:eq(2) p span:eq(0)').text() || $('.tabs-content:eq(2) p span:eq(1)').text(),
        obj.bokynang = {t:`${$('.tabs-content:eq(2) h2 span strong:eq(0)').text() || $('.tabs-content:eq(2) h3 span strong:eq(0)').text()}`,bkn},
        obj.thứ_tự_tăng_chiêu = {image:((tttc_x_0=$('.tabs-content:eq(2) p:eq(6) span img').attr('src')),!tttc_x_0?null:lq+tttc_x_0), data:tttc},
        obj.ngoc = (x_n=[[lq+(f_ngoc(1,0,0).a || f_ngoc(2,0,0).a),(f_ngoc(1,1,0).b||f_ngoc(2,1,0).b)],[lq+(f_ngoc(1,0,1).a||f_ngoc(2,0,1).a),(f_ngoc(1,1,1).b||f_ngoc(2,1,1).b)],[lq+(f_ngoc(1,0,2).a || f_ngoc(2,0,2).a),(f_ngoc(1,1,2).b||f_ngoc(2,1,2).b)]],x_n.some(i=>i[0].includes(undefined))?null:x_n),
        obj.trang_bi = tb;
        data.push(obj)//,
       // writeFileSync(dest, JSON.stringify(data, 0, 4));
    } else obj = f;
    var l2 = obj.stat.length, count = 0, iconStat = ['⚔', '✡️', '♥', '🛡', '💎', '🕉️', '⏳', '🔫', '👟', '💉', '⚗', '️️🎯'];
       obj.stat.map((el, i) => {
           ++count;
           if(isFinite(el[1])) el[1] = ((+el[1])+(el[2]*l)-el[2]);
           el[0] = `${iconStat[i]} ${el[0]}`,
           el = el.splice(-1,2);
           });
       res.json({
           status: 201, message: `niii`, data: obj
       });
    }catch(err){
      console.log(err);
        res.status(400).json({
            message: err
        });
    };
};