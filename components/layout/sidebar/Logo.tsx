import Link from 'next/link';
import React from 'react';
import Image from 'next/image'
import bicenta from '../../../images/bicenta.png'

const Logo = () => {
    return (
      <Link href="/dashboard" >
        <span className="inline-flex items-center justify-center h-20 w-full bg-primary hover:bg-secondary focus:bg-accent cursor-pointer">
          <Image src={bicenta} alt="Bicenta" className="w-36"></Image> 
        </span>
      </Link>
    );
};

export default Logo;