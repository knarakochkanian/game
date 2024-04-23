'use client'
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import styles from "./Password.module.scss";
import Localtime from "../LocalTime";
import Image from "next/image";

export default function Password() {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');

    const handleNumberClick = (number: string) => {
        setPassword((prevPassword) => (prevPassword.length < 6 ? prevPassword + number : prevPassword));
    };

    const handleClear = () => {
        setPassword('');
    };

    const handleGoToGame = () => {
        if (password === "111285" )  {
            router.push('/onboarding')
        } else return router.push('/password-error')
    }
    useEffect(() => {
        if (password.length === 6) {
            handleGoToGame();
        }
    }, [ password]);

    return (
        <section className={styles.passwordWrraper}>
            <div>
                <h1>Введите пароль</h1>
                <div>
                    <div className={styles.passwordDisplay}>
                        {password.split('').map((char, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49" fill="none">
                                <path d="M39.3885 7.04199L41.9995 9.65302L27.6111 24.0417L42 38.4308L39.3888 41.042L24.9999 26.6529L10.611 41.042L8 38.431L22.3889 24.0418L8.00048 9.65322L10.6117 7.04199L25.0001 21.4306L39.3885 7.04199Z" fill="#5ED1C5"/>
                                <path d="M47.1949 22.195L47.1949 25.8876L26.8464 25.8877L26.8463 46.2368L23.1535 46.2369L23.1536 25.8877L2.8045 25.8879L2.80452 22.1954L23.1537 22.1952L23.1538 1.84676L26.8466 1.84673L26.8465 22.1952L47.1949 22.195Z" fill="#5ED1C5"/>
                            </svg>
                        ))}
                        {Array.from({ length: 6 - password.length }).map((_, index) => (
                            <span key={index}><svg xmlns="http://www.w3.org/2000/svg" width="84" height="48" viewBox="0 0 84 48" fill="none">
  <path d="M0 23.8333V28.6775L84 29V23.8333V19H0V23.8333Z" fill="#5ED1C5"/>
</svg></span>
                        ))}
                    </div>
                </div>
                <div className={styles.keypad}>
                    {Array.from({ length: 9 }, (_, i) => (
                        <button key={i + 1} onClick={() => handleNumberClick((i + 1).toString())}>
                            {i + 1}
                        </button>
                    ))}
                    <div></div>
                    <button onClick={() => handleNumberClick('0')}>0</button>
                    <button onClick={handleClear}><Image src={"/home/Delete.svg"} alt={"delete"} width={138} height={127} className={styles.passwordDelete}/></button>
                </div>
            </div>
            <p>
                <Localtime/>
            </p>
        </section>
    );
}
