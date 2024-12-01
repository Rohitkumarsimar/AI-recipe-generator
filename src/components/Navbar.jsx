import React from 'react'

const navbar = () => {
    return (
        <div className='flex bg-orange-400 h-13 justify-around align-middle  fixed w-full'>
            <div className="logo m-2">
                <span className=' font-bold  text-xl'>Your AI Chef</span>
            </div>
            <img 
  src="/logo.png" 
  className="h-[40px] filter drop-shadow-md m-0 p-0 relative top-0" 
  alt="Logo" 
/>


            <ul className='flex gap-5 m-2'>
                <a href='' className=' transition ease-out duration-150 hover:bg-orange-200 px-2 rounded-[10px]'>Home</a>
                <a href='' className=' transition ease-out duration-150 hover:bg-orange-200 px-2 rounded-[10px] '>About</a>
                <a href='' className=' transition ease-out duration-150 hover:bg-orange-200 px-2  rounded-[10px] '>Contact</a>
            </ul>
        </div>
    )
}

export default navbar
