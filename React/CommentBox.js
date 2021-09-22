/*
 * @Author: [JokerChen]
 * @Date: 2021-09-02 11:20:01
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-09-03 11:36:32
 * @Description: 
 */
'use strict';
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getComments();
    setInterval(() => {
      this.getComments();
    }, 5000);
  }
  handleCommentSubmit (comment) {
    //子传父

  }

  getComments () {
    //获取评论信息方法
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: comments => {
        this.setState({ data: comments })
      },
      error: (xhr, status, err) => {
        console.log(err);
      }
    })
  }
  render () {
    return (
      <div className="ui comments">
        <h1>
          评论
        </h1>
        <div className="ui divider">
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}

export { CommentBox as default };