import Image from "next/image";
import React, {useState} from "react";

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Modal from "../../components/Modals/Modal";

import styles from './onboarding.module.scss'
import "../../app/globals.scss"
import ModalWithSelect from "../../components/Modals/ModalWithSelect";
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

export default function Onboarding() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
     const [selectOpen, setSelectOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
        setModalOpen2(false)
    }
    const closeModal = () => setModalOpen(false);
    const closeModal2 = () => setModalOpen2(false);
    const handleNext =() => {
        setModalOpen2(true)
        setModalOpen(false)
        setSelectOpen(false)
     }
    const handleNext2 =() => {
        setSelectOpen(true)
        setModalOpen2(false)
    }
    const handleSelectOpen = () => {
        setSelectOpen(true);
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <section className={styles.onboardingWrapper}>
            <div className={styles.onboardingButtons}>
                <Modal isOpen={modalOpen2} onClose={closeModal} counter={2}>
                    <p>Выберите регион при помощи карты или списка.</p>
                    <div className="ModalButtons">
                        <button className="ModalButton1" onClick={handleNext2}>далее</button>
                        <button className="ModalButton2" onClick={closeModal2}>пропустить</button>
                    </div>
                </Modal>
                <button onClick={handleSelectOpen}    style={{
                    color: selectOpen ? '#5ED1C5' : '#FFF',
                    border: selectOpen ? '3px solid #5ED1C5' : '3px solid $mid-gray-background',
                }}>Регион</button>
                <ModalWithSelect isOpen={selectOpen} onClose={closeModal}>
                    <div className={styles.onboardingInput}>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: "#D9D9D9", fontSize: "34px" }}
                            placeholder="Поиск"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px', color: "#D9D9D9" }} aria-label="search">
                            <SearchIcon sx={{ color: "#D9D9D9", width: "48px", height: "48px" }} />
                        </IconButton>
                    </div>

                    <div style={{backgroundColor: "#black !important"}}>
                        <Accordion
                            expanded={expanded}
                            onChange={handleExpansion}
                            slots={{ transition: Fade as AccordionSlots['transition'] }}
                            slotProps={{ transition: { timeout: 400 } }}
                            sx={{
                                '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                                '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                                backgroundColor: "rgba(0, 0, 0, 0.87) !important",
                                color: "#fff"
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h5>Наиболее вероятный выбор</h5>
                            </AccordionSummary>
                            <AccordionDetails sx={{display: "flex !important", gap: "10px"}}>
                                <h5>
                                  G7
                                </h5>
                                <h5>
                                    НАТО
                                </h5>
                                <h5>
                                    США
                                </h5>
                                <h5>
                                    Евросоюс
                                </h5>
                                <h5>
                                   Весь мир
                                </h5>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </ModalWithSelect>
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
                        <button className="ModalButton1" onClick={handleNext}>далее</button>
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