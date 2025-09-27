import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar } from "../avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import login from "@/assets/auth/Login";
import signup from "@/assets/auth/Signup";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/constant/constantt'
import { setUser } from '@/redux/authSlice'
const Navbar = () => {
   const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logoutHandler = async () => {
  try {
    const res = await axios.get(`${USER_API_END_POINT}/logout`, {
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(setUser(null));
      navigate("/");
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Logout failed, try again.");
  }
};

  return (
    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 ml-2 border-none bg-white p-4 rounded-md mt-4 p-4 shadow px-8">
          <h1 className="text-4xl font-dancing text-pink-600 ">
            YourJob<span className="text-white">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ul className="flex space-x-6 pr-8">


           {
            user && user.role === 'recruiter' ?(
               <>
                    <li><Link to="/admin/companies" className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200">Companies</Link></li>
                    <li><Link to="/admin/jobs" className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200">Jobs</Link></li>
               </>
            ):(
              <>
                    <li><Link to="/" className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200">Home</Link></li>
                    <li><Link to="/jobs" className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200">Jobs</Link></li>
                    <li><Link to="/browse" className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200">Browse</Link></li>
             </>
            )
           }
          
            
          </ul>

          {!user ? (
            <div className="flex item-center gap-2">
              <Link to={"/login"}>
                {" "}
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/signup"}>
                {" "}
                <Button className="bg-[#6A38C2] hover:bg-[#5b3Da6]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className=" ">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="front-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 gap-2 text-gray-600">
                      {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                    <div className="flex w-fit item-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
