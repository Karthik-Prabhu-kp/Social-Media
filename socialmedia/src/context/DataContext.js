import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { initialState,DataReducer } from "../reducers/DataReducer";
import { ACTION_TYPE } from "../utils/constants";


const DataContext = createContext();
function DataProvider({children}) {

const [state,dispatch] = useReducer(DataReducer,initialState);

const getAllPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      console.log(response.data.posts);
      dispatch({
        type: ACTION_TYPE.GET_ALL_POSTS,
        payload: {
          allPosts: response.data.posts,
        },
      });
    } catch {
      console.error("Error!");
    }
  };

// const getAllBookmarks = async () => {
//       console.log(token)
//         try {
//           const response = await axios.get('/api/users/bookmark/', {
//             headers: {
//               authorization: token,
//             },
//           });
//          console.log("bookmarks page load",response.data.bookmarks)
//           dispatch({
//             type: ACTION_TYPE.GET_BOOKMARKS,
//             payload: {
//               bookmarks: response.data.bookmarks,
//             },
//           });
//         } catch (e) {
//           console.error("Error!", e);
//         }
//       };



      useEffect(() => {
        getAllPosts();
      }, []);

    return(
        <DataContext.Provider
        value={{
            token: state.token,
            user: state.user,
            allPosts: state.allPosts,
            bookmarks: state.bookmarks,
            dataDispatch: dispatch, 
        }}
        >
            {children}
        </DataContext.Provider>
    )
};

const useData = () => useContext(DataContext);


export {DataProvider,useData}