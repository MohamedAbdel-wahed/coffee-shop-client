import React from "react"
import { motion } from "framer-motion"
import {FaHome} from 'react-icons/fa'


function Tab({ name, setActiveTab, active }) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={() => setActiveTab(name)}
      className={`${
        active
          ? "bg-blue-500 border-red-500 font-semibold"
          : "bg-gray-800  border-green-500"
      }  border-b-2 py-2 px-3 mx-1 rounded-sm cursor-pointer select-none`}
    >
      {name==="all" ? <FaHome size="1.5em" /> : name}
    </motion.li>
  )
}

export default Tab
