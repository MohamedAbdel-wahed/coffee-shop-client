import React,{useState} from 'react'
import {gql,useMutation} from '@apollo/client'
import { useTranslation } from 'react-i18next';
import {motion} from 'framer-motion'
import { FaTrashAlt } from 'react-icons/fa'
import RemoveModal from '../RemoveModal';

const REMOVE_ADMIN = gql`
    mutation removeAdmin($username: String!) {
      removeAdmin(username:$username)
    }
  `

function AdminEntry({username,admins,setAdmins}) {

  const { t } = useTranslation()
  const [modal,setModal]= useState(false)

  const [removeAdmin]= useMutation(REMOVE_ADMIN, {
    onCompleted: ()=>  setModal(false)
  })

  const removeEntry= (username)=> {
    const newAdminsList= admins.filter(admin=> admin.username!==username)
    removeAdmin({variables: {username}})
    setAdmins(newAdminsList)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ delay:2, opacity: 1}}
      className="flex items-center justify-between px-10 font-semibold text-gray-800 border-b-2 select-none"
    >
      <div className="px-4 py-2.5">{username}</div>
      <div className="px-4 py-2.5">
        <button
          onClick={() => setModal(true)}
          className="px-2 py-1 text-red-600 focus:text-opacity-70 text-xl focus:outline-none focus:bg-opacity-70"
          title={t("admins.removeBtn")}
        >
          <FaTrashAlt />
        </button>

        {modal && (
          <RemoveModal setModal={setModal} removeEntry={removeEntry} removedKey={username} />
        )}
      </div>
    </motion.div>
  )
}

export default AdminEntry
