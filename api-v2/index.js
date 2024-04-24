module.exports = ()=> {
    let
    express = require('express'),
    fs = require('fs'),
    use = express.Router(),
    utils = new (require('./utils.js'))(),
    _api = __dirname+'/api',
    all = ''

    fs.readdirSync(_api).forEach(el=>use.use(`/${el}`, loadRouter(el)));
    use.use((a, b)=>b.send(`<meta name="viewport" content="width=device-width, initial-scale=1.0" /><p>API - Router</p>${all.replace(/{host}/g, a.headers.host)}`));

    function loadRouter(api) {
        let
        router = express.Router(),
        path = `${_api}/${api}`;

        fs.readdirSync(path).filter(el=>el.endsWith('.js')).forEach(file=> {
            let
            requ = require(`${path}/${file}`),
            url = `https://{host}/v2/${api}${requ.config.name}`;
            all += `<a href='${url}'>${api} - ${requ.config.name}</a><br>`;
          
            router[requ.config.method](requ.config.name, (a, b, c)=> {
                let
                opt = {
                    req: a, res: b, next: c, utils, config: requ.config
                };

                requ.run(opt);
            });
        });

        return router;
    };

    return use;
};