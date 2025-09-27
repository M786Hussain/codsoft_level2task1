import Navbar from "../components/ui/shared/Navbar";
import HeroSection from '../components/heroSection';
import LatestJobs from "../components/LatestJobs"
import CategoryCarousel from "../components/CategoryCarousel";
import Footer from "../components/Footer"
import useGetAllJobs from "@/hooks/useGetAllJobs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'




function Home() {
  useGetAllJobs();

   const { user } = useSelector(store => store.auth);
   const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <div>
      <Navbar />
      <HeroSection/>
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
    </div>
  )
}

export default Home
