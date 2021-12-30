/*
 * @Author: [JokerChen]
 * @Date: 2021-11-29 14:48:24
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-11-29 14:49:41
 * @Description: 
 */
let axios= require('axios');

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
