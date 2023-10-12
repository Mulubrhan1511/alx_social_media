import React,{createContext, useContext,useEffect,useReducer} from "react";
import NavBar from "./components/Navbar";
import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import {Create} from "./components/screens/Create";
import {reducer,initialState} from "./reducers/userReducer"
import UserProfile from "./components/screens/UserProfile"
import {UserProfile1} from "./components/screens/UserProfile1"
import EditProfile from "./components/screens/EditProfile"
import Message from "./components/screens/Messages"
import UserMessage from "./components/screens/UserMessage"
import UserMessage1 from "./components/screens/Message1"
import SubscribedUserPost from "./components/screens/SubscribeUserPost"
import {Posts} from "./components/screens/Posts"
import {Profile1} from "./components/screens/Profile1"
import { About } from "./components/screens/About";
import { ComplexNavbar } from './components/Navbar3';
import ExampleNavbar from './components/Navbar5';


export const UserContext = createContext()



function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>

    <div className="App">
      <div>
      <ExampleNavbar />
      
      
      </div>
   
<div>
<Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile1" element={<Profile1 />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/createpost" element={<Create />} />
          
          <Route path="/messsage1" element={<UserMessage1 />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/message1/:userId" element={<UserMessage />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/profile/:userid" element={<UserProfile />} />
          <Route path="/profile1/:userid" element={<UserProfile1 />} />
          <Route path="/myfollowerspost" element={<SubscribedUserPost />} />
    </Routes>
</div>
    
   
     
   
    
       
    </div>
   
    
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
