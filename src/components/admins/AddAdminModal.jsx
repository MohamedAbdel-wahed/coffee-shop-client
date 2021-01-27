import React,{useState} from 'react'
import {gql,useMutation} from '@apollo/client'
import { useTranslation } from "react-i18next"
import ModalTemplate from '../ModalTemplate'


const ADD_ADMIN= gql`
    mutation addAdmin($username: String! $pwd: String!) {
      addAdmin(username:$username pwd:$pwd){
          username
        }
    }
  `

function AddAdminModal({setModal,admins,setAdmins}) {
  const { t } = useTranslation();
  const [errors,setErrors]= useState({}) 
  const [cred, setCred] = useState({
    username: "",
    pwd: "",
  })
  
  const [addAdmin, { loading }] = useMutation(ADD_ADMIN, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      setErrors({})
      setAdmins([...admins, { username: data.addAdmin.username }])
      setModal(false)
    },
  })

  const handleSubmit= (e)=> {
      e.preventDefault()
      if(localStorage.getItem('token')){
          addAdmin({variables: cred})
      }
      else{
        window.location.pathname="/login"
      }
  }

  return (
    <ModalTemplate setModal={setModal} title={t("admins.addAdminModal.title")}>
      
      <form onSubmit={handleSubmit} className="mt-8 px-4">
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none border border-gray-200 focus:border-yellow-500 rounded-full"
            placeholder={t("admins.addAdminModal.namePlaceholder")}
            value={cred.username}
            onChange={(e) => setCred({ ...cred, username: e.target.value })}
          />
          {errors.username && (
            <p className="w-full mt-1 ml-3 text-xs text-red-600 text-left">
              {errors.username}
            </p>
          )}
        </div>
        <div className="my-3 w-full flex flex-col items-center">
          <input
            type="password"
            className="w-full px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none border border-gray-200 focus:border-yellow-500 rounded-full"
            placeholder={t("admins.addAdminModal.pwdPlaceholder")}
            value={cred.pwd}
            onChange={(e) => setCred({ ...cred, pwd: e.target.value })}
          />
          {errors.pwd && (
            <p className="w-full mt-1 ml-3 text-xs text-red-600 text-left">
              {errors.pwd}
            </p>
          )}
        </div>
        <button className="w-full my-4 py-2.5 px-4 text-sm text-white bg-red-500 rounded-full focus:outline-none uppercase tracking-wide">
          {t(
            `${
              loading
                ? "loading"
                : "admins.addAdminModal.createBtn"
            }`
          )}
        </button>
      </form>
    </ModalTemplate>
  )
}

export default AddAdminModal
