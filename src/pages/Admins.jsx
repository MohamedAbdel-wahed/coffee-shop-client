import React,{useState} from 'react'
import {gql,useQuery} from '@apollo/client'
import { useTranslation } from 'react-i18next'
import AdminEntry from '../components/admins/AdminEntry'
import AddAdminModal from '../components/admins/AddAdminModal'


const GET_ADMINS= gql`
    query admins {
        admins {
          username
        }
    }
  `

function Admins() {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const [modal,setModal]= useState(false)
  const [admins,setAdmins]= useState([])
  const { t } = useTranslation()

   useQuery(GET_ADMINS, {
      fetchPolicy: "no-cache",
      onCompleted: (data)=> setAdmins(data.admins)
   })

  return (
    <div className="relative w-full h-screen bg-gray-200 pt-24 pb-8 px-6 flex flex-col items-center overflow-hidden select-none">
      <div className="w-7/12 my-5 flex justify-between">
        <h1 className="text-gray-700 font-bold text-4xl">
          {t("admins.title")}
        </h1>
        <button
          onClick={() => setModal(true)}
          className="px-4 py-1 bg-green-700 text-white text-sm font-semibold focus:outline-none focus:bg-opacity-70 rounded-md"
        >
          {t("admins.addBtn")}
        </button>
        {modal && (
          <AddAdminModal
            setModal={setModal}
            admins={admins}
            setAdmins={setAdmins}
          />
        )}
      </div>
      <div className="w-7/12 h-full flex flex-col py-6 bg-white border border-gray-300 rounded-md shadow-md overflow-x-hidden overflow-scroll">
        {admins.length ? (
          admins.map((admin) => (
            <AdminEntry
              key={admin.username}
              username={admin.username}
              admins={admins}
              setAdmins={setAdmins}
            />
          ))
        ) : (
          <div className="my-12 text-center text-gray-400 text-3xl font-bold">
            {t("admins.noAdmins")}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admins
