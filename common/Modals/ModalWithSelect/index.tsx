import React, { useState, useEffect } from 'react';
import styles from "./modal-with-select.module.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
type CollapsibleState = {
    [key: string]: boolean;
};

const ModalWithSelect: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [collapsibleState, setCollapsibleState] = useState<CollapsibleState>({});
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        // Initialize collapsible states
        setCollapsibleState({
            'g7': true,
            'nato': true,
            'usa': true,

        });
    }, [isOpen]);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = isOpen ? (
        <div className={styles.container} onClick={handleOutsideClick}>
            <div className={styles.modalWithSelect}>
                <div className={styles.modalMain}>
                    {children}
                </div>
            </div>
        </div>
    ) : null;

    if (!isBrowser) {
        return null;
    }

    return modalContent;
};

export default ModalWithSelect;
