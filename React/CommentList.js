/*
 * @Author: [JokerChen]
 * @Date: 2021-09-02 14:46:15
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-09-02 16:46:33
 * @Description: 
 */
import React from 'react'
import CommentItem from './CommentItem'
class CommentList extends React.Component {
  render () {
    let commentNodes=this.props.data.map(comments=>{
      return (
        <CommentItem author={comments.author} time={comments.time}>
          {comments.content}
        </CommentItem>
      )
    });

    return (
      <div>
        {commentNodes}
      </div>
    );
  }
}
export { CommentList as default };