import React, { useEffect, useState} from 'react';
import NavBarUser from '../../components/NavBarUser';
import axios from 'axios';
import { toast } from 'react-toastify';


function Acessos() {
  const [pessoas, setPessoas] = useState([]);
  const [totalPessoas, setTotalPessoas] = useState(0);

  const BASE_URL = "http://localhost:8080"
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios.get(`${BASE_URL}/pessoas/sistemas`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        const [pessoasArray, total] = response.data;
        setPessoas(pessoasArray);
        setTotalPessoas(total);
      })
      .catch((err) => {
        toast.error(err.data, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
  }, [token])

  return (
    <div className="login-background">
      <span className='title-technipo'>ACESSOS</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser backbtn={true}/>

        <section className="w-5/6 h-5/6 rounded-3xl bg-black/50 m-12 flex flex-col items-center">
          <nav className="w-full h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center">
            <div className="w-10/12 flex justify-start pl-6 pr-6">

              <div className="flex justify-center items-center h-full mr-3 ">
                <span className='w-[40px] font-sans font-bold'>id</span>
              </div>

              <div className="flex justify-start items-center h-full mr-3 w-1/3">
                <span className='font-sans font-bold'>nome</span>
              </div>

              <div className="flex justify-start items-center h-full ml-3 mr-3 w-2/3">
                <span className='font-sans font-bold'>acessos</span>
              </div>

            </div>
          </nav>

          {pessoas && pessoas.map((pessoa) => (
            <div className='mt-8 w-10/12 h-10 bg-white rounded-2xl pl-6 pr-6'>
              <div key={pessoa.ID} className="flex justify-start items-center h-full ml-3 mr-3 w-full">
                <div className="flex justify-center items-center h-full mr-3 ">
                  <span className='w-[40px] font-sans'>{pessoa.ID}</span>
                </div>
                <div className="flex justify-start items-center h-full mr-3 w-1/3">
                  <span className='font-sans'>{pessoa.NOME}</span>
                </div>
                <div className="flex justify-start items-center h-full ml-3 mr-3 w-2/3">
                  <span className='font-sans'>{pessoa.SISTEMA}</span>
                </div>
              </div>

            </div>
          ))}
          
        </section>
      </div>
    </div>
  )
}

export default Acessos;