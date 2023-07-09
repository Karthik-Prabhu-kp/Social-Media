import React, { useEffect } from 'react'
import axios from 'axios';
import { useData } from '../../context/DataContext';
import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import PostCard from '../../components/postCard/PostCard';
import { ACTION_TYPE } from '../../utils/constants';

function Bookmark() {

  const {bookmarks, allPosts, token, dataDispatch} = useData();
    console.log(bookmarks,allPosts)
  
    const getAllBookmarks = async () => {
      console.log(token)
        try {
          const response = await axios.get('/api/users/bookmark/', {
            headers: {
              authorization: token,
            },
          });
         console.log("bookmarks page load",response.data.bookmarks)
          dataDispatch({
            type: ACTION_TYPE.GET_BOOKMARKS,
            payload: {
              bookmarks: response.data.bookmarks,
            },
          });
        } catch (e) {
          console.error("Error!", e);
        }
      };

    const bookmarkedPosts = allPosts.filter((post) => 
      bookmarks.find((bookmark) => bookmark._id === post._id)
    );

    console.log("bookmarked posts",bookmarkedPosts)
      

  useEffect(() => {
    getAllBookmarks()
  },[])

  return (
    <div>
      <NavBar />
      <SideBar />
      {bookmarkedPosts.length ? bookmarkedPosts.map(post => <PostCard key={post._id} props={post}/>) : <h3>No Bookmarks to show</h3>}
      
    </div>
  )
}

export default Bookmark