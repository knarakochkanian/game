import React, {ReactNode} from 'react';
import styles from './BaseButton.module.scss';
import clsx from 'clsx';

interface BaseButtonProps {
    children: ReactNode;
    active: boolean;
    onClick: () => void;
}

function BaseButton({ children, active, onClick }: BaseButtonProps) {
    return (
        <button className={clsx(styles.buttonBase, { [styles.buttonActive]: active })} onClick={onClick}>
            <span className={ active ? styles.spanActive :  styles.spanBase} style={{ left: "-5px", top: "-5px" }}></span>
            <span className={ active ? styles.spanActive :  styles.spanBase} style={{ right: "-5px", top: "-5px" }}></span>
            <span className={ active ? styles.spanActive :  styles.spanBase} style={{ left: "-5px", bottom: "-5px" }}></span>
            <span className={ active ? styles.spanActive :  styles.spanBase} style={{ right: "-5px", bottom: "-5px" }}></span>
            {children}
        </button>
    );
}

export default BaseButton;
