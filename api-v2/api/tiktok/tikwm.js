module.exports.config = {
    name: '/tikwm.json',
    credits: 'DC-Nam',
    description: 'tikwm.com',
    client: {
        limit_request: [10,
            60]
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    },
    method: 'get',
    docs: '{url}, query: video, music, user, trending, search'
};
const {
    post
} = require('axios'),
tikwm = `https://www.tikwm.com`;
module.exports.run = async function({
    req, res, next, utils, config, address
}) {
    try {
        const {
            user,
            video,
            music,
            trending,
            search,
            info
        } = req.query;
        var data;
        if (user) data = (await post(`${tikwm}/api/user/posts`, {
            unique_id: user
        })).data;
        if (video) data = (await post(`${tikwm}/api/`, {
            url: video
        })).data;
        if (music) data = (await post(`${tikwm}/api/music/posts`, {
            music_id: music
        })).data;
        if (trending) data = (await post(`${tikwm}/api/feed/list`, {
            region: trending
        })).data;
        if (search) data = (await post(`https://tikwm.com/api/feed/search?keywords=${search}`)).data;
      if (info) data = (await post(`https://www.tikwm.com/api/user/info?unique_id=${info}`)).data;
        res.json(data);
    }catch(err) {
        console.log(err);
        res.json(err);
    };
};