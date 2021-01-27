import React,{useState,useContext,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {gql,useLazyQuery} from '@apollo/client'
import {motion} from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext'
import { login } from '../actions/auth'
import { useTranslation } from 'react-i18next';


const LOGIN_USER= gql`
    query login($username: String! $pwd: String!) {
        login(username:$username pwd:$pwd){
            username token
        }
    }
  `

function LoginCard() {
  const { i18n } = useTranslation();
  const { dispatch }= useContext(AuthContext)
  const [errors,setErrors]= useState({}) 
  const [cred, setCred] = useState({
    username: "",
    pwd: "",
  })

  const [loginUser, {loading}]= useLazyQuery(LOGIN_USER, {
      onError(err){
          setErrors(err.graphQLErrors[0].extensions.errors)
      },
      onCompleted(data){
        setErrors({})
        dispatch((login({...data.login})))
        localStorage.setItem('token', data.login.token)
        window.location.pathname="/"
      }
  })

  const handleSubmit= (e)=> {
      e.preventDefault()
      loginUser({variables: cred})
  }

  useEffect(()=>{
    i18n.changeLanguage("en")
  },[i18n])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="-mt-20 px-5 sm:px-8 py-6 sm:py-8 bg-black bg-opacity-50 z-30 rounded-lg shadow-lg select-none"
    >
      <h1 className="my-3 text-white text-lg sm:text-xl font-semibold text-center uppercase">
        Login to Your Account
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-5 flex flex-col items-center"
      >
        <div className="my-2 w-full">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none border-2 border-gray-200 focus:border-yellow-500 rounded-full "
            placeholder="username"
            value={cred.username}
            onChange={(e) => setCred({ ...cred, username: e.target.value })}
          />
          {errors.username && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.username}</p>
          )}
        </div>
        <div className="my-2 w-full">
          <input
            type="password"
            className="w-full px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none border-2 border-gray-200 focus:border-yellow-500 rounded-full "
            placeholder="********"
            value={cred.pwd}
            onChange={(e) => setCred({ ...cred, pwd: e.target.value })}
          />
          {errors.pwd && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.pwd}</p>
          )}
        </div>
        <button className="w-full my-7 py-2.5 px-4 text-white bg-red-500 rounded-full focus:outline-none uppercase tracking-wide">
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="-mt-4 text-white text-center text-xs">
          @2021 coffee shop
        </div>
      </form>
    </motion.div>
  )
}

export default withRouter(LoginCard)
