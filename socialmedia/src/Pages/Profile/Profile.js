import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import { useData } from '../../context/DataContext';
import PostCard from '../../components/postCard/PostCard';

import './Profile.css'; // Import CSS file for styling

function Profile() {
  const { user, token } = useData();

  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bio, setBio] = useState('This is a bio');
  const [url, setUrl] = useState('https://twitch.com');
  const [EditProfile,setEditProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    website: user?.website || "",
  });


 
  const getData = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${user.username}`);
      setUserPosts(response.data.posts);
    } catch {
      console.error('Error!');
    }
  };

  const editProfileData = async () => {
    try {
      const response = await axios.post(
        '/api/users/edit',
        { postData: { bio: bio, website: url } },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log('response', response);
    } catch (e) {
      console.error('Error', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="profile-container">
      <NavBar />
      <div className="main-content">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="profile-content">
          <div className="profile-header">
            <img className="profile-image" alt="profile-image" />
            <div className="profile-info">
              <h2>{user.firstName} {user.lastName}</h2>
              <div className="profile-actions">
                <button onClick={() => setShowModal(!showModal)}>Edit Profile</button>
                <button>Logout</button>
              </div>
              <p>@{user.username}</p>
              <p>{bio}</p>
              <a href={url}>Website</a>
              <div className="profile-stats">
                <span>Posts</span>
                <span>Followers</span>
                <span>Following</span>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal">
              <p>Have a select for avatar?</p>
              <label>
                Bio:
                <input type="text" name="bio" value={bio} onChange={(event) => setBio(event.target.value)} />
              </label>
              <label>
                Website:
                <input type="text" name="website" value={url} onChange={(event) => setUrl(event.target.value)} />
              </label>
              <button onClick={() => editProfileData()}>Save</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          )}
          <div className="posts-container">
            {userPosts.map((post) => (
              <PostCard key={post._id} props={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
