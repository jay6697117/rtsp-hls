const axios = require('axios');
const https = require('https');
const http = require('http');
const port = 8001;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJzY29wZSJdLCJleHAiOjE3MDYwMTkwNTgsImp0aSI6IjlCaTc1aVFOM0pQRjdFV0FzSW9rSXNWSEtUayIsImNsaWVudF9pZCI6IjIzMjU4OTcxIn0.70TdFLVkhdzkPy9Ov32cou4FzbZyUGqpIo_0IlAB09I';
const baseUrl = 'https://172.30.229.4';

const fooAsync = () => {
  let params = {
    pageNo: 1,
    pageSize: 2
  };

  return new Promise((resolve, reject) => {
    console.log('111');
    axios({
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      method: 'post',
      url: baseUrl + '/artemis/api/resource/v2/camera/search',
      data: params,
      headers: {
        'Content-Type': 'application/json', // 根据实际情况设置Content-Type
        access_token: '3548a8c7-ef47-4c8d-805f-a9b941e7bd5b'
      }
    }).then(res => {
      console.log('222');

      resolve(res.data.data);
    });
  });
};

const fooAsync1 = code => {
  let params = {
    cameraIndexCode: code,
    protocol: 'hls'
  };
  return new Promise((resolve, reject) => {
    axios({
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      method: 'post',
      url: baseUrl + '/artemis/api/video/v2/cameras/previewURLs',
      data: params,
      headers: {
        'Content-Type': 'application/json', // 根据实际情况设置Content-Type
        access_token: token
      }
    }).then(res => {
      resolve(res.data.data);
    });
  });
};

(async () => {
  const { list } = await fooAsync();
  console.log('list :>> ', list);

  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    const indexCode = element.indexCode;
    const {url} = await fooAsync1(indexCode);
    list[index].url = url
  }

  http
    .createServer(function (req, res) {
      // 设置响应头
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      // 开启Cors
      res.writeHead(200, {
        //设置允许跨域的域名，也可设置*允许所有域名
        'Access-Control-Allow-Origin': '*',
        //跨域允许的请求方法，也可设置*允许所有方法
        'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS',
        //允许的header类型
        'Access-Control-Allow-Headers': 'Content-Type'
      });

      res.end(JSON.stringify(list));
    })
    .listen(port, function () {
      console.log('server is listening on port ' + port);
    });
})();
