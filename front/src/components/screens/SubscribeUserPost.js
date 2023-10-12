import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const Home = ()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/subpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])
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
      
    return(
        <div className="home">
            {
                data.map(item=>{
                    return (
                        <div className="card home-card" key={item._id}>
                        <h5 style={{padding:"6px"}}><Link to={item.postedBy._id !== user._id?"/profile/"+item.postedBy._id:"/profile/" }>{item.postedBy.name}</Link>{item.postedBy._id === user._id 
                        && <button
                        className="btn-floating btn-small waves-effect waves-light red"
                        style={{ float: "right" }}
                        onClick={() => deletePost(item._id)}
                      >
                        <i className="material-icons">delete</i>
                      </button>
                        }</h5>
                        <div className="card-image"> 
                            <img alt="" src={item.photo} />
                        </div>
                        <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                        {item.likes.includes(user._id) ? (
                          <button className="unlike-button" onClick={() => unlikepost(item._id)}>
                            <i className="material-icons">thumb_down</i>
                          </button>
                        ) : (
                          <button className="like-button" onClick={() => likepost(item._id)}>
                            <i className="material-icons">thumb_up</i>
                          </button>
                        )}
                        <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                              item.comments.map(record=>{
                                return(
                                  <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{record.text}</h6>
                                )
                              })
                            }
                            <form onSubmit={(e)=>{
                              e.preventDefault()
                              makeComment(e.target[0].value,item._id)
                            }}>
                            <input type="text" placeholder="add a comment"/>
                            </form>
                            
                        </div>
                    </div>
                    )
                })
            }
            
            
        </div>
    )}

export default Home;