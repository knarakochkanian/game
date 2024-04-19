import Image from "next/image";
import styles from './Loading.module.scss'
export default function Loading() {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.loading}>
                <Image className={styles.loadingIcon} src={"/Loading/TaskIcon.svg"} alt="loader icon" width={80} height={80}/>
                <h4>Загрузка</h4>
            </div>
            <Image src={'/Loading/Loader.svg'} alt="loader" width={1316} height={1316} className={styles.Loader}/>
        </div>

    )
}