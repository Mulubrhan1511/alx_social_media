import React,{createContext, useContext,useEffect,useReducer} from "react";
import NavBar from "./components/Navbar";
import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/screens/Home";
import {Home1} from "./components/screens/Home1";
import {SignIn} from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import {SignUp}  from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import {Create} from "./components/screens/Create";
import {reducer,initialState} from "./reducers/userReducer"
import UserProfile from "./components/screens/UserProfile"
import {UserProfile1} from "./components/screens/UserProfile1"
import EditProfile from "./components/screens/EditProfile"
import { AboutL } from "./components/screens/About1"
import UserMessage from "./components/screens/UserMessage"
import UserMessage1 from "./components/screens/Message1"
import SubscribedUserPost from "./components/screens/SubscribeUserPost"
import {Posts} from "./components/screens/Posts"
import {Profile1} from "./components/screens/Profile1"
import { About } from "./components/screens/About";
import { Sigin1 } from "./components/screens/Sigin1";
import { Signup1 } from "./components/screens/Signup1";



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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin1" element={<Sigin1 />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup1" element={<Signup1 />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile1" element={<Profile1 />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/createpost" element={<Create />} />
          
          <Route path="/messsage1" element={<UserMessage1 />} />
          <Route path="/ho" element={<Home1 />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/message1/:userId" element={<UserMessage />} />
          
          <Route path="/about" element={<About />} />
         
          <Route path="/aboutl" element={<AboutL />} />
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
