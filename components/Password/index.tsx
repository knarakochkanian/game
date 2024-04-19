'use client'
import {  useState } from "react";
import { useRouter } from 'next/router'
import styles from "./Password.module.scss";

export default function Password() {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');

    const handleNumberClick = (number: string) => {
        setPassword((prevPassword) => (prevPassword.length < 6 ? prevPassword + number : prevPassword));
    };

    const handleClear = () => {
        setPassword('');
    };


    return (
        <div className={styles.passwordScreen}>
            <div className={styles.passwordDisplay}>{password.replace(/./g, '*')}</div>
            <div className={styles.keypad}>
                {Array.from({ length: 9 }, (_, i) => (
                    <button key={i + 1} onClick={() => handleNumberClick((i + 1).toString())}>
                        {i + 1}
                    </button>
                ))}
                <button onClick={handleClear}>Clear</button>
                <button onClick={() => handleNumberClick('0')}>0</button>
                <button onClick={() => router.push('/game')}>Enter</button>
            </div>
        </div>
    );
}
