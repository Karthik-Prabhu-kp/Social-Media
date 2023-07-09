import React from 'react';
import SideBar from '../../components/sideBar/SideBar';
import NavBar from '../../components/navBar/NavBar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import PostCard from '../../components/postCard/PostCard';

import './Home.css'; // Import CSS file for styling

function Home() {
  const [userPosts, setUserPosts] = useState([]);
  const [postInput, setPostInput] = useState('');
  const { user, token } = useData();
  console.log("username in home",user.username)

  const getData = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${user.username}`);
      setUserPosts(response.data.posts);
    } catch {
      console.error('Error!');
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        '/api/posts',
        { postData: { content: postInput } },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(response);
      handlePostUpdate();
    } catch (e) {
      console.error('Error!', e);
    }
  };

  const handlePostUpdate = () => {
    // Triggered when a post is liked or deleted
    // Update the state
    getData(); // Fetch the latest data
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="home-container">
        <SideBar />
        <div className="main-content">
          <div className="post-input">
            <textarea type="text" placeholder="Write your post..." onChange={(event) => setPostInput(event.target.value)} />
            <button onClick={postData}>Post</button>  
          </div>
          {userPosts.map((post) => (
            <PostCard key={post.id} props={post} onPostUpdate={handlePostUpdate}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
