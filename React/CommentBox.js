/*
 * @Author: [JokerChen]
 * @Date: 2021-07-03 16:50:40
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 13:25:19
 * @Description: 
 */

import React from 'react'
import CommentList from './CommentList.js'
import CommentForm from './CommentForm.js'
import $ from 'jquery'

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getComments();
    setInterval(() => {
      this.getComments();
    }, 5000);
  }
  // 获取对应的数据
  getComments () {
    //此处可以通过jquery的ajax方法
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (comments) {
        this.setState({ data: comments });
      },
      error: (xhr, state, err) => {
        console.log(err);
      }
    })  
  }
  handleCommentSubmit (comment) {
    //父组件接收子组件的数据
    //进行数据处理
    let comments=this.state.data,
        newComment=comments.connect(comment);
    this.setState({data:newComment});
  }
  render () {
    return (
      <div className="ui comments" >
        <h1>评论</h1>
        <div classname=" ui divider">
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
        </div>
      </div>
    )
  };
}

export { CommentBox as default };