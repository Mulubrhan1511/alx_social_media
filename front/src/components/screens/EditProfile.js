import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState(user.name || "");
    const [firstname,setFirstName] = useState(user.firstname || "")
    const [email,setEmail] = useState(user.email || "")
    const [location,setLocation] = useState(user.location || "")
    const [cohort,setCohort] = useState(user.cohort || "")
    const [gender,setGender] = useState(user.gender || "")
    const navigate = useNavigate();

   // Assuming you have imported and set up the useDispatch hook

  function editProfile() {
    fetch("/editprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name, // Updated name value from input field or variable
        cohort, // Updated email value from input field or variable
        gender,
        location,
        firstname,
        email // Updated gender value from input field or variable
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const updatedUser = {
          ...user,
          name:name, // Update the name property with the updated value
          cohort,  // Update the email property with the updated value
          gender,
          location,
          firstname,
          email // Update the gender property with the updated value
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/profile1");
        //dispatch({ type: "UPDATEPIC", payload: result.data.url }); // Assuming `data.url` contains the updated profile picture URL
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
        <div class="w-full md:max-w-2xl mx-auto pt-12 pb-48">


<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


    <div class="w-full p-4 flex justify-center pb-16">
        <h2 class="text-sky-700 xl:text-3xl font-bold md:text-2xl sm:text-xl">{user.name} Profile</h2>
    </div>



    <div class="flex flex-col md:flex-row justify-between mb-4">
        <div class="profile-picture mb-4 md:mb-0">
            <img src={user.pic} alt="Profile Picture"
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
                    id="name" type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                Username
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="user--0001"
                value={name} // Use the name state variable here
                onChange={(e) => setName(e.target.value)} // Use setName as the onChange handler
            />
            </div>



            




            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                    Email
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="text" placeholder="che@alustudent.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>


            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">
                    Cohort
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="major" type="text" placeholder="BSE M2022" value={cohort}  onChange={(e) => setCohort(e.target.value)}/>
            </div>



            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
                    Gender
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gender" type="text" value={gender} placeholder="Male" onChange={(e) => setGender(e.target.value)}/>
            </div>




            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
                    Study Location
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address" type="text" placeholder="Addis Ababa Hub" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>





        </div>
    </div>
    <div class="flex items-center justify-end">
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" id="saveButton"
            onClick={()=>editProfile()}
            >
            Save Changes
        </button>
    </div>
</form>
</div>
    </div>
  )
}

export default EditProfile;