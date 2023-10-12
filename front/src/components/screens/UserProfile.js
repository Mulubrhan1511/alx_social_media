import React,{useContext, useEffect, useState} from "react";
import { UserContext } from "../../App";
import {useParams} from 'react-router-dom'

const Profile = ()=>{
    const [userProfile,setProfile] = useState(null)
    const { dispatch } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem("user"))
    const {userid} = useParams()
    useEffect(() => {
        fetch(`/user/${userid}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            setProfile(result);
          });
      }, [userid]);
    const folloUser = ()=>{
        fetch('/follow',{
            method:"put",
            body:JSON.stringify({
                followId:userid
                }),
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            }
            
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState) => {
                return {
                  ...prevState,
                  user: {
                    ...prevState.user,
                    followers: [...prevState.user.followers, data._id],
                  },
                };
              });
        })
       
    }
    const unfolloUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            body:JSON.stringify({
                unfollowId:userid
                }),
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            }
            
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState) => {
                const updatedFollowers = prevState.user.followers.filter(
                  (followerId) => followerId !== data._id
                );
              
                return {
                  ...prevState,
                  user: {
                    ...prevState.user,
                    followers: updatedFollowers,
                  },
                };
              });
        })
        
        
    }
    return(
        <>
        {userProfile ? 
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
            display: 'flex',
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                src={userProfile.user.pic} alt="" />
            </div>
            <div>
             <h4>{userProfile.user.name}</h4>
             <h5>{userProfile.user.email}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h5>40 Posts</h5>
                    <h5>{userProfile.user.followers.length} folowers</h5>
                    <h5>{userProfile.user.following.length} following</h5>
                </div>
                
                {
                    userProfile.user.followers.includes(user._id) ? (
                        <button
                        style={{ margin: "10px" }}
                        className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={() => unfolloUser()}
                        >
                        Unfollow
                        </button>
                    ) : (
                        <button
                        style={{ margin: "10px" }}
                        className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={() => folloUser()}
                        >
                        Follow
                        </button>
                    )
                    }
                
            </div>
        </div>
        <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/> 
                    )
                })
            }
          
          
          
        </div>
    </div>
        : <h2>loading...!</h2>}
        </>
    )
}

export default Profile;