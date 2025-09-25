"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
          {currentView === "sign-in" ? "Welcome Back" : "Join Kabiki"}
        </h1>
        <p className="text-gray-600">
          {currentView === "sign-in" 
            ? "Sign in to continue your natural skincare journey" 
            : "Create an account to start your organic soap experience"
          }
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-orange-100 shadow-lg">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
