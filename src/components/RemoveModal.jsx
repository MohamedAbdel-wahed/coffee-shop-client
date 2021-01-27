import React from "react"
import { useTranslation } from "react-i18next"

function RemoveModal({ setModal, removeEntry, removedKey,name }) {
  const { t } = useTranslation()

  return (
    <div className="absolute inset-0 h-screen w-full flex justify-center items-center z-20 overflow-hidden">
      <button
        onClick={() => setModal(false)}
        className="w-full h-full absolute inset-0 bg-gray-800 opacity-80 z-20 cursor-default"
      ></button>
      <div className="absolute -mt-24 bg-white p-4 border border-gray-200 rounded-lg shadow-md z-30">
        <h1 className="px-3 py-2">
          {t("removeModal.title")} 
          <span className="text-red-700"> {name ? name : removedKey}</span>?
        </h1>
        <div className="mx-6 my-2 flex justify-evenly">
          <button
            onClick={() => removeEntry(removedKey)}
            className="px-4 py-1 text-white bg-red-500 font-bold focus:outline-none focus:bg-opacity-70 rounded-lg"
          >
            {t("removeModal.yesBtn")}
          </button>
          <button
            onClick={() => setModal(false)}
            className="px-4 py-1 text-white bg-gray-500 font-bold focus:outline-none focus:bg-opacity-70 rounded-lg"
          >
            {t("removeModal.noBtn")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveModal
