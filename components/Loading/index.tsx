import Image from "next/image";
import styles from './Loading.module.scss'

export default function Loading() {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.loading}>
                <Image className={styles.loadingIcon} src={"/Loading/TaskIcon.svg"} alt="loader icon" width={80} height={80}/>
                <h4>Загрузка</h4>
            </div>
            <div className={styles.Loader}>
                <Image className={styles.loadingIcon} src={"/loading/Group.svg"} alt="loader icon" width={1316} height={1317}/>
                <Image className={styles.loadingIcon} src={"/loading/Group2.svg"} alt="loader icon" width={1109} height={1109}/>
                <Image className={styles.loadingIcon} src={"/loading/Group3.svg"} alt="loader icon" width={939} height={938}/>
                <Image className={styles.loadingIcon} src={"/loading/Group4.svg"} alt="loader icon" width={841} height={841}/>
                <Image className={styles.loadingIcon} src={"/loading/Group5.svg"} alt="loader icon" width={730} height={730}/>
                <Image className={styles.loadingIcon} src={"/loading/Group6.svg"} alt="loader icon" width={631} height={631}/>
                <Image className={styles.loadingIcon} src={"/loading/Group7.svg"} alt="loader icon" width={406} height={406}/>
                <Image className={styles.loadingIcon} src={"/loading/Group8.png"} alt="loader icon" width={262} height={262}/>
                <Image className={styles.loadingIcon} src={"/loading/Group10.svg"} alt="loader icon" width={135} height={147}/>
            </div>
        </div>

    )
}