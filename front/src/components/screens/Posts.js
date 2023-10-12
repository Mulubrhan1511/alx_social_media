import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { HandThumbUpIcon, HandThumbDownIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

export const Posts = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
            console.log(result)
        })
    },[])
    const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };
    const likepost = (id) => {
        fetch("/like", {
          method: 'put',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postId: id
          })
        }).then(res => res.json())
          .then(result => {
            const newData = data.map(item => {
              if (item._id === result._id) {
                return { ...item, likes: result.likes };
              } else {
                return item;
              }
            });
            setData(newData);
          });
      };
      
      const unlikepost = (id) => {
        fetch("/unlike", {
          method: 'put',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postId: id
          })
        }).then(res => res.json())
          .then(result => {
            const newData = data.map(item => {
              if (item._id === result._id) {
                return { ...item, likes: result.likes };
              } else {
                return item;
              }
            });
            setData(newData);
          });
      };
      const makeComment = (text, postId) => {
        fetch('/comment', {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId,
            text,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const newData = data.map((item) => {
              if (item._id === result._id) {
                // Update the post with the new comment
                return { ...item, comments: result.comments };
              } else {
                return item;
              }
            });
            setData(newData);
          });
      };
      const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
          method: "delete",
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            if (result.error) {
              // Handle error response, if any
              console.log(result.error);
            } else {
              // Remove the deleted post from the UI
              setData(data.filter(item => item._id !== postId));
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
  return (
    <div>
    {
        data.map(item=>{
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href={item.postedBy._id !== user._id ? '/profile1/' + item.postedBy._id : '/profile1/'} className="flex items-center">
      <img
  className="h-8 w-8 rounded-full mr-2"
  src={item.postedBy.pic}
  alt=""
/>
  <h6 style={{ margin: '10px 0 5px 10px', fontWeight: 'normal' }} className="font-mono text-sm font-bold dark:text-black text-purple-600">
    {item.postedBy.name}
  </h6>
</a>
        
          <p style={{ margin: '10px 0 5px 10px' }} className="text-sm dark:text-black text-purple-600">{item.body}</p>
        <a href="#">
          <img className="p-8 rounded-t-lg" src={item.photo} alt="product image" />
        </a>
        <div className="px-5 pb-5">
        <div className="flex flex-col items-start justify-between">
  <div className="flex items-center space-x-2">
    {item.likes.includes(user._id) ? (
      <button
      type="button"
      className="relative rounded-full p-1 text-blue-400 hover:text-blue focus:outline-none focus:ring-2 focus:ring-white flex items-center"
      onClick={() => unlikepost(item._id)}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">Liked</span>
      <HandThumbUpIcon className="h-6 w-6" style={{ fill: 'lightblue' }} aria-hidden="true" />
      <span className="ml-1">{item.likes.length}</span>
    </button>
    ) : (
      <button
        type="button"
        className="relative rounded-full p-1 text-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex items-center"
        onClick={() => likepost(item._id)}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Liked</span>
        <HandThumbUpIcon className="h-6 w-6" aria-hidden="true" />
        <span className="ml-1">{item.likes.length}</span>
      </button>
    )}

    <button
      type="button"
      className="relative rounded-full p-1 text-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex items-center"
      onClick={toggleComments}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">Comments</span>
      <ChatBubbleBottomCenterIcon className="h-6 w-6" aria-hidden="true" />
      <span className="ml-1">{item.comments.length}</span>
    </button>
  </div>

  {showComments && (
    <div>
      {item.comments.map((record) => (
        <h6 key={record._id}>
          <span style={{ fontWeight: '500' }}>{record.postedBy.name}</span>
          {record.text}
        </h6>
      ))}
    </div>
  )}

  {!showComments && item.comments.length > 0 && (
    <h6>
      <span style={{ fontWeight: '500' }}>{item.comments[0].postedBy.name}</span>
      {item.comments[0].text}
    </h6>
  )}
</div>
          <form onSubmit={(e)=>{
                              e.preventDefault()
                              makeComment(e.target[0].value,item._id)
                            }}>
                            <div class="sm:col-span-4">
          
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              
              <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
            </div>
          </div>
        </div>
                            </form>   
                            
        </div>
      </div>
    </div>
    )
         })
        }
        </div>
  );
};