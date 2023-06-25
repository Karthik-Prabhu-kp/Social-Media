import React, { useEffect } from 'react'
import axios from 'axios';
import { useData } from '../../context/DataContext';

function Bookmark() {

    const {token} = useData();
    /**
 * This handler gets all the user bookmarks from the db.
 * send GET Request at /api/users/bookmark/
 * */
    console.log(token)

    const getAllBookmarks = async () => {
        try {
          const response = await axios.get('/api/users/bookmark', {
            headers: {
              Authorization: token,
            },
          });
          console.log(response);
        } catch (e) {
          console.error("Error!", e);
        }
      };
      

  useEffect(() => {
    getAllBookmarks()
  },[])

  return (
    <div>Bookmark</div>
  )
}

export default Bookmark