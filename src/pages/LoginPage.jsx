import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useForm } from '../hooks/useFrom';
import { CircleLoader } from 'react-spinners';
import logo from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import http from '../services/http';
import { Endpoint } from '../constants/API';

export const LoginPage = () => {
  const navigate= useNavigate()
  const {signIn,errorMessage} = useContext(AuthContext)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  

  const formValidation = {
    usuario: [(value) => value.length > 1, 'Ingrese un usuario.'],
    password:[(value) => value.length > 1, 'Ingrese la contraseña.'],
    candidato:[(value) =>value.length > 0, 'Seleccione un Candidato.'],
  };

  const {
    usuario,
    password,
    candidato,
    isFormValid,
    usuarioValid,
    passwordValid,
    candidatoValid,
    onInputChange,
    setFormState,
  } = useForm(
    {
      usuario: "jdcastilla",
      password:"1234567890",
      candidato:'',
    },
    formValidation
  );

  const resetForm=()=>{
    setFormState({
      usuario: "",
      password:"",
      candidato:"",
    })
  }
  useEffect(() => {
    if (errorMessage.length !== 0){
      setError(true)
      setIsLoading(false)
      resetForm()
    };
  }, [errorMessage])

  // useEffect(() => {
  //   if (error) {
  //     const timeoutId = setTimeout(() => {
  //       setError(false);
  //       resetForm()
  //     }, 3000); // 5000 milisegundos = 5 segundos

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [error]);

  const validateForm =(event)=>{
    event.preventDefault();
    setFormSubmitted(true)
    if(!isFormValid)return
    onSubmit()
  }


  const onSubmit = async () => {
    console.log(candidato,password,usuario)
    setIsLoading(true)
    setFormSubmitted(false)
    
    signIn(usuario,password,candidato)
  
    
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
        <img src={logo} className="mb-4 w-44 sm:w-40 md:w-60 lg:w-64 h-auto object-contain" alt="logo" />
        <div className="shadow-2xl p-3 rounded-md w-full sm:w-96 mb-2 mr-2  ">
          <form onSubmit={validateForm}>
          <div className="text-center mb-2 mt-3 text-lg">
            <span className="text-neutral-800 font-bold">Iniciar Sesión</span>
          </div>
            <div className="grid grid-cols-1">
              <div className="mt-2">
                <label className="text-neutral-800 font-medium text-xs" >Usuario</label>
                <input
                  type="text"
                  className={` text-black w-full mt-2 ${formSubmitted && usuarioValid ?'form-control-error':"form-control"} outline-gray-400  `}
                  name="usuario"
                  value={usuario}
                  onChange={onInputChange}
                />
                {formSubmitted && usuarioValid ? <span className='text-red-400 text-xs'>{usuarioValid}</span>:null}
              </div>
            
              
              <div className="mt-2">
                <label className="text-neutral-800 font-medium text-xs">Contraseña</label>
                <input
                  type="password"
                  className={` text-black w-full mt-2 ${formSubmitted && passwordValid ?'form-control-error':"form-control"} outline-gray-400  `}
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                {formSubmitted && passwordValid && <span className='text-red-400 text-xs'>{passwordValid}</span>}
              </div>

              <div className="mt-2">
                <label className="text-neutral-800 font-medium text-xs">
                  Candidato
                </label>

                <select
                  className={`text-black w-full mt-2 ${
                    formSubmitted && candidatoValid
                      ? "form-control-error"
                      : "form-control"
                  } outline-gray-400`}
                  name="candidato"
                  value={candidato}
                  onChange={onInputChange}
                >
                  <option value="">Seleccione un candidato</option>
                  <option value="1">JOSE</option>
                  <option value="2">PRIMARIO</option>
                  <option value="3">ELVER</option>
                  <option value="4">BARRANQUILLA</option>
                </select>

                {formSubmitted && candidatoValid && (
                  <span className="text-red-400 text-xs">
                    {candidatoValid}
                  </span>
                )}
              </div>

              
              <div className="grid grid-cols-1 mb-2 mt-5">
                <div className="col-span-full">
                  <button
                    type="submit"
                    className={`bg-blue-900 rounded-lg w-full py-2 px-4 text-white  hover:bg-blue-950 font-bold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircleLoader color="white" size={20} />
                    ) : (
                      'Entrar'
                    )}
                    
                  </button>
                  {error === true && (
                    <div className="bg-red-600 border border-red-700  px-4 py-3 rounded-lg mt-2 relative text-center text-sm" role="alert">
                      <strong className="font-semibold text-white">Usuario o contraseña incorrecta</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  )

};
