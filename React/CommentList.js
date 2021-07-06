/*
 * @Author: [JokerChen]
 * @Date: 2021-07-03 17:06:53
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 10:32:10
 * @Description: 
 */
'use strict';
import React from 'react';
import Comment from './Comment'

class CommentList extends React.Component {
  render () {
    var commentNode = this.props.data.map(comment => {
      return (
        <Comment author={comment.author} date={comment.date}>{comment.text}</Comment>
      )
    });

    return (
      <div>
        {commentNode}
      </div>
    )
    // return (
    //   <div>
    //     {/* 其中aaaaa部分为子组件的this.props.children的属性值 */}

    //     for(var i =0;i<commentNode.length;i++)        {
    //       <Comment author="{commentNode.author}" date="{commentNode.date}">{commentNode.text}</Comment>
    //     }
    //     {/* <Comment author="Joker" date="1分钟前">aaaaa</Comment>
    //     <Comment author="JokerC" date="3分钟前">bbbbb</Comment>
    //     <Comment author="JokerN" date="6分钟前">cccc</Comment> */}
    //   </div>
    // )
  }
}

export { CommentList as default };