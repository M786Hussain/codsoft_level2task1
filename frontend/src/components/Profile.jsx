import React, { useState } from 'react'
import Navbar from "./ui/shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen]= useState(false);
  const {user}= useSelector(store=>store.auth)
  
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

      <div className='flex justify-between'>
           <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              alt="Profile"
              src="data:image/jpeg;base64,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"
            />
          </Avatar>

          <div>
            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
            <p>{user?.profile?.bio}</p>
          </div>
          </div>
          <Button  onClick={() => setOpen(true)}  variant="outline" className="text-right"><Pen/></Button>
      </div>

      <div className="my-6">

        <div  className='flex items-center gap-3 my-2'><Mail/>
        <p>{user?.email}</p></div>

        <div  className='flex items-center gap-3 my-2'><Contact/>
        <p>{user?.phoneNumber}</p></div>
        
      </div>

      

      <div>
        <h1>Skill</h1>

        <div className='flex items-center gap-1'>
             {
        user?.profile?.skill.length !== 0 ? user?.profile?.skill.map((item, index)=> <Badge key = {index}>{item}</Badge>) : <p>NA</p>
        }
        </div>
       
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
         <Label className="text-md font-bold">Resume</Label>

         {
          isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
         }

      </div>

    
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
       <h1 className='font-bold text-lg my-5 ml-3'>Applied Jobs</h1>


       <AppliedJobTable/>

    </div>

    <EditProfile open={open} setOpen={setOpen}/>

    </div>
  );
};

export default Profile;
