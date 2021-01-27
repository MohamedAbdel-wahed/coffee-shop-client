import React,{useState} from 'react'
import Tab from '../Tab'


function ProductsTabs({activeTab,setActiveTab,products}) {

  const [categories,setCategories]= useState([])

  if(products){
    products.map(
      ({ category }) =>
        !categories.includes(category) &&
        setCategories([category, ...categories])
    )
  }

  return (
    <div id="tabs" className="w-full pb-3.5 overflow-scroll overflow-y-hidden">
      <ul className="flex text-white uppercase text-sm tracking-wide">
        <Tab
          name={"all"}
          active={activeTab === "all"}
          setActiveTab={setActiveTab}
        />
        {categories.map((category,index) => (
          <Tab
            key={index}
            name={category}
            active={activeTab.toLowerCase() === category.toLowerCase()}
            setActiveTab={setActiveTab}
          />
        ))}
      </ul>
    </div>
  )
}

export default ProductsTabs
