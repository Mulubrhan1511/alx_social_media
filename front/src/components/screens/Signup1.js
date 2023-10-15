import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

export const Signup1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])
  const uploadPic = (()=>{
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
  })
  const uploadFields=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
        M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
        return
    }
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, email, pic:url}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          navigate("/signin");
        }
      });
  }
  const PostData = () => {
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
  };
  return (
    <div>
        <section class="bg-gray-50 mt-32">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
                  Create and account
              </h1>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">User Name</label>
                <input type="email" name="email" id="email" class="bg-white border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={(e) => setName(e.target.value)}  required="" />
            </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Your email</label>
                <input type="email" name="email" id="email" class="bg-white border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} required="" />
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-white border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} required="" />
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Confirm password</label>
                    <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-white border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setConfirmPassword(e.target.value)}required="" />
            </div>

            <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-2">
                    <svg class="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-1 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={(e)=>setImage(e.target.files[0])}/>
            </label>
        </div>

                  <div class="flex items-start">
                        <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                        </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"  onClick={() => PostData()}>Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
             
          </div>
      </div>
  </div>
</section>
    </div>
  )
}
