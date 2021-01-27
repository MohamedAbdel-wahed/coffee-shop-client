import React,{useState} from "react"
import ModalTemplate from "../ModalTemplate"
import { useTranslation } from "react-i18next"
import {gql,useMutation} from '@apollo/client'


const EDIT_WORKER= gql`
   mutation updateWorker($uuid:String! $name:String! $job:String! $phone:String!){
     updateWorker(uuid:$uuid name:$name job:$job phone:$phone){
       uuid name phone job createdAt
     }
   }
`

function EditWorkerModal({ setModal, worker, workers, setWorkers }) {
  const { t } = useTranslation()

  const [errors,setErrors]= useState({}) 

  const [updatedWorker,setUpdatedWorker]= useState(worker) 

  const [editWorker,{loading}]= useMutation(EDIT_WORKER,{
      onError: (err)=> setErrors(err.graphQLErrors[0].extensions.errors),
      onCompleted(data) {
        setErrors({})
        const workerIndex= workers.findIndex(item=> item.uuid===worker.uuid)
        workers[workerIndex]= data.updateWorker
        setWorkers([...workers])
        setModal(false)
      }
    })
  
  const handleSubmit= (e)=> {
      e.preventDefault()
      editWorker({variables: updatedWorker})
  }

  return (
    <ModalTemplate
      setModal={setModal}
      title={t("workers.workerModal.editTitle")}
    >
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
                placeholder={t("workers.workerModal.namePlaceholder")}
                value={updatedWorker.name}
                onChange={(e) => setUpdatedWorker({ ...updatedWorker, name: e.target.value })}
              />
              {errors.name && (
                <p className="mt-1 ml-2 text-xs text-red-600">{errors.name}</p>
              )}
        </div>

        <div className="my-3">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("workers.workerModal.jobPlaceholder")}
            value={updatedWorker.job}
            onChange={(e) => setUpdatedWorker({ ...updatedWorker, job: e.target.value })}
          />
          {errors.job && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.job}</p>
          )}
        </div>

        <div className="my-3">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("workers.workerModal.phonePlaceholder")}
            value={updatedWorker.phone}
            onChange={(e) => setUpdatedWorker({ ...updatedWorker, phone: e.target.value })}
          />
          {errors.phone && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        <button className="w-full my-3 py-2.5 px-4 text-sm text-white bg-red-500 rounded-full focus:outline-none uppercase focus:bg-opacity-80 tracking-wide">
          {t(
              `${
                loading
                  ? "loading"
                  : "workers.workerModal.updateBtn"
              }`
            )}
        </button>
      </form>
    </ModalTemplate>
  )
}

export default EditWorkerModal
