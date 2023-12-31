import React, { useEffect, useState } from 'react';
import BackgroundTN from '../../components/BackgroundTN';
import NavBarUser from '../../components/NavBarUser';
import axios from 'axios';
import { Service } from '../../services/Service';
import { toast } from 'react-toastify';

function Admin() {
  const [logins, setLogins] = useState([]);

  const toastConfig = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  useEffect(() => {
    Service.get("/login", (error, data) => {
      if(error) {
        toast.error(error, toastConfig)
      } else {
        setLogins(data);
      }
    })
  }, [])

  return (
    <BackgroundTN title="ADMIN" customStyledApp={"flex flex-col items-center"}>
      <NavBarUser backbtn={true} />

      <section className="w-5/6 h-5/6 rounded-3xl bg-black/50 m-12 flex flex-col items-center">
        <nav className="w-full h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center px-6">
          <div className="w-10/12 flex justify-start">
            <div className="flex justify-center items-center h-full mr-3 ">
              <span className='w-[40px] font-sans font-bold'>id</span>
            </div>
            <div className="flex justify-start items-center h-full mr-3 w-full">
              <span className='font-sans font-bold'>nome</span>
            </div>

            <div className='flex justify-end'>
              <input 
                className='w-30 bg-lime-400 my-1 rounded-2xl pl-1 absolute' 
                type='text'
                placeholder='Nome'
              />
            </div>
          </div>
        </nav>

        <div className='w-full h-full flex justify-center mt-5'>
          <div className='w-5/6 h-5/6 overflow-auto'>
            {logins?.map((login) => (
              <div 
              className='w-full h-10 bg-white rounded-3xl px-6 mt-8'
              key={login?.ID}
              >
                <div className="flex justify-start items-center h-full mr-3 w-full">
                  <div className="flex justify-center items-center h-full mr-3 ">
                    <span className='w-[40px] font-sans truncate'>{login?.id}</span>
                  </div>
                  <div className="flex justify-start items-center h-full mr-3 w-1/3">
                    <span className='font-sans truncate'>{login?.ds_username}</span>
                  </div>
                </div>
              </div> 
            ))}
          </div>
        </div>
      </section>
    </BackgroundTN>
  );
}

export default Admin;