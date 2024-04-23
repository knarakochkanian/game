import React, { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./modal.module.scss"
import {SxProps, Theme} from "@mui/system";
import Box from '@mui/material/Box';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    counter: number;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, sx, onClose, counter , children }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    // Close modal on outside click
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = isOpen ? (
        <Box onClick={handleOutsideClick} sx={sx}>
            <div className={styles.modal}>
                <div className={styles.modalCounter}>
                    <Image src={"onboarding/Hint_icon.svg"} alt={"icon"} width={128} height={96}/>
                    <span className={styles.modalCounter_number}>{counter}/12</span>
                </div>
                <div className={styles.modalMain}>{children}</div>
            </div>
        </Box>
    ) : null;

    if (!isBrowser) {
        return null;
    }

    return modalContent;
};

export default Modal;
