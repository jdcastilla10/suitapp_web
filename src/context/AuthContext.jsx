import React, { createContext,useReducer,useEffect } from 'react';
import http from '../services/http'
import { Endpoint } from '../constants/API';
import { AuthReducer } from './AuthReducer';



const authInitialState={
    status:"checking",
    token:null,
    errorMessage:"",
    user:""
}


 const AuthContext = createContext({});
 export {AuthContext};

export const AuthProvider = ({children})=>{

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async()=>{

        const token = localStorage.getItem('token');
        console.log('tokendf',token)

        if (!token) return dispatch({type:'notAuthenticated'})
            dispatch({
                type:'signUp',
                payload:{
                    token:token,
                    user:{},
                }
            })

    };
    const [state, dispatch] = useReducer(AuthReducer, authInitialState )


    const signIn = async (correo,password,idCandidato)=>{
        
        const data={
            'usuario':correo,
            'contrasena':password,
            'idCandidato':idCandidato,
        }
        console.log('data',data)
        try {
            const resp = await http('post',Endpoint.login,data)
            console.log({resp})
            if(resp.success === true){

                localStorage.setItem('token',resp.token)
                localStorage.setItem('user',JSON.stringify(resp.user))
                localStorage.setItem('idCandidato',String(idCandidato))
                dispatch({
                    type:'signUp',
                    payload:{
                        token:resp.token,
                        user:resp.user,
                    }
                })
    
                
            }else{
                dispatch({
                    type:'addError',
                    payload:resp.errors|| 'Usuario o Contraseña incorrecta',
                })
            }
            

        } catch (error) {
            console.log('errorToken',error)
            console.log(error.response?.data?.errors)
            dispatch({
                type:'addError',
                payload:error.response?.data?.errors || 'Hable con el administrador',
            })
        }
    }


    const signUp = ()=>{}

 
    const logOut = async(usuario)=>{
        const data={
            'usuario':usuario
        }
        const resp = await http('post',Endpoint.logout,data)
            console.log({resp})
            if(resp.success === true){
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    localStorage.removeItem('idCandidato')
                    dispatch({type:'logout'})
            }else{
                dispatch({
                    type:'notCloseSesion',
                    payload:resp.errors|| 'No fue posible cerrar sesion',
                })
            }
        
        
    }

    const removeError = ()=>{
        dispatch({
            type:'removeError'
        })
    }

    


    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}