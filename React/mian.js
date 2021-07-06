/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 10:18:48
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 10:44:48
 * @Description: 
 */
import 'semantic-ui/semantic-ui!'
import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox'

var comments = [{
    "author": "Joker",
    "date": "1分钟前",
    "text": "aaaaa"
  },{
    "author": "JokerC",
    "date": "3分钟前",
    "text": "bbbbbb"
  }
]


// ReactDOM.render(
//   <CommentBox data={comments} />,
//   document.getElementById('app')
// )
//从本地文件中进行数据处理
ReactDOM.render(
  <CommentBox url="./comment.json" />,
  document.getElementById('app')
)