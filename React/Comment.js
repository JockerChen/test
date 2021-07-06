/*
 * @Author: [JokerChen]
 * @Date: 2021-07-03 17:20:27
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 10:11:00
 * @Description: 
 */
import React from 'react'
class Comment extends 'React.Component'{
  render () {
    return (
      <div className="comment">
        <div className="content">
          <span className="author">
            {this.props.author}
          </span>
          <div className="date">
            {this.props.date}
          </div>
          <div className="text">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
export { Comment as default };