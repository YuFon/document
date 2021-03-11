const axios = require('axios')
const { baseURL } = require('../common/constant')
const request = (
    baseURL = '',
    contentType = 'application/json; charset=UTF-8'
) => ( 
        method = 'post',
        url = '',
        paramsObj = {}
    ) => {
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
                'Content-Type': contentType
            },
            baseURL,
            [dataName]: paramsObj,
            responseType: 'json',
            timeout: 120000
        });
    }
const requestList = {}
for (key in baseURL) {
    requestList[`${key}`] = request(baseURL[key].url, baseURL.biquge.contentType)
}

const api = {
    novel: {
        biquge: {
            search(data) {
                return requestList.biquge('post', '/search', data)
            }
        },
        soshuw: {
            search(data) {
                return requestList.soshuw('post', '/search.html', data)
            }
        }
    }
}
module.exports = {
    request,
    api
}