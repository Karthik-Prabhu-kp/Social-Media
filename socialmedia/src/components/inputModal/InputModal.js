import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useData } from '../../context/DataContext';

function InputModal({props,showInputModal,setShowInputModal,onPostUpdate}) {
    const [editedPost,setEditedPost] = useState(props.content || "" )
    
    const {token} = useData();
  
  const editPost = async () => {
    try {
      console.log(editedPost,"edited stuff")
      // const postData = editedPost
      const response = await axios.post(
        `/api/posts/edit/${props._id}`,
        { postData: { content: editedPost  } },
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
    setShowInputModal(false)
  };

  // useEffect(() => {
  //   if (props.content) {
  //     setEditedPost({
  //       content: props.content
  //     });
  //   }
  // },[])

  return (
    <div>
        <textarea type='text' value={editedPost} onChange={(event) => setEditedPost(event.target.value)} />
        <button onClick={() => editPost()}>Save</button>
        <button onClick={() => setShowInputModal(false)}>Close</button>
    </div>
  )
}

export default InputModal