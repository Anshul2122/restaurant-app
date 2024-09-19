import React from 'react'
import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

const HomePage = () => {
  return (
    <>
    <Hero/>
    <div className="flex flex-col  gap-12 ">
      <div className="bg-white rounded-lg shadow-md  flex flex-col gap-5 text-center -mt-16 ">
        <h1 className="text-5xl m-1 font-bold tracking-tight text-green-600 z-10">
          Tuck into takeway today
        </h1>
        <span className="text-3xl text-green-600 mb-6 font-bold"> Food is just a click away</span>
      </div>
      <div className='grid md:grid-cols-2 gap-2'>
        <img src={landingImage} alt="landing-image" />
        <div className='flex flex-col items center justify-center gap-4 text-center text-green-600'>
            <span className='font-bold text-3xl tracking-tighter '>Order takeaway even faster!</span>
            <span>Download the QuickFeast App for faster Ordering and personlised recommendations</span>
            <img src={appDownloadImage} alt="app-image" />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HomePage