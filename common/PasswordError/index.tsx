import Image from 'next/image'
import styles from './PasswordError.module.scss';

const PasswordError = () => {
  return (
    <section className={styles.passwordErrorWrapper}>
      <div className={styles.passwordError}>
        <Image
          className={styles.loadingIcon}
          src={'loading/shield-lock.svg'}
          alt="loader icon"
          width={80}
          height={80}
        />
        <h2>Устройство недоступно</h2>
        <span>Повторите попытку через 10 секунд</span>
      </div>
    </section>
  )
}

export default PasswordError
