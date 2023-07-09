import React, { useState } from 'react';
import axios from 'axios';

import "./PostCard.css"
import { useData } from '../../context/DataContext';
import InputModal from '../inputModal/InputModal';

function PostCard({ props,onPostUpdate }) { 
  const [showOptions,setShowOptions] = useState(false);
  const [showInputModal,setShowInputModal] = useState(false);
  const [postData,setPostData] = useState("");
  const [postBookmarked,setPostBookmarked] = useState(false);
  const {token} = useData();

  //like a post
  const likeClicked = async() => {
    try {
      const response = await axios.post(
        `/api/posts/like/${props._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );console.log(response)
      onPostUpdate();
    } catch(e){
      console.error("Error!",e);
    }
  };

  // const bookmarkAdded = async () => {
  //   try {
  //     const response = await axios.post(
  //       `/api/users/bookmark/${props._id}`,
  //       {},
  //       {
  //         headers: {
  //           authorization: token,
  //         },
  //       }
  //     );
  //     setPostBookmarked(true);
  //   } catch(e){
  //     console.error("Error!",e);
  //   }
  // };

  //bookmark added
  const bookmarkAdded = async () => {
    try {
      const response = await axios.post(
        `/api/users/bookmark/${props._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      // Check if the bookmark was successfully added or if it already exists
      if (response.data.errors && response.data.errors.length > 0) {
        console.error(response.data.errors[0]);
        // Handle the case where the bookmark already exists if needed
        //  display a toast message or handle it in another way
      } else {
        setPostBookmarked(true); // Set postBookmarked to true when bookmark is added
      }
    } catch (e) {
      console.error("Error!", e);
    }
  };
  
  //bookmark removed
  const bookmarkRemoved = async () => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${props._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );console.log(response)
      setPostBookmarked(false);
    } catch(e){
      console.error("Error!",e);
    }
  };

  /**
 * This handler handles updating a post in the db.
 * send POST Request at /api/posts/edit/:postId
 * body contains { postData }
 * */
  const editPost = async () => {
    try {
      const response = await axios.post(
        `/api/posts/edit/${props._id}`,
        { postData },
        {
          headers: {
            authorization: token,
          },
        }
      );console.log(response)
    } catch(e){
      console.error("Error!",e);
    }
  };

  //delete a post
  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `/api/posts/${props._id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );console.log(response)
      onPostUpdate();
    } catch(e){
      console.error("Error!",e);
    }
  };



  const handleBookmarkToggle = async () => {
    try {
      if (postBookmarked) {
        await bookmarkRemoved();
      } else {
        await bookmarkAdded();
      }
    } catch (e) {
      console.error("Error!", e);
    }
  };
  

  return (
    <div className="post-card">
      <button onClick={() => setShowOptions(!showOptions)}><i class="fa-solid fa-ellipsis"></i></button>
      {showOptions &&
        <ul>
          <li onClick={() => setShowInputModal(prevState => !prevState)}>EDIT</li>
          <li onClick={() => deletePost()}>DELETE</li>
        </ul>}
      {showInputModal &&
        <InputModal props={props} showInputModal={showInputModal} setShowInputModal={setShowInputModal} onPostUpdate={onPostUpdate}/>}
      <p className="post-username">@{props.username}</p>
      <p className="post-content">{props.content}</p>
      <div className="post-buttons">
        <button onClick={likeClicked}>{props.likes.likeCount}<i className="fa-regular fa-heart"></i></button>
        <button onClick={handleBookmarkToggle} className={postBookmarked ? "active" : ""}>
          <i className="fa-regular fa-bookmark"></i>
        </button>
        <button><i className="fa-regular fa-comment"></i></button>
      </div>
    </div>
  );
}

export default PostCard;
