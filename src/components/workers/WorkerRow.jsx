import React,{useState} from 'react'
import {FaEdit,FaTrashAlt} from 'react-icons/fa'
import EditWorkerModal from './EditWorkerModal'
import RemoveModal from '../RemoveModal'
import { useTranslation } from 'react-i18next'
import {gql,useMutation} from '@apollo/client'
import {motion} from 'framer-motion'


const REMOVE_WORKER= gql`
    mutation removeWorker($uuid:String!) {
      removeWorker(uuid:$uuid)
    }
`

function WorkerRow({worker,workers,setWorkers}) {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const {uuid,name,job,phone,createdAt}= worker

  const { t } = useTranslation()

  const [editModal,setEditModal]= useState(false)
  const [removeModal,setRemoveModal]= useState(false)

  const [deleteWorker]= useMutation(REMOVE_WORKER,{
      onCompleted: ()=> setRemoveModal(false)
  })

  const removeWorker= (key)=> {
    const newWorkersList= workers.filter(worker=> worker.uuid!==key)
    deleteWorker({variables: {uuid: key}})
    setWorkers(newWorkersList)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-around border-b border-gray-300"
    >
      <span className="text-sm p-3 w-3/12 flex justify-center items-center text-gray-800 border-r break-words">
        {name}
      </span>
      <span className="text-sm p-3 w-3/12 flex justify-center items-center text-gray-800 border-r break-words">
        {job}
      </span>
      <span className="text-sm p-3 w-2/12 flex justify-center items-center text-gray-800 border-r break-words">
        {phone}
      </span>
      <span className="text-sm py-3 w-2/12 flex justify-center items-center text-gray-800 border-r">
        {createdAt}
      </span>
      <span className="p-3 w-2/12 flex justify-center items-center space-x-4 text-gray-800">
        <button
          onClick={() => setEditModal(true)}
          className="p-1.5 bg-blue-300 text-blue-600 focus:outline-none bg-opacity-60 focus:bg-opacity-100 rounded-full"
          title={t("workers.editBtn")}
        >
          <FaEdit />
        </button>

        <button
          onClick={() => setRemoveModal(true)}
          className="p-1.5 bg-red-300 text-red-600 focus:outline-none bg-opacity-60 focus:bg-opacity-100 rounded-full"
          title={t("workers.removeBtn")}
        >
          <FaTrashAlt />
        </button>
      </span>

      {editModal && (
        <EditWorkerModal
          setModal={setEditModal}
          worker={worker}
          setWorkers={setWorkers}
          workers={workers}
        />
      )}

      {removeModal && (
        <RemoveModal
          setModal={setRemoveModal}
          removeEntry={removeWorker}
          removedKey={uuid}
          name={name}
        />
      )}
    </motion.div>
  )
}

export default WorkerRow
