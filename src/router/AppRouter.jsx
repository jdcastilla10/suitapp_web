import React, { useContext } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from '../pages/LoginPage'
import { ListaConsultas } from '../pages/ListaConsultas'
import { CircleLoader } from 'react-spinners';
import { AuthContext } from '../context/AuthContext'
import { ListaVotantes } from '../pages/ListaVotantes';
import { ReporteVotantes } from '../pages/ReporteVotantes';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

  const { status,user } = useContext(AuthContext);
  console.log({status})

  if (status === 'checking'){
    return <CircleLoader color="white" size={20} />
  }
    return (
        // se listan las rutas de la app
        
         <Routes>
            {
              (status === 'not-authenticated')
              ? <Route path="/*" element={<LoginPage/>}/>
              :<>
                 <Route path="/*" element={<ListaConsultas/>}/>
                 <Route path="/votante" element={<ListaVotantes/>}/>
                 <Route 
                  path="/reporte" 
                  element={
                    <PrivateRoute 
                      allowedUser="ematinez" 
                      user={user}
                    >
                      <ReporteVotantes/>
                    </PrivateRoute>
                  } 
            />

          </>
              
            }
            <Route path="/*" element={<LoginPage/>} />
              
              
          </Routes>
      )
}



