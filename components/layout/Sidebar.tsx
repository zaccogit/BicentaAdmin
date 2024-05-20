import React, { useRef } from 'react';
import OutsideClick from '../../utils/outsideClick';
import Nav from './sidebar/Nav';
import SettingButton from './sidebar/SettingButton';
import Logo from './sidebar/Logo';

const Sidebar = ({mobileNavsidebar}:any) => {
    const sidebarRef = useRef(null);
    const sidebarOutsideClick = OutsideClick(sidebarRef);

    //console.log("sidebar Ref", sidebarRef)
    //console.log("sidebar Ref sidebarOutsideClick", sidebarOutsideClick)
    return (
        <aside className={`${mobileNavsidebar ? 'block' : 'hidden'} sm:flex sm:flex-col z-50`} ref={sidebarRef}>
            <Logo />
            
            <div className="flex-grow flex flex-col justify-between bg-gray-50">
                <Nav sidebarOutsideClick={sidebarOutsideClick} />
                {/* <SettingButton /> */}
            </div>
        </aside>
    );
};

export default Sidebar;