'use client';

import Image from "next/image";
import React, {useState} from "react";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Modal from "../../common/Modals/Modal";
import ModalWithSelect from "../../common/Modals/ModalWithSelect";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {regions} from "../../data/attackRegionsData"
import styles from './onboarding.module.scss';
import "../globals.scss";
import BaseButton from "../../common/BaseButtton";
import Sidenav from "../../common/Sidenav";
// import Keyboard from "react-simple-keyboard";
// import "react-simple-keyboard/build/css/index.css";
// interface KeyboardComponent {
//     setInput: (input: string) => void;
// }
export default function Onboarding() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);
    const [selectOpen, setSelectOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [expanded, setExpanded] = useState(regions[0].id);

    // const [input, setInput] = useState("")
    const openModal = () => {
        setModalOpen(true);
        setModalOpen2(false);
    }

    const closeModal = () => setModalOpen(false);
    const closeModal2 = () => setModalOpen2(false);
    const closeModal3 = () => setModalOpen3(false);

    const handleNext = () => {
        setModalOpen2(true);
        setModalOpen(false);
        setSelectOpen(false);
    }

    const handleNext2 = () => {
        setSelectOpen(true);
        setModalOpen2(false);
        setModalOpen3(true);
    }
    const handleNext3 = () => {
        setDrawerOpen(!drawerOpen)
    }
    const handleSelectOpen = () => {
        setSelectOpen(true);
    };

    // @ts-ignore
    const handleExpansion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // const handleOnChange = (input) => {
    //     setInput(input);
    // };
    // @ts-ignore
    // @ts-ignore
    return (
        <section className={styles.onboardingWrapper}>
            <div className={styles.onboardingButtons}>
                <Modal isOpen={modalOpen2} onClose={closeModal} counter={2}>
                    <p>Выберите регион при помощи карты или списка.</p>
                    <div className="ModalButtons">
                        <button className="ModalButton1" onClick={handleNext2}>далее</button>
                        <button className="SecondarySmall" onClick={closeModal2}><span>пропустить</span></button>
                    </div>
                </Modal>

                <BaseButton active={selectOpen} onClick={handleSelectOpen}>Регион</BaseButton>

                <ModalWithSelect isOpen={selectOpen} onClose={closeModal}>
                    <div className={styles.onboardingInput}>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: "#D9D9D9", fontSize: "34px" }}
                            placeholder="Поиск"
                            // value={input}
                            // onChange={(e) => setInput(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px', color: "#D9D9D9" }} aria-label="search">
                            <SearchIcon sx={{ color: "#D9D9D9", width: "48px", height: "48px" }} />
                        </IconButton>
                    </div>

                    <div>
                        {regions.map((region, index) => (
                            <Accordion
                                key={index}
                                expanded={expanded === region.id}
                                onChange={handleExpansion(region.id)}
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.87) !important",
                                    color: "#fff",
                                    marginBottom: "10px"
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${region.id}-content`}
                                    id={`${region.id}-header`}
                                >
                                    <h5>{region.title}</h5>
                                </AccordionSummary>
                                <AccordionDetails style={{ flexWrap: "wrap" , display: "flex", gap: "10px" }}>
                                    {region.options.map((option) => (
                                        <div key={option.id} style={{ flexWrap: "wrap", gap: "10px" }}>
                                            <button className={`SecondarySmallDisable ${option.name == 'США' ? 'SecondarySmallShine' : ''}`} onClick={handleNext3}>
                                                <span><span>{option.name}</span></span>
                                            </button>
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </ModalWithSelect>
                <Modal isOpen={modalOpen3} onClose={closeModal3} counter={3} sx={{left: "30%", position: "fixed"}}>
                    <p> Возможен выбор группы стран с помощью быстрых фильтров, списка или поиска.</p><p> Нажмите на “США”, чтобы добавить страну в задачу.</p>
                    <div className="ModalButtons">
                        <button className="ModalButton1">далее</button>
                        <button className="SecondarySmall" onClick={closeModal3}><span>пропустить</span></button>
                    </div>
                </Modal>

                <BaseButton disabled={true}>Отрасль</BaseButton>
                <BaseButton disabled={true}>Ущерб</BaseButton>
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
                        <button className="SecondarySmall" onClick={closeModal}><span>пропустить</span></button>
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
            <Image
                src="/home/Globus1.png"
                width={1071}
                height={1070}
                alt="Globus"
                 style={{ filter: modalOpen || modalOpen3 ? 'blur(22px)' : 'none' }}
                className={styles.onboardingGlobus}
            />
            <Sidenav isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
            {/*<button onClick={() => setDrawerOpen(!drawerOpen)}>Toggle Sidenav</button>*/}
            {/*<Keyboard*/}
            {/*    onChange={handleOnChange}*/}
            {/*    layout={{*/}
            {/*        default: ["q w e r t y u i o p", "a s d f g h j k l {bksp}", "z x c v b n m , . {space}"],*/}
            {/*    }}*/}
            {/*    display={{*/}
            {/*        "{bksp}": "⌫",*/}
            {/*        "{space}": "space",*/}
            {/*        "{ent}": "return"*/}
            {/*    }}*/}
            {/*    theme={"hg-theme-default myTheme1"}*/}
            {/*/>*/}
        </section>
    )
};

