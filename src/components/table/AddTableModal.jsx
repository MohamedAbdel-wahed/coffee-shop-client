import React,{useState} from 'react'
import ModalTemplate from "../ModalTemplate"
import {gql,useMutation} from '@apollo/client'
import { useTranslation } from "react-i18next"



const ADD_TABLE= gql`
  mutation addTable($code:Int! $place:String!){
    addTable(code:$code place:$place){
       code place full
     }
   }
`

function AddTableModal({setModal,tables,setTables}) {
  const { t } = useTranslation()

  const [table, setTable] = useState({
    code: 0,
    place: "inside",
  })
  
  const [errors, setErrors] = useState({})

  const [addTable, { loading }] = useMutation(ADD_TABLE, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      setErrors({})
      const newTables = [...tables, data.addTable]
      setTables(newTables)
      setModal(false)
    },
  })

  const handleSubmit= (e)=> {
    e.preventDefault()
    addTable({variables: table})
  }

  return (
    <ModalTemplate setModal={setModal} title={t("home.modalTitle")}>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <select
            required
            value={table.place}
            onChange={(e) => setTable({ ...table, place: e.target.value })}
            className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-300 rounded-lg cursor-pointer"
          >
            <option value="inside">{t("home.modalSelectOptions.inside")}</option>
            <option value="outside">{t("home.modalSelectOptions.outside")}</option>
          </select>
          {errors.place && (
            <p className="text-red-500 text-xs mt-1">{errors.place}</p>
          )}
        </div>
        <div className="my-3">
          <input
            type="number"
            className="w-full px-4 py-2 text-gray-700 text-sm font-semibold border border-gray-300 focus:outline-none focus:border-blue-300 rounded-lg"
            placeholder="123"
            value={table.code}
            onChange={(e) =>
              setTable({ ...table, code: parseInt(e.target.value) || '' })
            }
            required
          />
          {errors.code && (
            <p className="text-red-500 text-xs mt-1">{errors.code}</p>
          )}
        </div>
        <button className="w-full my-3 py-2.5 px-4 text-sm text-white bg-red-500 rounded-full focus:outline-none uppercase focus:bg-opacity-80 tracking-wide">
          {t(`${loading ? "loading" : "home.modalAddBtn"}`)}
        </button>
      </form>
    </ModalTemplate>
  )
}

export default AddTableModal
