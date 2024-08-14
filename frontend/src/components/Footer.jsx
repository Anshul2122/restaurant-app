import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-green-600 py-10'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <span className='text-3xl text-white font-bold tracking-tight'>QuickFeast.com</span>
            <span className="text=white font-bold tracking-tight flex gap-4">
                <span>Privacy Policy</span>
                <span>Terms of Services</span>
            </span>
        </div>
    </footer>
  )
}

export default Footer