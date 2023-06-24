import React from 'react';
import axios from 'axios';

import "./PostCard.css"

function PostCard({ props }) {
  /**
 * This handler handles liking a post in the db.
 * send POST Request at /api/posts/like/:postId
 * */

  const likeClicked = async() => {
    try {
      const response = await axios.post(`/api/posts/like/${props._id}`);
      console.log(response)
    } catch(e){
      console.error("Error!",e);
    }
  };




  return (
    <div className="post-card">
      <p className="post-username">@{props.username}</p>
      <p className="post-content">{props.content}</p>
      <div className="post-buttons">
        <button onClick={likeClicked}><i className="fa-regular fa-heart"></i></button>
        <button><i className="fa-regular fa-bookmark"></i></button>
        <button><i className="fa-regular fa-comment"></i></button>
      </div>
    </div>
  );
}

export default PostCard;