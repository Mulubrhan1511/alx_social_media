import React from 'react'

const EditProfile = () => {
  return (
    <div>
        <div class="w-full md:max-w-2xl mx-auto pt-12 pb-48">


<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


    <div class="w-full p-4 flex justify-center pb-16">
        <h2 class="text-sky-700 xl:text-3xl font-bold md:text-2xl sm:text-xl">Chernet's Profile</h2>
    </div>



    <div class="flex flex-col md:flex-row justify-between mb-4">
        <div class="profile-picture mb-4 md:mb-0">
            <img src="../static/img/IMG_1035.jpeg" alt="Profile Picture"
                class="rounded-full w-[25vh] h-[25vh] mx-auto md:mx-0" />
            <div class="image-options mt-2 flex justify-around">
                <button class="btn-delete py-2 px-4 rounded bg-red-500 text-white"
                    type="button">Delete</button>
                <button class="btn-change py-2 px-4 rounded bg-blue-500 text-white"
                    type="button">Change</button>
            </div>
        </div>
        <div class="data-list">
           

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                    Full Name
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name" type="text" placeholder="Chernet Asmamaw" />
            </div>


            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                    Username
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="user--0001" />
            </div>



            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                    Password
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="text" placeholder="***********" />
            </div>




            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                    Email
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="text" placeholder="che@alustudent.com" />
            </div>


            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                    Major
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="major" type="text" placeholder="BSE M2022" />
            </div>



            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
                    Gender
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gender" type="text" placeholder="Male" />
            </div>




            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
                    Study Location
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address" type="text" placeholder="Addis Ababa Hub" />
            </div>





        </div>
    </div>
    <div class="flex items-center justify-end">
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" id="saveButton">
            Save Changes
        </button>
    </div>
</form>
</div>
    </div>
  )
}

export default EditProfile;