import React,{useState,useEffect,useContext} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'
import {logout} from '../actions/auth'
import { useTranslation } from 'react-i18next'
import {IconContext} from 'react-icons'
import {FaUsers,FaUserSecret} from 'react-icons/fa'
import { AiOutlineShop } from "react-icons/ai"
import {IoFastFoodOutline,IoLogOutOutline} from 'react-icons/io5'
import {CREDENTIALS} from '../env'


function Header() {
  const { authState , dispatch }= useContext(AuthContext)
  const {user} = authState

  const [lang,setLang]= useState('en')
  const { t, i18n } = useTranslation()

  const logoutUser= ()=> {
      dispatch(logout())
      window.location.pathname= '/login'
  }

  const changeLanguage= (language)=> {
    i18n.changeLanguage(language)
  }

  useEffect(()=>{
    setLang(i18n.language)
  },[i18n.language])

  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className={`fixed top-0 w-full h-16 flex items-center px-4 bg-gray-700 text-white z-30 select-none ${!user && 'hidden'}`}>
        <div className="px-5">
          <Link to="/">
            <img
              src="/images/logo.svg"
              className="w-14 h-10 object-cover rounded-full"
              alt="logo"
              title="Cafe"
            />
          </Link>
        </div>
        <ul className="flex-1 flex items-center ml-6 text-xs text-gray-300 font-semibold tracking-wide uppercase">
          {user && user.verified === CREDENTIALS.username && (
            <>
              <li className="px-4">
                <NavLink to="/admins" className="flex items-center">
                  <FaUserSecret />
                  <span className="ml-1">{t("header.admins")}</span>
                </NavLink>
              </li>
              <li className="px-4">
                <NavLink to="/workers" className="flex items-center">
                  <FaUsers />
                  <span className="ml-1">{t("header.workers")}</span>
                </NavLink>
              </li>
            </>
          )}
          <li className="px-4">
            <NavLink to="/products" className="flex items-center">
              <AiOutlineShop />
              <span className="ml-1">{t("header.products")}</span>
            </NavLink>
          </li>
          <li className="px-4">
            <NavLink to="/orders" className="flex items-center">
              <IoFastFoodOutline />
              <span className="ml-1">{t("header.orders")}</span>
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center mx-1 text-xs font-bold text-gray-800">
          <li className="px-3 text-white underline capitalize hidden lg:block">
            {user && user.verified}
          </li>
          <li className="flex items-center mx-7 bg-white rounded-lg overflow-hidden">
            <span
              onClick={() => changeLanguage("ar")}
              className={`${
                lang === "ar" && "bg-green-500 text-white"
              } py-1 px-2 text-center cursor-pointer border-r`}
            >
              {t("header.lang.ar")}
            </span>
            <span
              onClick={() => changeLanguage("en")}
              className={`${
                lang === "en" && "bg-green-500 text-white"
              } py-1 px-2 text-center cursor-pointer`}
            >
              EN
            </span>
          </li>
          <li className="px-1 cursor-pointer">
            <span
              onClick={logoutUser}
              title={t("header.logout")}
              className="cursor-pointer"
            >
              <IoLogOutOutline color="#f1f1f1" size="2em" />
            </span>
          </li>
        </ul>
      </div>
    </IconContext.Provider>
  )
}

export default Header
