import Image from "next/image";
import styles from './Loading.module.scss'
export default function Loading() {
    return (
        <div className="container">
            <Image className={styles.loadingIcon} src={"/Loading/TaskIcon.svg"} alt="loader icon" width={80} height={80}/>
            <Image src={'/Loading/Loader.svg'} alt="loader" width={1316} height={1316}/>
        </div>
    )
}