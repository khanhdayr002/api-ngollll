module.exports.config = {
  name: '/imgbb-upload.json',
  credits: 'DC-Nam',
  description: '!',
  client: {
    limit_request: [10,
      60]
  },
  contacts: {
    facebook: 'www.facebook.com/levy.nam.2k5'
  },
  method: 'post',
  docs: '{url}'
};
const {
  post
} = require('axios');
module.exports.run = async function({
  req, res, next, utils, config, address
}) {
  try {
    const data = [],
      d = req.body.d;
    if (d == 0 || typeof d != 'object') res.status(400).json({
      code: 400, msg: d == 0 ? `Vui lòng reply ảnh hoặc nhập link ảnh!` : 'chỉ nhận array'
    }).end();
    for (const i of d) {
      try {
        const resp = await post(`https://api.imgbb.com/1/upload?key=588779c93c7187148b4fa9b7e9815da9&image=${i}`);
        data.push(resp.data.data);
      } catch { continue };
    };
    res.status(201).json({
      code: 1, msg: data.map(i => i.display_url).join('\n'), data
    }).end();
  } catch (err) {
    res.json(err);
  };
};