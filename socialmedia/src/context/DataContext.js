import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { initialState,DataReducer } from "../reducers/DataReducer";


const DataContext = createContext();
function DataProvider({children}) {

const [state,dispatch] = useReducer(DataReducer,initialState);

    return(
        <DataContext.Provider
        value={{
            token: state.token,
            user: state.user,
            allPosts: state.allPosts,
            dataDispatch: dispatch,
        }}
        >
            {children}
        </DataContext.Provider>
    )
};

const useData = () => useContext(DataContext);


export {DataProvider,useData}