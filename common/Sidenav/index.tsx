import React from 'react';
import styles from './Sidenav.module.scss';
import Image from "next/image";

// Define the interface for the component's props
interface SidenavProps {
    isOpen: boolean; // Indicates if the Sidenav is open
    onClose: () => void; // Function to call when closing the Sidenav
}

// Update the component to accept props
function Sidenav({ isOpen, onClose }: SidenavProps) {
    return (
        <>
            <div id="mySidenav" className={styles.sidenav} style={{ width: isOpen ? '696px' : '0' }}>
                <a href="#" className={styles.closebtn} onClick={onClose}></a>
                <div className={styles.sidenavTitle}>
                    <h2>Атака #000-001</h2>
                    <Image src="home/basket.svg" alt="basket" width={48} height={48}/>
                </div>
            </div>
        </>
    );
}

export default Sidenav;
