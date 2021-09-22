/*
 * @Author: [JokerChen]
 * @Date: 2021-09-02 14:49:28
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-09-03 11:36:42
 * @Description: 
 */
import React from 'react'
class CommentForm extends React.Component {
  handleSubmit (event) {
    event.preventDefault();
    console.log(event);
    let author = this.refs.author.value;
    let content = this.refs.content.value;
    this.onCommentSubmit({ author, content });
  }
  render () {
    return (
      <form className="ui reply form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <input type="text" placeholder="姓名" ref="author" />
        </div>
        <div className="field">
          <input type="text" placeholder="评论" ref="content" />
        </div>
        <button type="submit" className="ui blue button">添加评论</button>
      </form>
    );
  }
}
export { CommentForm as default };