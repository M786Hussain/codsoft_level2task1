import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


function heroSection() {

  const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

  return (
    <div className='text-center mt-8'>
        <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-blue font-medium '>You will hunt job here..</span>
         <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-white'>Dream Jobs</span></h1>
         <p className="text-lg text-white leading-relaxed tracking-wide">Discover thousands of exciting career opportunities, connect with top employers, apply easily, and build your professional future today with us.</p>

         
          <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full px-4 py-2 rounded-lg 
             bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 
             text-white placeholder-white"

                    />
                    <Button  onClick={searchJobHandler}  className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
        </div>
        
    </div>
  )
}

export default heroSection
