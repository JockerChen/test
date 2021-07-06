/*
 * @Author: [JokerChen]
 * @Date: 2021-07-03 17:10:16
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 13:18:24
 * @Description: 由commentForm上传相应的信息递交给commenBox组件
 */
import React from 'react';

class CommentForm extends React.Component {
  
  //递交时的相应方法
  handleSubmit (event) {
    event.preventDefault();
    console.log('提交表单');
    //获取递交的值
    let author=this.refs.author.value;
    let text=this.refs.text.value;
    this.onCommentSubmit({
      "author":author,
      "text":text,
      "date":"刚刚"
    })
  }

  render () {
    return (
      <form className="ui reply form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <input type='text' placeholder="姓名" ref="author" />
        </div>
        <div className="field">
          <textarea type='text' placeholder="评论内容" ref="text" />
        </div>
        <button type="submit" className="ui green button">添加评论</button>
      </form>
    )
  }
}

export { CommentForm as default };