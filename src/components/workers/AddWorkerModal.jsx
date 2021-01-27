import React,{useState} from "react"
import ModalTemplate from "../ModalTemplate"
import { useTranslation } from "react-i18next"
import {gql,useMutation} from '@apollo/client'


const ADD_WORKER= gql`
   mutation addWorker($name:String! $job:String! $phone:String!){
     addWorker(name:$name job:$job phone:$phone){
       uuid name phone job createdAt
     }
   }
`

function AddWorkerModal({ setModal, workers,setWorkers }) {
  const { t } = useTranslation()

  const [errors, setErrors] = useState({})

  const [worker, setWorker] = useState({
    name: "",
    job: "",
    phone: ""
  })

  const [addWorker, { loading }] = useMutation(ADD_WORKER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      setErrors({})
      const newWorkers = [...workers, data.addWorker] 
      setWorkers(newWorkers)
      setModal(false)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addWorker({ variables: worker })
  }

  return (
    <ModalTemplate
      setModal={setModal}
      title={t("workers.workerModal.addTitle")}
    >
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("workers.workerModal.namePlaceholder")}
            value={worker.name}
            onChange={(e) => setWorker({ ...worker, name: e.target.value })}
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
            value={worker.job}
            onChange={(e) => setWorker({ ...worker, job: e.target.value })}
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
            value={worker.phone}
            onChange={(e) => setWorker({ ...worker, phone: e.target.value })}
          />
          {errors.phone && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        <button className="w-full my-3 py-2.5 px-4 text-sm text-white bg-red-500 rounded-full focus:outline-none uppercase focus:bg-opacity-80 tracking-wide">
          {t(`${loading ? "loading" : "workers.workerModal.createBtn"}`)}
        </button>
      </form>
    </ModalTemplate>
  )
}

export default AddWorkerModal
