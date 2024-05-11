'use client';
import React, { useState } from 'react';
import Modal from '../../common/Modals/Modal';
import ModalWithSelect from '../../common/Modals/ModalWithSelect';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { regions } from '../../data/attackRegionsData';
import styles from './onboarding.module.scss';
import BaseButton from '../../common/BaseButtton';
import Sidenav from '../../common/Sidenav';

export default function Onboarding() {
  const [currentRegionId, setCurrentRegionId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);
  const [modalOpen6, setModalOpen6] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputTheGorge, setInputTheGorge] = useState(true);
  const [addConfirm, setAddConfirm] = useState(false);
  const [expanded, setExpanded] = useState<boolean | undefined | number>(
    regions[0]?.regions?.[0]?.id
  );
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [blur, setBlur] = useState(false);
  const [addColor, setAddColor] = useState(false);
  const [vpkSelected, setVpkSelected] = useState(false);
  const [theGorgeSelected, setTheGorgeSelected] = useState(false);
  const handleExpansion =
    (panel: number) => (event: unknown, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSelectRegion = (regionId: number) => {
    setCurrentRegionId(regionId);
    setSelectOpen(true);
    setButtonsDisabled(true);
  };
  // const [input, setInput] = useState("")
  const openModal = () => {
    setModalOpen(true);
    setModalOpen2(false);
  };

  const closeModal = () => setModalOpen(false);
  const closeModal2 = () => setModalOpen2(false);
  const closeModal3 = () => setModalOpen3(false);
  const closeModal4 = () => setModalOpen4(false);
  const closeModal5 = () => setModalOpen5(false);
  const closeModal6 = () => setModalOpen6(false);
  const handleNext = () => {
    setButtonsDisabled(false);
    setModalOpen2(true);
    setModalOpen(false);
    setSelectOpen(false);
  };

  const handleNext2 = () => {
    setSelectOpen(true);
    setModalOpen2(false);
    setModalOpen3(true);
    handleSelectRegion(1);
  };
  const handleOpenSidenav = (option: any) => {
    if (option.name === 'США' && modalOpen3) {
      setDrawerOpen(!drawerOpen);
    }
  };
  const handleAddTheGorge = () => {
    setBlur(false);
    setAddConfirm(true);
  };
  const handleNext3 = (option: any) => {
    handleOpenSidenav(option);
    setCurrentRegionId(2);
    setBlur(true);
    setModalOpen3(false);
    setModalOpen4(true);
    setExpanded(false);
  };
  const handleNext4 = () => {
    setModalOpen4(false);
    setModalOpen5(true);
    setDrawerOpen(true);
    setBlur(true);
  };
  const handleNext5 = () => {
    setCurrentRegionId(3);
    setBlur(true);
    setModalOpen5(false);
    setModalOpen6(true);
    setInputTheGorge(false);
  };
  const handleNext6 = () => {
    setBlur(false);
    setTheGorgeSelected(true);
  };
  const handleSelectOpen = () => {
    setSelectOpen(true);
  };
  const handleSelectAllVPK = () => {
    setBlur(false);
    setAddColor(true);
    setVpkSelected(true);
  };
  return (
    <>
      <div className={styles.onboardingWrapper}>
        <div className={styles.onboardingButtons}>
          {regions.map((region) => (
            <BaseButton
              key={region.id}
              active={currentRegionId === region.id}
              // disabled={ buttonsDisabled ||  region.id == 2 || region.id == 3}
              onClick={() => handleSelectRegion(region.id)}
            >
              {region.nameMain}
            </BaseButton>
          ))}
        </div>

        <Modal
          isOpen={modalOpen2}
          onClose={closeModal}
          counter={2}
          sx={{ left: '1%', position: 'absolute' }}
        >
          <p>Выберите регион при помощи карты или списка.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext2}>
              далее
            </button>
            <button className="SecondarySmall" onClick={closeModal2}>
              <span>пропустить</span>
            </button>
          </div>
        </Modal>
        <div
          className={styles.onboardingAccordionWrapper}
          style={{ top: inputTheGorge ? '400px' : '200px' }}
        >
          {inputTheGorge ? (
            <ModalWithSelect isOpen={selectOpen} onClose={closeModal2}>
              <div className={styles.onboardingInput}>
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    color: '#D9D9D9',
                    fontSize: '34px',
                  }}
                  placeholder="Поиск"
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px', color: '#D9D9D9' }}
                  aria-label="search"
                >
                  <SearchIcon
                    sx={{
                      color: '#D9D9D9',
                      width: '48px',
                      height: '48px',
                    }}
                  />
                </IconButton>
              </div>
            </ModalWithSelect>
          ) : (
            <div className={styles.onboardingTheGorge}>
              <h5>уровень ущерба</h5>
              <div className="TypoBodyBig" style={{ color: '#787878' }}>
                Для каждой задачи доступен выбор только одного уровня ущерба.
              </div>
              <ul className={styles.onboardingTheGorgeList}>
                <li>
                  <button
                    className="SecondarySmall"
                    onClick={handleAddTheGorge}
                  >
                    <span>
                      <div className={styles.onboardingTheGorgeListItem}>
                        <Image
                          src={'onboarding/square.svg'}
                          alt={'square'}
                          width={40}
                          height={40}
                        />

                        <h4>критический</h4>
                      </div>
                      <Image
                        src={'onboarding/info.svg'}
                        alt={'square'}
                        width={40}
                        height={40}
                      />
                    </span>
                  </button>
                </li>
                <li>
                  <button className="SecondarySmall">
                    <span>
                      <div className={styles.onboardingTheGorgeListItem}>
                        <Image
                          src={'onboarding/squareMid.svg'}
                          alt={'square'}
                          width={40}
                          height={40}
                        />

                        <h4>минимальный</h4>
                      </div>
                      <Image
                        src={'onboarding/info.svg'}
                        alt={'square'}
                        width={40}
                        height={40}
                      />
                    </span>
                  </button>
                </li>
                <li>
                  <button className="SecondarySmall">
                    <span>
                      <div className={styles.onboardingTheGorgeListItem}>
                        <Image
                          src={'onboarding/squareLittle.svg'}
                          alt={'square'}
                          width={40}
                          height={40}
                        />

                        <h4>предупреждение</h4>
                      </div>
                      <Image
                        src={'onboarding/info.svg'}
                        alt={'square'}
                        width={40}
                        height={40}
                      />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          )}
          {currentRegionId &&
            regions
              .find((region) => region.id === currentRegionId)
              ?.regions?.map((subRegion) => (
                <Accordion
                  key={subRegion.id}
                  expanded={expanded === subRegion.id}
                  onChange={handleExpansion(subRegion.id)}
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
                    color: expanded ? '#D9D9D9' : '#FFF',
                    marginBottom: '10px',
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Image
                        src={'onboarding/arrow.svg'}
                        alt={'arrow'}
                        width={24}
                        height={24}
                      />
                    }
                    aria-controls={`${subRegion.id}-content`}
                    id={`${subRegion.id}-header`}
                  >
                    <h5>{subRegion.title}</h5>
                  </AccordionSummary>
                  <div
                    className="ModalButtons"
                    style={{
                      display:
                        subRegion.title == 'ВПК' && expanded ? 'block' : 'none',
                      justifyContent: 'start',
                      padding: '20px 0',
                    }}
                  >
                    <button
                      className={` ${addColor ? 'Green' : ''} ModalButton1 ${
                        modalOpen5 ? 'SecondarySmallShine' : ''
                      }`}
                      onClick={handleSelectAllVPK}
                    >
                      <span>
                        <span>Выбрать все</span>
                      </span>
                    </button>
                  </div>
                  <AccordionDetails
                    className={styles.onboardingAccordionDetails}
                  >
                    {subRegion.options?.map((option) => (
                      <div key={option.id}>
                        <button
                          className={
                            addColor
                              ? 'Green'
                              : option.name == 'США'
                                ? 'SecondarySmallShine'
                                : 'SecondarySmallDisable'
                          }
                          onClick={() => handleOpenSidenav(option)}
                        >
                          <span>
                            <span>
                              <button>{option.name}</button>
                            </span>
                          </span>
                        </button>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          counter={1}
          sx={{ left: '38%', position: 'absolute' }}
        >
          <p>На выбор вам доступны два режима:</p>
          <ul style={{ gap: '16px' }}>
            <li>Атака – для запуска кибератаки;</li>
            <li>Защита – для запуска защиты от кибератаки.</li>
          </ul>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext}>
              далее
            </button>
            <button className="SecondarySmall" onClick={closeModal}>
              пропустить
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen3}
          onClose={closeModal3}
          counter={3}
          sx={{ left: '30%', position: 'fixed', zIndex: '7' }}
        >
          <p>
            {' '}
            Возможен выбор группы стран с помощью быстрых фильтров, списка или
            поиска.
          </p>
          <p> Нажмите на “США”, чтобы добавить страну в задачу.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext3}>
              далее
            </button>
            <button className="SecondarySmall" onClick={closeModal3}>
              <span>пропустить</span>
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen4}
          onClose={closeModal3}
          counter={4}
          sx={{ left: '30%', position: 'fixed', zIndex: '7' }}
        >
          <p> Возможен выбор отрасли с помощью быстрых фильтров и поиска.</p>
          <p> Нажмите на “ВПК”, чтобы развернуть список.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext4}>
              далее
            </button>
            <button className="SecondarySmall" onClick={closeModal4}>
              <span>пропустить</span>
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen5}
          onClose={closeModal5}
          counter={5}
          sx={{ left: '30%', position: 'fixed', zIndex: '7' }}
        >
          <p> Возможен выбор как всей отрасли, так и конкретных подотраслей.</p>
          <p> Нажмите на “Выбрать все” чтобы добавить отрасль в задачу.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext5}>
              далее
            </button>
            <button className="SecondarySmall" onClick={closeModal5}>
              <span>пропустить</span>
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen6}
          onClose={closeModal6}
          counter={6}
          sx={{ left: '30%', position: 'fixed', zIndex: '7' }}
        >
          <p> Выберите уровень ущерба.</p>
          <p> Нажмите на “Критический” для добавления в задачу.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext6}>
              далее
            </button>
            <button className="SecondarySmall" onClick={closeModal6}>
              <span>пропустить</span>
            </button>
          </div>
        </Modal>
        <div className={styles.onboardingAttack}>
          <button onClick={openModal}>атака</button>
          <div>
            <Image
              src={'onboarding/AttackSign.svg'}
              alt={'attack'}
              width={48}
              height={48}
            />
            <Image
              src={'onboarding/ProtectSign.svg'}
              alt={'protect'}
              width={48}
              height={48}
            />
          </div>
          <button>защита</button>
        </div>
      </div>

      <Sidenav
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        vpkSelected={vpkSelected}
        addConfirm={addConfirm}
        theGorgeSelected={theGorgeSelected}
        sx={{ filter: blur ? 'blur(22px)' : 'none' }}
      />
      <Image
        src="/home/Globus1.png"
        width={1071}
        height={1070}
        alt="Globus"
        style={{ filter: modalOpen || modalOpen3 ? 'blur(22px)' : 'none' }}
        className={styles.onboardingGlobus}
      />
    </>
  );
}
