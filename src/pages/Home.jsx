import React,{useState,useContext} from 'react'
import { useTranslation } from "react-i18next"
import {gql,useQuery} from '@apollo/client'
import Table from '../components/table/Table'
import AddTableModal from '../components/table/AddTableModal'
import NoItemsFound from '../components/NoItemsFound'
import {AuthContext} from '../contexts/AuthContext'
import {CREDENTIALS} from '../env'


const GET_TABLES= gql`
   query tables {
    tables {
      code place full updatedAt
    }
  }
`

function Home() {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const { t } = useTranslation()

  const { authState }= useContext(AuthContext)
  const {user} = authState
  
  const [addTableModal,setAddTableModal]= useState(false)
  const [tables,setTables]= useState([])

  const {loading}= useQuery(GET_TABLES, {
    fetchPolicy: "no-cache",
    onCompleted: (data)=> setTables(data.tables)
  })

  const insideTables= tables.filter(table=> table.place==="inside")
  const outsideTables= tables.filter(table=> table.place==="outside")

  return (
    <div className="pt-24 px-16 flex flex-col">
      {user && user.verified === CREDENTIALS.username && (
        <div className="ml-auto">
          <button
            onClick={() => setAddTableModal(true)}
            className="px-4 py-2 textsm font-semibold uppercase focus:outline-none focus:bg-opacity-50 bg-yellow-700 text-gray-200"
          >
            {t("home.addBtn")}
          </button>
        </div>
      )}

      {user && user.verified === CREDENTIALS.username && addTableModal && (
        <AddTableModal
          setModal={setAddTableModal}
          tables={tables}
          setTables={setTables}
        />
      )}

      <div>
        <h1 className="text-5xl font-semibold text-gray-800 uppercase">
          {t("home.sections.inside")}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            <div className="mt-24 mb-16 text-gray-500 font-bold text-3xl text-center">
              {t("loading")}
            </div>
          ) : insideTables.length ? (
            insideTables.map((table) => (
              <Table
                key={table.code}
                {...table}
                setTables={setTables}
                tables={tables}
              />
            ))
          ) : (
            <NoItemsFound name={t("home.noInsideTables")} />
          )}
        </div>
      </div>

      <div className="mt-32 mb-56">
        <h1 className="text-5xl font-semibold text-gray-800 mr-auto uppercase">
          {t("home.sections.outside")}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-20">
          {loading ? (
            <div className="my-28 text-gray-500 font-bold text-3xl text-center">
              {t("loading")}
            </div>
          ) : outsideTables.length ? (
            outsideTables.map((table) => (
              <Table
                key={table.code}
                {...table}
                setTables={setTables}
                tables={tables}
              />
            ))
          ) : (
            <NoItemsFound name={t("home.noOutsideTables")} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
