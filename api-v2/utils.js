'use strict'

module.exports = class Utils {
    constructor() {};
    logged(data, type) {
        switch (type) {
            case 'success': console.log(`[ SUCCESS ] • ${data}`);
                break;
            case 'error': console.log(`[ ERROR ] • ${data}`);
                break;
            default: console.log(data);
            };
        };
        strSimilarity(a, b, c = 0) {
            const string_length = a.length > b.length ? b.length: a.length;
            //const similarity_percent = c;
            var similarity_count = 0,
            i = 0;
            for (; i < string_length; i++) {
                if (a.slice(i, i+1) == (b.slice(i, i+1))) similarity_count++;
            };
            //const similarity = (similarity_count*100)/string_length;
            return similarity_count;
        };
        baoLauNua(q,b){var a=q/1000,c=n=>n<10?'0'+n:n,cc=b;[{x:/SS/g,t:a%60},{x:/MM/g,t:(a%3600)/60},{x:/HH/g,t:(a/3600)%24},{x:/dd/g,t:(a/86400)%30},{x:/mm/g,t:(a/2592000)%12},{x:/yyyy/g,t:a/31104000}].forEach(i=>cc=cc.replace(i.x,c(Math.floor(i.t))));return cc};
        findSimilarlyInArray(str, arr, utils, obj){
         const reduce_compare = k => (a, b) => a[k] > b[k] ? a: b;
         const arrSimi = [];
        for (const i of arr) {
            const i2 = obj.status?i[obj.keys]:i;
            const similarity = utils.strSimilarity(str, i2);
            arrSimi.push({
                similarity,
                i
            });
        };
        const max = arrSimi.reverse().reduce(reduce_compare('similarity'));
        return max.similarity >= (str.length/2) ? max.i: false;
        };
    };