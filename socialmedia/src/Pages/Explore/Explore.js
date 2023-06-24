import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ACTION_TYPE } from '../../utils/constants';
import { useData } from '../../context/DataContext';
import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import PostCard from '../../components/postCard/PostCard';

import "./Explore.css"

function Explore() {
  const { dataDispatch, allPosts } = useData();

  const getData = async () => {
    try {
      const response = await axios.get('/api/posts');
      console.log(response.data.posts);
      dataDispatch({
        type: ACTION_TYPE.GET_ALL_POSTS,
        payload: {
          allPosts: response.data.posts,
        },
      });
    } catch {
      console.error("Error!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="explore">
      <NavBar />
      <SideBar />
      <div className="main-content">
        
        <div className="post-container">
          {allPosts.map(post => (
            <PostCard props={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
