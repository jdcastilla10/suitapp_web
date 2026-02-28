import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom';

const Navbar = ({error, user}) => {
  const {logOut,errorMessage} = useContext(AuthContext)
  const navigate= useNavigate()
 
  const [timeError, setTimeError] = useState(false)

  

useEffect(() => {
    if (timeError) {
      const timeoutId = setTimeout(() => {
        error(false);
        setTimeError(false)
      }, 3000); // 5000 milisegundos = 5 segundos

      return () => clearTimeout(timeoutId);
    }
  }, [timeError]);

  useEffect(() => {
    if (errorMessage.length !== 0){
      setTimeError(true)
      error(true)
    };
  }, [errorMessage])

  const cerrarSesion = async () => {   
      logOut(user?.usuario)
      navigate("/")
  }


  return (
    <nav className="bg-blue-950 p-4 flex justify-between items-center">
      <button className="flex items-center"
        onClick={() =>navigate("/")}
      >
        <img
          src={logo}
          alt="User"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="flex flex-col">
          <span className="text-white text-xs">Bienvenid@</span>
          <span className="text-white text-sm font-semibold">{user.nomUsusario}</span>

        </div>
      </button>
      {
        user.usuario==='ematinez'?
        <button
        className="text-white py-2 px-4 text-sm"
        onClick={() =>navigate("/reporte")}
      >
        Descargar Reporte
      </button>:null
      }
      <button
        className="text-white py-2 px-4 text-sm"
        onClick={() =>navigate("/consultaReportes")}
      >
        Consulta Reportes
      </button>
      <button
        className="text-white py-2 px-4 text-sm"
        onClick={cerrarSesion}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
