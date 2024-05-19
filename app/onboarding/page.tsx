'use client';
import React, { useEffect, useState } from 'react';
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
import { useAppDispatch } from '../../redux/hooks';
import { selectBlur, setBlur } from '../../redux/features/generalSlice';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function Onboarding() {
  const [currentRegionId, setCurrentRegionId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(true);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);
  const [modalOpen6, setModalOpen6] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [removeModal, setRemoveModal] = useState(true);
  const [modalOpen7, setModalOpen7] = useState(false);
  const [modalOpen8, setModalOpen8] = useState(false);
  const [modalOpen9, setModalOpen9] = useState(false);
  const [inputTheGorge, setInputTheGorge] = useState(true);
  const [addConfirm, setAddConfirm] = useState(false);
  const [addUSA, setAddUSA] = useState(false);
  const [blurButtons, setBlurButtons] = useState(true);
  const [delayed, setDelayed] = useState(false);
  const [removeModalDate, setRemoveModalDate] = useState(false);
  const [expanded, setExpanded] = useState<boolean | undefined | number>(
    regions[0]?.regions?.[0]?.id
  );
  const [onboardingPassed, setOnboardingPassed] = useState(false);
  const dispatch = useAppDispatch();
  const blur = useSelector(selectBlur);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
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
    dispatch(setBlur(true));
    setBlurButtons(true);
    setModalOpen(true);
    setModalOpen2(false);
  };
  useEffect(() => {
    const isOnboardingPassed =
      localStorage.getItem('isOnboardingPassed') === 'true';
    setOnboardingPassed(isOnboardingPassed);
  }, []);

  const completeOnboarding = () => {
    setOnboardingPassed(true);
    localStorage.setItem('isOnboardingPassed', 'true');
  };
  const closeModal = () => setModalOpen(false);
  const closeModal2 = () => setModalOpen2(false);
  const closeModal3 = () => setModalOpen3(false);
  const closeModal4 = () => setModalOpen4(false);
  const closeModal5 = () => setModalOpen5(false);
  const closeModal6 = () => setModalOpen6(false);
  const closeModal7 = () => setModalOpen7(false);
  const closeModal8 = () => setModalOpen8(false);
  const closeModal9 = () => setModalOpen9(false);
  const handleNext = () => {
    setButtonsDisabled(false);
    setModalOpen2(true);
    setModalOpen(false);
    setSelectOpen(false);
    setBlurButtons(false);
  };

  const handleNext2 = () => {
    setSelectOpen(true);
    setModalOpen2(false);
    setModalOpen3(true);
    handleSelectRegion(1);
    setBlurButtons(false);
  };
  const handleOpenSidenav = (option: any) => {
    if (option.name === 'США' && modalOpen3) {
      setDrawerOpen(!drawerOpen);
      dispatch(setBlur(false));
      setAddUSA(true);
    }
  };
  const handleAddTheGorge = () => {
    dispatch(setBlur(false));
    setAddConfirm(true);
    setTheGorgeSelected(true);
  };
  const handleNext3 = (option: any) => {
    handleOpenSidenav(option);
    setCurrentRegionId(2);
    dispatch(setBlur(true));
    setModalOpen3(false);
    setModalOpen4(true);
    setExpanded(false);
  };
  const handleNext4 = () => {
    setModalOpen4(false);
    setModalOpen5(true);
    setDrawerOpen(true);
    dispatch(setBlur(true));
  };
  const handleNext5 = () => {
    setCurrentRegionId(3);
    dispatch(setBlur(true));
    setModalOpen5(false);
    setModalOpen6(true);
    setInputTheGorge(false);
  };
  const handleNext6 = () => {
    dispatch(setBlur(false));
    setModalOpen6(false);
    setRemoveModal(false);
    setModalOpen7(true);
  };
  const handleSelectOpen = () => {
    setSelectOpen(true);
  };
  const handleSelectAllVPK = () => {
    dispatch(setBlur(false));
    setAddColor(true);
    setVpkSelected(true);
  };
  const handleNext7 = () => {
    setModalOpen7(false);
    setModalOpen8(true);
    setDelayed(true);
  };
  const handleNext8 = () => {
    setModalOpen8(false);
    setModalOpen9(true);
  };
  const handleNext9 = () => {
    setRemoveModalDate(true);
  };
  return (
    <>
      <div className={styles.onboardingWrapper}>
        <div
          style={{ filter: blurButtons ? 'blur(22px)' : 'none' }}
          className={styles.onboardingButtons}
        >
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
          sx={{ left: '1%', top: '12% !important', position: 'absolute' }}
        >
          <p>Выберите регион при помощи карты или списка.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext2}>
              далее
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
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
            <div style={{ display: removeModal ? 'block' : 'none' }}>
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
                    className={
                      subRegion.title == 'ВПК'
                        ? styles.onboardingAccordionDetailsIndustries
                        : styles.onboardingAccordionDetails
                    }
                  >
                    {subRegion.options?.map((option) => (
                      <div key={option.id}>
                        <button
                          className={
                            addColor
                              ? 'Green'
                              : option.name == 'США'
                                ? 'SecondarySmallShine'
                                : 'AccordionNested'
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
          sx={{ left: '40%', top: '220px', position: 'absolute' }}
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
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen3}
          onClose={closeModal3}
          counter={3}
          sx={{
            left: '33%',
            position: 'fixed',
            zIndex: '7',
            top: '15% !important',
          }}
        >
          <p>
            {' '}
            Возможен выбор группы стран с помощью быстрых фильтров, списка или
            поиска.
          </p>
          <p> Нажмите на “США”, чтобы добавить страну в задачу.</p>
          <div className="ModalButtons">
            <button
              className={
                addUSA ? '  ModalButton1' : 'SecondarySmallDisableButton'
              }
              onClick={handleNext3}
            >
              далее
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
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
            <button
              className={
                vpkSelected ? '  ModalButton1' : 'SecondarySmallDisableButton'
              }
              onClick={handleNext4}
            >
              далее
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
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
            <button
              className={
                vpkSelected ? '  ModalButton1' : 'SecondarySmallDisableButton'
              }
              onClick={handleNext5}
            >
              далее
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
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
            <button
              className={
                theGorgeSelected
                  ? 'ModalButton1'
                  : 'SecondarySmallDisableButton'
              }
              onClick={handleNext6}
            >
              <span>далее</span>
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen7}
          onClose={closeModal7}
          counter={7}
          sx={{ bottom: '17%', left: '50%', top: 'unset !important' }}
        >
          <p>
            {' '}
            В данном окне отображаются выбранные вами страны, отрасли и уровень
            ущерба. Когда все три пункта выбраны, физическая кнопка
            “ПОДТВЕРДИТЬ” становится активной.
          </p>
          <div className="ModalButtons">
            <button
              className={
                theGorgeSelected
                  ? 'ModalButton1'
                  : 'SecondarySmallDisableButton'
              }
              onClick={handleNext7}
            >
              <span>далее</span>
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
          </div>
        </Modal>

        <Modal
          isOpen={modalOpen8}
          onClose={closeModal8}
          counter={8}
          sx={{ bottom: '14%', left: '51%', top: 'unset !important' }}
        >
          <p>
            {' '}
            При необходимости запустить задачу в строго определенное время,
            нажмите на элемент “Отложенный запуск” и установите дату и время.
          </p>
          <div className="ModalButtons">
            <button
              className={
                theGorgeSelected
                  ? 'ModalButton1'
                  : 'SecondarySmallDisableButton'
              }
              onClick={handleNext8}
            >
              <span>далее</span>
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen9}
          onClose={closeModal9}
          counter={9}
          sx={{ bottom: '14%', left: '51%', top: 'unset !important' }}
        >
          <p>
            После выбора всех пунктов условий нажмите на физическую кнопку
            “Подвердить” справа  от дисплея, для перехода  к следующему шагу.
          </p>
          <div className="ModalButtons">
            <button
              className={
                theGorgeSelected
                  ? 'ModalButton1'
                  : 'SecondarySmallDisableButton'
              }
              onClick={handleNext9}
            >
              <span>далее</span>
            </button>
            <Link href={'/'} className="SecondarySmall">
              <span className="TypoBodyBigLink">
                <button onClick={completeOnboarding}>пропустить</button>
              </span>
            </Link>
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
        delayed={delayed}
        theGorgeSelected={theGorgeSelected}
        removeModalDate={removeModalDate}
        sx={{ filter: blur ? 'blur(22px)' : 'none' }}
      />
      <Image
        src="/home/Globus1.png"
        width={1071}
        height={1070}
        alt="Globus"
        style={{
          filter:
            modalOpen ||
            modalOpen3 ||
            modalOpen4 ||
            modalOpen5 ||
            modalOpen6 ||
            modalOpen7 ||
            modalOpen8 ||
            modalOpen9
              ? 'blur(22px)'
              : 'none',
        }}
        className={styles.onboardingGlobus}
      />
    </>
  );
}
