import React from 'react'
import { ACTION_TYPE } from '../utils/constants'

export const initialState = {
    token: '',
    user: [],
    allPosts: [],
    bookmarks: []
}


export function DataReducer(state,action) {
  
    switch(action.type){
        case ACTION_TYPE.SET_AUTH_TOKEN:
            return{
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case ACTION_TYPE.SET_USER:
            return{
                ...state,
                // user: action.payload
            };
        case ACTION_TYPE.GET_ALL_POSTS:
            return{
                ...state,
                allPosts: action.payload.allPosts
            };
        case ACTION_TYPE.GET_BOOKMARKS:
            return{
                ...state,
                bookmarks: action.payload.bookmarks
            };
    }
};