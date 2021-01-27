import React from 'react'

function NoItemsFound({name}) {
  return (
    <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 :xl:col-span-5 my-12 text-center text-gray-500 text-2xl font-semibold">
      {name}
    </div>
  )
}

export default NoItemsFound
