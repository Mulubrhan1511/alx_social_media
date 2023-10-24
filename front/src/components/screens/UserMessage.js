import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../App";
import { useParams } from 'react-router-dom';




const UserMessage = () => {
    const [userProfile,setProfile] = useState(null)
    const { dispatch } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem("user"))
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const [followers, setFollowers] = useState([]);
    const { userId } = useParams();
    const userIdOrNull = userId ?? null;
    const [selectedFollower, setSelectedFollower] = useState(null);
    useEffect(() => {
      if (userId === null) {
        setSelectedFollower(null);
      }
      console.log("selected user id"+selectedFollower)
    }, [userId]);
    useEffect(() => {
      const fetchFollowers = async () => {
        try {
          const response = await fetch(`/followers`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          });
          const data = await response.json();
          console.log("Fetched followers:", data); // Log the fetched data
          setFollowers(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchFollowers();
    }, []);
    useEffect(() => {
        fetch(`/user/${userId}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            console.log("user")
            setProfile(result);
            console.log(result)
          });
      }, [userId]);
      const fetchMessages = async () => {
        try {
          const response = await fetch('/messages', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
      
          const data = await response.json();
          console.log('Messages', data);
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      
      const sendMessage = async () => {
        try {
          let requestBody = {
            content: message,
          };
      
          if (selectedFollower !== null) {
            requestBody.recipientId = selectedFollower;
          } else {
            requestBody.recipientId = userId;
          }
      
          const response = await fetch('/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            throw new Error('Failed to send message');
          }
      
          const data = await response.json();
          console.log('Message sent:', data);
      
          // Clear the input field after sending the message
          setMessage('');
          inputRef.current.value = ''; // Reset the input field using the ref
      
          // Fetch the latest messages after sending a new message
          fetchMessages();
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
    
      useEffect(() => {
        fetchMessages();
      }, [userProfile]);   
  return (
   <>
    {selectedFollower ?
   <div class="flex h-screen antialiased text-gray-800">
   <div class="flex flex-row h-full w-full overflow-x-hidden">
     <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
       
       <div
         class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
       >
         <div class="h-20 w-20 rounded-full border overflow-hidden">
           <img
             src={user.pic}
             alt="Avatar"
             class="h-full w-full"
           />
         </div>
         <div class="text-sm font-semibold mt-2">{user.name}</div>
         <div class="text-xs text-gray-500">Lead UI/UX Designer</div>
         <div class="flex flex-row items-center mt-3">
           <div
             class="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
           >
             <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
           </div>
           <div class="leading-none ml-1 text-xs">Active</div>
         </div>
       </div>
       <div class="flex flex-col mt-8">
         <div class="flex flex-row items-center justify-between text-xs">
           <span class="font-bold">Active Conversations</span>
           <span
             class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
             >4</span
           >
         </div>
         <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
         {followers.map((follower) =>
             messages.some((message) => message.sender._id === follower._id || message.recipient._id === follower._id) ? (
           <button
             class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
             onClick={() => setSelectedFollower(follower)}
           >
             <div
               class="flex items-center justify-center h-8 w-8  rounded-full"
             >
              <img
                       className="h-8 w-8 rounded-full"
                       src={follower.pic}
                       alt=""
                     />
             </div>
             <div class="ml-2 text-sm font-semibold">{follower.name}</div>
             <div
               class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
             >
               2
             </div>
           </button>
           
           ) : null
           )}
         </div>
         
         
       </div>
       
     </div>
     <div class="flex flex-col flex-auto h-full p-6">
     <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 w-full p-4" style={{ height: '50px' }}>
  <div className="flex items-center h-full">
    <img
      src={selectedFollower.pic}
      alt="avatar"
      className="mr-2"
      style={{ width: '40px', height: '40px', borderRadius: '40px' }}
    />
    <h6 className="text-left flex-grow">{selectedFollower.name}</h6>
  </div>
</div>
       <div
         class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-300 h-full p-4"
       >
        
         <div class="flex flex-col h-full overflow-x-auto mb-4">
           <div class="flex flex-col h-full">
           
             <div class="grid grid-cols-12 gap-y-2">
             {messages.map((message) =>
                 message.recipient._id === selectedFollower._id || message.sender._id === selectedFollower._id ? (
                   message.sender._id==user._id?(
               <div class="col-start-1 col-end-8 p-3 rounded-lg">
               
                 <div class="flex flex-row items-center">
                   <div
                     class="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                   >
                    <img
                     src={user.pic}
                     alt="avatar"
                     className="d-flex align-self-center me-3"
                     style={{ width: '60px', height: '40px', borderRadius: '40px' }}
                   />
                   </div>
                   <div
                     class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                   >
                     <div>{message.content}</div>
                   </div>
                 </div>
               </div>
               ):(
               <div class="col-start-6 col-end-13 p-3 rounded-lg">
                 <div class="flex items-center justify-start flex-row-reverse">
                   <div
                     class="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                   >
                     <img
                     src={selectedFollower.pic}
                     alt="avatar"
                     className="d-flex align-self-center me-3"
                     style={{ width: '60px', height: '40px', borderRadius: '40px' }}
                   />
                   </div>
                   <div
                     class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                   >
                     <div>{message.content}</div>
                   </div>
                 </div>
               </div>
               
               )
 
           
         ) : null
       )}
               
               
               
             </div>
           </div>
         </div>
         <div
           class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
         >
           <div>
             <button
               class="flex items-center justify-center text-gray-400 hover:text-gray-600"
             >
               <svg
                 class="w-5 h-5"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   stroke-width="2"
                   d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                 ></path>
               </svg>
             </button>
           </div>
           <div class="flex-grow ml-4">
             <div class="relative w-full">
               <input
                 type="text"
                 class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 ref={inputRef}
               />
               <button
                 class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                 
               >
                 <svg
                   class="w-6 h-6"
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                   ></path>
                 </svg>
               </button>
             </div>
           </div>
           <div class="ml-4">
             <button
               class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
               onClick={sendMessage}
             >
               <span>Send</span>
               <span class="ml-2">
                 <svg
                   class="w-4 h-4 transform rotate-45 -mt-px"
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                   ></path>
                 </svg>
               </span>
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>  
  
  :
  
<>
    {userProfile ?
      
<div class="flex h-screen antialiased text-gray-800">
  <div class="flex flex-row h-full w-full overflow-x-hidden">
    <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      
      <div
        class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
      >
        <div class="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src={user.pic}
            alt="Avatar"
            class="h-full w-full"
          />
        </div>
        <div class="text-sm font-semibold mt-2">{user.name}</div>
        <div class="text-xs text-gray-500">Lead UI/UX Designer</div>
        <div class="flex flex-row items-center mt-3">
          <div
            class="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
          >
            <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
          </div>
          <div class="leading-none ml-1 text-xs">Active</div>
        </div>
      </div>
      <div class="flex flex-col mt-8">
        <div class="flex flex-row items-center justify-between text-xs">
          <span class="font-bold">Active Conversations</span>
          <span
            class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
            >4</span
          >
        </div>
        <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {followers.map((follower) =>
            messages.some((message) => message.sender._id === follower._id || message.recipient._id === follower._id) ? (
          <button
            class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            onClick={() => setSelectedFollower(follower)}
          >
            <div
              class="flex items-center justify-center h-8 w-8  rounded-full"
            >
             <img
                      className="h-8 w-8 rounded-full"
                      src={follower.pic}
                      alt=""
                    />
            </div>
            <div class="ml-2 text-sm font-semibold">{follower.name}</div>
            <div
              class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
            >
              2
            </div>
          </button>
          
          ) : null
          )}
        </div>
        
        
      </div>
      
    </div>
    <div class="flex flex-col flex-auto h-full p-6">
    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 w-full p-4" style={{ height: '50px' }}>
  <div className="flex items-center h-full">
    <img
      src={userProfile.user.pic}
      alt="avatar"
      className="mr-2"
      style={{ width: '40px', height: '40px', borderRadius: '40px' }}
    />
    <h6 className="text-left flex-grow">{userProfile.user.name}</h6>
  </div>
</div>
      <div
        class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-300 h-full p-4"
      >
        <div class="flex flex-col h-full overflow-x-auto mb-4">
          
          <div class="flex flex-col h-full">
         
            <div class="grid grid-cols-12 gap-y-2">
            {messages.map((message) =>
                message.recipient._id === userProfile.user._id || message.sender._id === userProfile.user._id ? (
                  message.sender._id==user._id?(
              <div class="col-start-1 col-end-8 p-3 rounded-lg">
              
                <div class="flex flex-row items-center">
                  <div
                    class="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                  >
                   <img
                    src={user.pic}
                    alt="avatar"
                    className="d-flex align-self-center me-3"
                    style={{ width: '60px', height: '40px', borderRadius: '40px' }}
                  />
                  </div>
                  <div
                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                  >
                    <div>{message.content}</div>
                  </div>
                </div>
              </div>
              ):(
              <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <div class="flex items-center justify-start flex-row-reverse">
                  <div
                    class="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                  >
                    <img
                    src={userProfile.user.pic}
                    alt="avatar"
                    className="d-flex align-self-center me-3"
                    style={{ width: '60px', height: '40px', borderRadius: '40px' }}
                  />
                  </div>
                  <div
                    class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                  >
                    <div>{message.content}</div>
                  </div>
                </div>
              </div>
              
              )

          
        ) : null
      )}
              
              
              
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        >
          <div>
            <button
              class="flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex-grow ml-4">
            <div class="relative w-full">
              <input
                type="text"
                class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                ref={inputRef}
              />
              <button
                class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="ml-4">
            <button
              class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              onClick={sendMessage}
            >
              <span>Send</span>
              <span class="ml-2">
                <svg
                  class="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

   : 
   <div class="flex h-screen antialiased text-gray-800">
  <div class="flex flex-row h-full w-full overflow-x-hidden">
    <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      
      <div
        class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
      >
        <div class="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src={user.pic}
            alt="Avatar"
            class="h-full w-full"
          />
        </div>
        <div class="text-sm font-semibold mt-2">{user.name}</div>
        <div class="text-xs text-gray-500">Lead UI/UX Designer</div>
        <div class="flex flex-row items-center mt-3">
          <div
            class="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
          >
            <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
          </div>
          <div class="leading-none ml-1 text-xs">Active</div>
        </div>
      </div>
      <div class="flex flex-col mt-8">
        <div class="flex flex-row items-center justify-between text-xs">
          <span class="font-bold">Active Conversations</span>
          <span
            class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
            >4</span
          >
        </div>
        <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {followers.map((follower) =>
            messages.some((message) => message.sender._id === follower._id || message.recipient._id === follower._id) ? (
          <button
            class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            onClick={() => setSelectedFollower(follower)}
          >
            <div
              class="flex items-center justify-center h-8 w-8  rounded-full"
            >
             <img
                      className="h-8 w-8 rounded-full"
                      src={follower.pic}
                      alt=""
                    />
            </div>
            <div class="ml-2 text-sm font-semibold">{follower.name}</div>
            <div
              class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
            >
              2
            </div>
          </button>
          
          ) : null
          )}
        </div>
        
        
      </div>
      
    </div>
    <div class="flex flex-col flex-auto h-full p-6">
      
    </div>
  </div>
</div>
  
   }
   </>
  }
   </>
  );
};

export default UserMessage;