import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

import LocalTime from "../../components/LocalTime";

import styles from './password-error.module.scss'
import "../../app/globals.scss"

export default function PasswordError() {
    const router = useRouter();

    useEffect(() => {

        const timer = setTimeout(() => {
            router.push('/');
        }, 8000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <section className={styles.passwordErrorWrapper}>
            <LocalTime/>
            <div className={styles.passwordError}>
                <Image className={styles.loadingIcon} src={"loading/shield-lock.svg"} alt="loader icon" width={80} height={80}/>
                <h2>
                    Устройство недоступно
                </h2>
                <span>
                Повторите попытку через 10 секунд
            </span>
            </div>
        </section>
    )
}