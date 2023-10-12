import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { TrashIcon } from '@heroicons/react/24/outline';

export const Profile1 = () => {
  const [mypics, setPics] = useState([]);
  const { dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const postId = postIdToDelete ? postIdToDelete.toString() : '';

  useEffect(() => {
    fetch('/mypost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
        setData(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'insta-clone');
      data.append('cloud_name', 'dhw1mueq4');
      fetch('https://api.cloudinary.com/v1_1/dhw1mueq4/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch('/updatepic', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              const updatedUser = { ...user, pic: data.url };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              dispatch({ type: 'UPDATEPIC', payload: data.url });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image, dispatch, user]);

  const deletePost = () => {
    if (postIdToDelete) {
      console.log('Deleting post with ID:', postIdToDelete);
  
      const postId = String(postIdToDelete._id); // Get the ID property and convert it to a string
  
      fetch(`/deletepost/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.error) {
            console.log(result.error);
          } else {
            setPics(mypics.filter((item) => item._id !== postId)); // Update mypics state
            setData(data.filter((item) => item._id !== postId)); // Update data state
            console.log('Post deleted successfully');
          }
        })
        .catch((err) => {
          console.log(err);
        });
  
      setPostIdToDelete(''); // Reset the postIdToDelete state
      setShowModal(false); // Close the modal
    }
  };

  const updatePhoto = (file) => {
    setImage(file);
  };

  const toggleModal = (postId) => {
    setPostIdToDelete(postId);
    setShowModal(!showModal);
  };
  return (
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
                <img alt="..." src={user ? user.pic : "loading"} class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div class="py-6 px-3 mt-32 sm:mt-0">
                <a href="/editprofile">
                <button class="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button"
                
                >
                  Edit
                </button>
                </a>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-1">
              <div class="flex justify-center py-4 lg:pt-4 pt-8">
                
                <div class="mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user ? user.followers.length : 0} </span><span class="text-sm text-blueGray-400">Followers</span>
                </div>
                <div class="mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user ? user.following.length : 0} </span><span class="text-sm text-blueGray-400">Following</span>
                </div>
                <div class="lg:mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{mypics.length || 0}</span><span class="text-sm text-blueGray-400">Posts</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-12">
            <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
            {user ? user.name : "loading"}
            </h3>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i class="far fa-envelope mr-2 text-lg text-blueGray-400"></i>
              {user ? user.email : "loading"}
            </div>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              Los Angeles, California
            </div>
           
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>ALX Software engineering
            </div>
          </div>
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                </p>
                <a href="#pablo" class="font-normal text-pink-500">Show more</a>
              </div>
            </div>
          </div>
          
          <div class="grid-cols-1 sm:grid md:grid-cols-3 ">
          {mypics.map((item) => {
             return (
  <div
    class="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
    <div className="flex items-center">
  <img
    className="h-8 w-8 rounded-full mr-2"
    src={item.postedBy.pic}
    alt=""
  />
  <h6 style={{ margin: '10px 0', fontWeight: 'normal' }} className="font-mono text-sm font-bold dark:text-black text-purple-600">
  {item.postedBy.name}
</h6>
  <div className="ml-auto">
    <button
      type="button"
      className="relative rounded-full p-1 text-black-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-white"
      onClick={() => toggleModal(item)}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">Liked</span>
      <TrashIcon className="h-6 w-6" aria-hidden="true" />
    </button>
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
    {showModal && (
      <div
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-red-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this post?{item.body}
                </h3>
                <button
            onClick={deletePost}
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
                  Yes, I'm sure
                </button>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  </div>
  );
})}
  
  
</div>
        </div>
      </div>
    </div>
    
  </section>

    </div>
  )
}
