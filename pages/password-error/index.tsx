import Image from "next/image";
import styles from './password-error.module.scss'
import "../../app/globals.css"
import LocalTime from "../../components/LocalTime";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function PasswordError() {
    const router = useRouter(); // используем хук для управления роутингом

    useEffect(() => {

        const timer = setTimeout(() => {
            router.push('/');
        }, 60000);

        return () => clearTimeout(timer);
    }, [router]); // пустой массив зависимостей означает, что эффект выполнится один раз после монтирования компонента

    return (
        <section className={styles.passwordErrorWrapper}>
            <LocalTime/>
            <div className={styles.passwordError}>
                <Image className={styles.loadingIcon} src={"/public/loading/shield-lock.svg"} alt="loader icon" width={80} height={80}/>
                <h2>
                    Устройство недоступно
                </h2>
                <span>
                Повторите попытку через 1 минуту
            </span>
            </div>
        </section>
    )
}