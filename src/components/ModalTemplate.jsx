import React from 'react'
import {motion} from 'framer-motion'



function ModalTemplate({setModal,title,children}) {

  return (
    <div className="absolute inset-0 h-screen w-full flex justify-center items-center z-30 overflow-hidden">
      <button
        onClick={() => setModal(false)}
        className="w-full h-full fixed inset-0 bg-gray-800 opacity-80 z-30 cursor-default"
      ></button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        id="printable"
        className="absolute -mt-10 bg-gray-200 px-5 pt-2 pb-4 border border-gray-200 rounded-lg shadow-md z-40"
      >
        {title && (
          <h1 className="mt-7 mb-5 mx-16 text-center text-gray-800 font-bold text-xl">
            {title}
          </h1>
        )}
        {children}
      </motion.div>
    </div>
  )
}

export default ModalTemplate
