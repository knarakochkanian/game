import Image from "next/image";
import styles from './onboarding.module.scss'
import "../../app/globals.css"
import React, {useState} from "react";
import Modal from "../../components/Modal";

export default function Onboarding() {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <section className={styles.onboardingWrapper}>
            <div className={styles.onboardingButtons}>
                <button>Регион</button>
                <button>Отрасль</button>
                <button>Ущерб</button>
            </div>
            <div className={styles.onboarding}>
                <Modal isOpen={modalOpen} onClose={closeModal} counter={1}>
                    <p>На выбор вам доступны два режима:</p>
                    <ul style={{gap: "16px"}}>
                        <li>Атака – для запуска кибератаки;</li>
                        <li>Защита – для запуска защиты от кибератаки.</li>
                    </ul>
                    <div className="ModalButtons">
                        <button className="ModalButton1">далее</button>
                        <button className="ModalButton2" onClick={closeModal}>пропустить</button>
                    </div>
                </Modal>
                <div className={styles.onboardingAttack}>
                    <button onClick={openModal}>атака</button>
                    <div>
                        <Image src={"onboarding/AttackSign.svg"} alt={"attack"} width={48} height={48}/>
                        <Image src={"onboarding/ProtectSign.svg"} alt={"protect"} width={48} height={48}/>
                    </div>
                    <button>защита</button>
                </div>

            </div>
        </section>
    )
}