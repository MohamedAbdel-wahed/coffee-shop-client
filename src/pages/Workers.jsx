import React,{useState} from 'react'
import { useTranslation } from 'react-i18next';
import {gql,useQuery} from '@apollo/client'
import WorkerRow from '../components/workers/WorkerRow';
import AddWorkerModal from '../components/workers/AddWorkerModal'
import NoItemsFound from '../components/NoItemsFound';


const GET_WORKERS = gql`
  query workers {
    workers {
      uuid name phone job createdAt
    }
  }
`

function Workers() {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const { t } = useTranslation();

  const [workers,setWorkers]= useState([])
  const [searchTerm,setSearchTerm]= useState("")
  const [addModal,setAddModal]= useState(false)

  const {loading}= useQuery(GET_WORKERS, {
      fetchPolicy: "no-cache",
      onCompleted: (data)=> data && setWorkers(data.workers)
  })

  return (
    <div className="relative w-full h-screen pt-16 pb-3 px-8 bg-gray-100 flex flex-col items-center overflow-hidden select-none">
      <div className="w-full flex justify-between pt-10 pb-4 space-x-96">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-gray-700 text-sm border border-gray-300 focus:outline-none focus:border-blue-300 rounded-md placeholder-gray-500 placeholder-opacity-50"
          placeholder={t("workers.searchPlaceholder")}
        />
        <button
          onClick={() => setAddModal(true)}
          className="px-4 py-2 text-sm font-bold capitalize text-white bg-green-500 focus:outline-none focus:bg-opacity-70 rounded-lg"
        >
          {t("workers.addBtn")}
        </button>
      </div>
      {addModal && (
        <AddWorkerModal
          setModal={setAddModal}
          workers={workers}
          setWorkers={setWorkers}
        />
      )}
      <div className="w-full flex border-b-2 border-gray-300 bg-gray-300 text-gray-800 font-bold shadow-md rounded-tr-md rounded-tl-md">
        <span className="py-3 w-3/12 text-center border-r">
          {t("workers.table.name")}
        </span>
        <span className="py-3 w-3/12 text-center border-r">
          {t("workers.table.job")}
        </span>
        <span className="py-3 w-2/12 text-center border-r">
          {t("workers.table.phone")}
        </span>
        <span className="py-3 w-2/12 text-center border-r">
          {t("workers.table.joined")}
        </span>
        <span className="py-3 w-2/12 text-center">
          {t("workers.table.actions")}
        </span>
      </div>
      <div className="w-full h-full pb-1 border flex flex-col border-gray-300 bg-white rounded-br-md rounded-bl-md shadow-md overflow-x-hidden overflow-scroll">
        {loading ? (
          <div className="my-28 text-gray-500 font-bold text-3xl text-center">
            {t("loading")}
          </div>
        ) : workers && workers.length ? (
          workers
            .filter((worker) =>
              searchTerm !== ""
                ? worker.name.toLowerCase().match(searchTerm.toLowerCase())
                : worker
            )
            .map((worker) => (
              <WorkerRow
                key={worker.uuid}
                worker={worker}
                workers={workers}
                setWorkers={setWorkers}
              />
            ))
        ) : (
          <NoItemsFound name={t("workers.noWorkers")} />
        )}
      </div>
    </div>
  )
}

export default Workers
