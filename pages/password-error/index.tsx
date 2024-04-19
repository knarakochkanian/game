import Image from "next/image";
import styles from './password-error/passwordError.module.scss'
export default function PasswordError() {
    return (
        <section className="container">
            <div className={styles.passwordError}>
                <Image className={styles.loadingIcon} src={"/Loading/TaskIcon.svg"} alt="loader icon" width={80} height={80}/>
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