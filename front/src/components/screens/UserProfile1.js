import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import {useParams, Link} from 'react-router-dom'

export const UserProfile1 = () => {
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
  return (
    <>
    {userProfile ? 
    <div>
        


  <section class="relative block h-500-px">
  <div class="absolute top-0 w-full h-80 bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=60')" }}>
  
</div>
    
  </section>
  <section class=" py-1 ">
    <div class="container mx-auto px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-80">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
            
              <div class="relative">
                <img alt="..." src={userProfile.user.pic} class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
            <div class="py-6 px-3 mt-32 sm:mt-0">
                <div class="flex gap-2">
                    {
                    userProfile.user.followers.includes(user._id) ? (
                        <button class="bg-white active:bg-pink-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => unfolloUser()}>
                        Following
                        </button>
                    ) : (
                        <button class="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => folloUser()}>
                        Follow
                        </button>
                    )
                    }
                    <Link to={`/message1/${userProfile.user._id}`}>
                    <button className="bg-white active:bg-pink-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      <div className="flex items-center">
                        <span className="ml-1">Message</span>
                        <PaperAirplaneIcon className="h-6 w-6 text-black" />
                      </div>
                    </button>
                  </Link>
                </div>
                </div>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-1">
              <div class="flex justify-center py-4 lg:pt-4 pt-8">
                
                <div class="mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{userProfile.user.followers.length} </span><span class="text-sm text-blueGray-400">Followers</span>
                </div>
                <div class="mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{userProfile.user.following.length} </span><span class="text-sm text-blueGray-400">Following</span>
                </div>
                <div class="lg:mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{userProfile.posts.length || 0}</span><span class="text-sm text-blueGray-400">Posts</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-12">
            <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
            {userProfile.user.name}
            </h3>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i class="far fa-envelope mr-2 text-lg text-blueGray-400"></i>
            {userProfile.user.email}
            </div>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              {userProfile.user.location ? userProfile.user.location : "Not Avalable"}
            </div>
           
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>ALX Software engineering
            </div>
          </div>
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                {userProfile.user.bio ? userProfile.user.bio : ""}
                </p>
                
              </div>
            </div>
          </div>
          
          <div class="grid-cols-1 sm:grid md:grid-cols-3 ">
          {userProfile.posts.map(item=>{
             return (
  <div
    class="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
    <div className="flex items-center">
  <img
    className="h-8 w-8 rounded-full mr-2"
    src={userProfile.user.pic}
    alt=""
  />
  <h6 style={{ margin: '10px 0', fontWeight: 'normal' }} className="font-mono text-sm font-bold dark:text-black text-purple-600">
  {item.postedBy.name}
</h6>
  <div className="ml-auto">
    
    <div>
      
      
    </div>
    
  </div>
</div>
    <a href="#!">
      <img
        class="rounded-t-lg"
        src={item.photo}
        alt="Hollywood Sign on The Hill" />
    </a>
    <div class="p-6">
      
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-500">
       {item.body}
      </p>
    </div>
    
  </div>
  );
})}
  
  
</div>
        </div>
      </div>
    </div>
    
  </section>

    </div>
    : <h2>loading...!</h2>}
    </>
  )
}
