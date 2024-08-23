/* eslint-disable react/prop-types */


const Model = ({popup,children}) => {
  return (
    <div className={`h-screen  ${popup?"absolute scale-100 z-30":"hidden scale-0"} duration-300  top-0 left-0 bg-[#5e5e5ea1] w-full`}>
      {children}
    </div>
  )
}

export default Model
