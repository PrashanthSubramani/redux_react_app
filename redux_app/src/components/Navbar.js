import React from 'react'
import { useSelector } from 'react-redux';
export const Navbar = () => {

  const {taskList,error} = useSelector((state)=>state.tasks)
  return (
    <>
        <h1 className='text-center my-4 text-primary '>Project Management</h1>
        <h1 className='text-center lead '>{`Currently ${taskList.length} Task(s) Pending`}</h1>
        {
          (error !== '') ? <h5 className="text-center text-danger" >{error}</h5> : null
        }
    </>

  )
}
