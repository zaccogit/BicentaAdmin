import Link from 'next/link';
import React from 'react';
import Image from 'next/image'
import env from '../../../utils'
const Logo = () => {
    return (
      <Link href="/dashboard" >
        <span className="inline-flex items-center justify-center h-20 w-full bg-primary hover:bg-secondary focus:bg-accent cursor-pointer">
          <Image src={env.IMG_HOME_URL as string} alt={env.NOMBRE} className="w-36" width={1080} height={1080}></Image> 
        </span>
      </Link>
    );
};

export default Logo;