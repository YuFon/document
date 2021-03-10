const axios = require('axios');

const request = (
        method = 'post',
        url = '',
        paramsObj = {}
    ) => {
    console.log(paramsObj)
    let dataName = 'data';

    if (method === 'get') {
        dataName = 'params';
    } else {
        dataName = 'data';
    }

    return axios({
        method,
        url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
        data: paramsObj,
        params: paramsObj,
        responseType: 'json',
        timeout: 120000
    });
};

const api = {
    novel: {
        search: {
            biquge(data) { return request('post', 'http://m.loubiqu.com/modules/article/search.php', data)}
        }
    }
}
module.exports = {
    request,
    api
}