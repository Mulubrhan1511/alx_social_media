import React, { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

export const Create = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
            fetch("/creatpost", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
                body: JSON.stringify({ 
                    title, 
                    body,
                    pic:url
                 }),
              })
                .then(res => res.json())
                .then(data => {
                  
                  if (data.error) {
                    
                  } else {
                   
                    navigate("/");
                  }
                });
        }
    },[url])
    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","dhw1mueq4")
        fetch("https://api.cloudinary.com/v1_1/dhw1mueq4/image/upload",{
            method:'POST',
            body:data
        })
        .then((res)=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
  return (
    <div>
        <main class="bg-gray-100 font-family-karla flex my-4 mx-12 pb-24">
    <div class="w-full h-[70vh] overflow-x-hidden border-t flex flex-row">
        
        <section class="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-sky-600 mt-20">
            <h1 class="text-xl font-bold text-white capitalize dark:text-white">Club Post</h1>
            
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-white dark:text-gray-200" for="username">Title</label>
                        <input id="username" type="text" name="name" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-200 dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>

                    

                    <div>
                        <label class="text-white dark:text-gray-200" for="discription">Post
                            Discription</label>
                        <textarea id="textarea" name="discripton" type="textarea" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md dark:bg-gray-200 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-white">
                            Club Image
                        </label>
                        <div
                            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div class="mb-3">
                                <label for="image" class="form-label">Image</label>
                                <input type="file" class="form-control" id="image" name="image" onChange={(e)=>setImage(e.target.files[0])} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end mt-6">
                    <button
                        onClick={()=>postDetails()}
                        class="px-6 py-2 leading-5 font-bold text-gray-800 transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-white focus:outline-none focus:bg-gray-400">
                        Create Post </button>
                </div>
            
        </section>
    </div>
</main>
    </div>
  )
}
