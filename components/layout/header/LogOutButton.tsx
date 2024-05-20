'use cliente'
import { useRender } from '@/context/render/renderProvider';
import { LogOut } from '@/lib/httpRequest';
import { useRouter } from 'next/navigation'
import React from 'react';

const LogOutButton = () => {
   const router = useRouter();
   const { setLoader } = useRender()

   const logOut = async () => {
    setLoader(true)
    try {
      await LogOut()
      router.push("/login");
    } catch (error) {
      
    }finally{
      setLoader(false)
    }

   }
    return (
        <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full" onClick={() => logOut()}>
              <span className="sr-only">Log out</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
        </button>
    );
};

export default LogOutButton;