import React, { useState, useContext } from "react";
import {SocketContext} from '../utils/Socket';

function ProfilePage({ gamesWon, userName }) {
  const socket = useContext(SocketContext);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [cycleUpdateForm, setCycleUpdateForm] = useState(true);
  const [currentUserName, setCurrentUserName] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");

  const openForm = () => {
    setShowUpdateForm(true)
  }
  const submitChanges = () => {
    // Create socket.on() for backend with same string.

    if (cycleUpdateForm) {
      socket.emit("update password", {
        currentPassword,
        updatedPassword
      })
      setShowUpdateForm(false)
    } else {
      socket.emit("update userName", {
        currentUserName,
        updatedUserName
      })
      setShowUpdateForm(false)
    }
  }

  const cycleForm = () => {
    setCycleUpdateForm(!cycleUpdateForm)
  }

  return (
    <div className="">
      <div className="text-xl uppercase" style={{color:"#ECBE07"}}>{userName}</div>
      <p>Total Wins: {gamesWon}</p> 

      {showUpdateForm ?
        <>
          {cycleUpdateForm ?
            <>
            <form>
              <div class="mb-6">
                <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                <input type="password" id="new-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>
              <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>
              <button onClick={submitChanges} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </form>
            <button className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={cycleForm}>
              Update Username
            </button>
            </>
          :
            <div>
              <form>
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Username</label>
                  <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                </div>
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Email</label>
                  <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <button onClick={submitChanges} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
              </form>
              <button className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={cycleForm}>
                Update Password
              </button>
            </div>
          }
        </>
      : 
        <button 
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-10 mb-2"
          onClick={openForm}
        >
          Update Username or Password
        </button>
      }   
    </div>
  );
}

export default ProfilePage;
