import React from 'react'
import SideBar from '../../components/sideBar/SideBar'
import NavBar from '../../components/navBar/NavBar'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import PostCard from '../../components/postCard/PostCard';


function Home() {

  const [userPosts,setUserPosts] = useState([]);
  const [postInput,setPostInput] = useState("");
  const {user,token} = useData();
  
  const getData = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${user.username}`);
      console.log(response.data.posts)
      setUserPosts(response.data.posts);
      // dataDispatch({
      //   type: ACTION_TYPE.,
      //   payload: {
      //     allPosts: response.data.posts,
      //   },
      // });
    } catch {
      console.error("Error!");
    }
  };
  /**
 * This handler handles creating a post in the db.
 * send POST Request at /api/user/posts/
 * body contains {content}
 * */

  const postData = async () => {
    console.log(postInput)
    const content = postInput
    try {
      const response = await axios.post(
        `/api/user/posts/`,
        {content},
        {
          headers: {
            authorization: token,
          },
        }
      );console.log(response)
    } catch(e){
      console.error("Error!",e);
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div>
        <NavBar />
        <SideBar />
        <div>
          <div>
            <input type='text' onChange={(event) => setPostInput(event.target.value)}/><button onClick={postData}>Post</button>
          </div>
          {userPosts.map(post => <PostCard props={post} />)}
        </div>
    </div>
  )
}

export default Home