import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './context/AuthContext'



export const App = () => {

  const AppState= ({children}) =>{
    return(
      <AuthProvider>
          {children}
      </AuthProvider>
    )
  }
  return (
    <AppState>
      <AppRouter/>
    </AppState>
  )
}
