/*
 * @Author: [JokerChen]
 * @Date: 2021-09-02 14:59:32
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-09-03 08:39:16
 * @Description: 
 */
import React from 'react';
class CommentItem extends React.Component {
  render () {
    return (
      <div className="comment">
        <div className="content">
          <span className="author"></span>
          <span className="authorTime">{this.props.time}{this.props.content}</span>
        </div>
      </div>
    );
  }
}
export { CommentItem as default };
