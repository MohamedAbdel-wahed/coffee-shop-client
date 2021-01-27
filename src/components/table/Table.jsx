import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion"
import {FaTrashAlt} from 'react-icons/fa'
import {gql,useMutation} from '@apollo/client'
import {AuthContext} from '../../contexts/AuthContext'
import {CREDENTIALS} from '../../env'


const REMOVE_TABLE= gql`
    mutation removeTable($code:Int!){
      removeTable(code:$code)
    }
`
 
function Table({updatedAt,code,full,tables,setTables}) {
  const { authState }= useContext(AuthContext)
  const {user} = authState

  const [removeTable]= useMutation(REMOVE_TABLE)

  const handleDelete= ()=> {
    removeTable({variables: {code}})
    setTables(tables.filter(table=> table.code !==code))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-40 h-40 mt-12"
    >
      <p className="text-gray-500 font-bold text-xl text-center">
        {updatedAt && full ? updatedAt : ""}
      </p>
      <Link to={`/add-order/${code}`} className="w-full h-full cursor-pointer">
        <img
          src={full ? "/images/full-table.svg" : "/images/empty-table.svg"}
          className="w-full h-10/12 transform scale-100 hover:scale-110 transition-all duration-500 ease-out"
          alt="table"
        />
      </Link>
      <div className="my-4 font-bold flex justify-between px-2">
        <span className="text-xl text-green-700">{code}</span>
        {user && user.verified === CREDENTIALS.username && (
          <button
            onClick={handleDelete}
            className="text-lg text-red-500 focus:outline-none focus:text-opacity-70"
          >
            <FaTrashAlt />
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default Table
