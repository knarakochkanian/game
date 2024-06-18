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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBlur, selectOnboardingBlur, setBlur, setLocalTimeBlur, setOnBoardingBlur } from '../../redux/features/generalSlice';
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

  const [currentModal, setCurrentModal] = useState(1);

  const [vpkCount, setVpkCount] = useState(0);
  const [topVpkAllButton, setTopVpkAllButton] = useState('');
  const [vpkButtonAnimate, setVpkButtonAnimate] = useState('none');
  const [vpkButtonText, setVpkButtonText] = useState("Выбрать все");
  const [vpkCountColor, setVpkCountColor] = useState('rgba(153, 154, 154, 1)');

  const [step2Blur, setStep2Blur] = useState({
    first: false,
    second: true,
    third: true,
  });
  const [attackButtonsBlur, setAttackButtonsBlur] = useState('none');

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
    switch(currentModal) {
      case 1:
        dispatch(setOnBoardingBlur(
          {
            1: true,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
      case 2:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: true,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        setAttackButtonsBlur('blur(22px)');
        break;
      case 3:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: true,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
      case 4:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: true,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
        case 5:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: true,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
        case 6:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: true,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
        case 7:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: true,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
        case 8:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: true,
            9: false,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
        case 9:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: true,
            10: false,
            11: false,
            12: false,
          }
        ));
        break;
        case 10:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: true,
            11: false,
            12: false,
          }
        ));
        break;
        case 11:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: true,
            12: false,
          }
        ));
        break;
        case 12:
        dispatch(setOnBoardingBlur(
          {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: true,
          }
        ));
        setAttackButtonsBlur('none');
        break;
      default:
        break;
    }
  }, [currentModal])

  const completeOnboarding = () => {
    setOnboardingPassed(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('isOnboardingPassed', 'true');
    }
    dispatch(setOnBoardingBlur(
      {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
      }
    ));
    dispatch(setLocalTimeBlur(false));
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
    setCurrentModal(2);
  };

  const handleNext2 = () => {
    setSelectOpen(true);
    setModalOpen2(false);
    setModalOpen3(true);
    handleSelectRegion(1);
    setBlurButtons(false);
    setCurrentModal(3);
    // setStep2Blur({
    //   first: true,
    //   second: false,
    //   third: true
    // })
  };
  const handleOpenSidenav = (option: any) => {
    if (option.name === 'США' && modalOpen3) {
      setDrawerOpen(!drawerOpen);
      dispatch(setBlur(false));
      setAddUSA(true);
      dispatch(setLocalTimeBlur(false));
    }
  };
  const handleAddTheGorge = () => {
    dispatch(setBlur(false));
    setAddConfirm(true);
    setTheGorgeSelected(true);
    dispatch(setLocalTimeBlur(false));
  };
  const handleNext3 = (option: any) => {
    handleOpenSidenav(option);
    setCurrentRegionId(2);
    dispatch(setBlur(true));
    setModalOpen3(false);
    setModalOpen4(true);
    setExpanded(false);
    setCurrentModal(4);
    setStep2Blur({
      first: true,
      second: false,
      third: true,
    });
    dispatch(setLocalTimeBlur(true));
  };
  const handleNext4 = () => {
    setModalOpen4(false);
    setModalOpen5(true);
    setDrawerOpen(true);
    dispatch(setBlur(true));
    setCurrentModal(5);
    setTopVpkAllButton('top-vpk-all-button');
    setVpkButtonAnimate('block');
  };
  const handleNext5 = () => {
    setCurrentRegionId(3);
    dispatch(setBlur(true));
    setModalOpen5(false);
    setModalOpen6(true);
    setInputTheGorge(false);
    setCurrentModal(6);
    setStep2Blur({
      first: true,
      second: true,
      third: false,
    });
    dispatch(setLocalTimeBlur(true));
  };
  const handleNext6 = () => {
    dispatch(setBlur(false));
    setModalOpen6(false);
    setRemoveModal(false);
    setModalOpen7(true);
    setCurrentModal(7);
    setStep2Blur({
      first: true,
      second: true,
      third: true,
    })
  };
  const handleSelectOpen = () => {
    setSelectOpen(true);
  };
  const handleSelectAllVPK = () => {
    dispatch(setBlur(false));
    setAddColor(true);
    setVpkSelected(true);
    dispatch(setLocalTimeBlur(false))
    setVpkCount(5);
    setVpkButtonAnimate('none');
    setVpkButtonText('Сбросить все');
    setTopVpkAllButton('');
    setVpkCountColor('rgba(94, 209, 197, 1)');
  };
  const handleNext7 = () => {
    setModalOpen7(false);
    setModalOpen8(true);
    setDelayed(true);
    setCurrentModal(8);
  };
  const handleNext8 = () => {
    setModalOpen8(false);
    setModalOpen9(true);
    setCurrentModal(9);
  };
  const handleNext9 = () => {
    setRemoveModalDate(true);
    setCurrentModal(10);
  };
  return (
    <>
      <div className={styles.onboardingWrapper}>
        <div
          style={{ filter: blurButtons ? 'blur(22px)' : 'none' }}
          className={styles.onboardingButtons}
        >
          {regions.map((region, index) => (
            <BaseButton
              styleBlur={index === 0 ? step2Blur['first'] : index === 1 ? step2Blur['second'] : step2Blur['third']}
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
          sx={{ left: '45px !important', top: '115px !important', position: 'absolute' }}
        >
          <p>Выберите регион при помощи карты или списка.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" onClick={handleNext2}>
              далее
            </button>
            <Link
              href={'/'}
              onClick={completeOnboarding}
              className="SecondarySmall"
            >
              <span className="TypoBodyBigLink">пропустить</span>
            </Link>
          </div>
        </Modal>

        <div
          className={styles.onboardingAccordionWrapper}
          style={{ top: inputTheGorge ? '175px' : '116px' }}
        >
          {inputTheGorge ? (
            <ModalWithSelect isOpen={selectOpen} onClose={closeModal2}>
              <div className={styles.onboardingInput}>
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    color: '#D9D9D9',
                    fontSize: '16px',
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
                      width: '23px',
                      height: '23px',
                    }}
                  />
                </IconButton>
              </div>
            </ModalWithSelect>
          ) : (
            <div style={{ display: removeModal ? 'block' : 'none' }}>
              <div className={styles.onboardingTheGorge}>
                <h5 className='onboardingTheGorge__title'>уровень ущерба</h5>
                <div className="TypoBodyBig onboardingTheGorge__subtitle" style={{ color: '#787878' }}>
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
                            width={20}
                            height={20}
                          />

                          <h4 className='onboardingTheGorge__damage'>критический</h4>
                        </div>
                        <Image
                          src={'onboarding/info.svg'}
                          alt={'square'}
                          width={19}
                          height={19}
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
                            width={16}
                            height={16}
                          />

                          <h4 className='onboardingTheGorge__damage'>минимальный</h4>
                        </div>
                        <Image
                          src={'onboarding/info.svg'}
                          alt={'square'}
                          width={19}
                          height={19}
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
                            width={12}
                            height={12}
                          />

                          <h4 className='onboardingTheGorge__damage'>предупреждение</h4>
                        </div>
                        <Image
                          src={'onboarding/info.svg'}
                          alt={'square'}
                          width={19}
                          height={19}
                        />
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div style={{ display: modalOpen4 || modalOpen5 ? 'block' : 'none' }}>
            <Accordion
              expanded={true}
              // onChange={handleExpansion(subRegion.id)}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
                color: expanded ? '#D9D9D9' : '#FFF',
                marginBottom: '4px',
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Image
                    src={'onboarding/arrow.svg'}
                    alt={'arrow'}
                    width={11.3}
                    height={11.3}
                  />
                }
              >
                <h5 className='subregion-title'>Отрасли</h5>
              </AccordionSummary>
              <div
                className="ModalButtons"
                style={{
                  justifyContent: 'start',
                  padding: '20px 0',
                }}
              >
                <button
                  className={`ModalButton1 vpk__all-button ${topVpkAllButton}`}
                  onClick={handleSelectAllVPK}
                >
                  <span>
                    <span>Выбрать все</span>
                  </span>
                </button>
              </div>
            </Accordion>
          </div>
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
                    marginBottom: '4px',
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Image
                        src={'onboarding/arrow.svg'}
                        alt={'arrow'}
                        width={11.3}
                        height={11.3}
                      />
                    }
                    aria-controls={`${subRegion.id}-content`}
                    id={`${subRegion.id}-header`}
                  >
                    <h5 className='subregion-title'>{subRegion.title}</h5>
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
                    <div className='vpk__all-container'>
                      <span style={{ color: vpkCountColor }} className='vpk__all-container-count'>Выбрано: {vpkCount}</span>
                      <div style={{position: 'relative', overflow: 'hidden', height: '31px'}}>
                        <div style={{ display: vpkButtonAnimate }} className='vpk__all-button-animate'></div>
                        <button
                              className={'ModalButton1 vpk__all-button'}
                          // className={` ${addColor ? 'Green' : ''} ModalButton1 vpk__all-button ${
                          //   modalOpen5 ? 'SecondarySmallShine' : ''
                          // }`}
                          onClick={handleSelectAllVPK}
                        >
                          <span>
                            <span>{vpkButtonText}</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <AccordionDetails
                    className={
                      subRegion.title == 'ВПК'
                        ? styles.onboardingAccordionDetailsIndustries
                        : styles.onboardingAccordionDetails
                    }
                  >
                    {subRegion.options?.map((option) => (
                      <div className={option.name === 'США' ? 'AccordionNested-wrapper AccordionNested-wrapper_USA' : 'AccordionNested-wrapper'} key={option.id}>
                        <div className='SecondarySmallShine__animation' style={{display: option.name === 'США' ? 'block' : 'none'}}></div>
                        <button
                          className={
                            addColor
                              ? 'Green Green__vpk'
                              : option.name == 'США'
                                ? 'SecondarySmallShine'
                                : modalOpen4 || modalOpen5 ? 'industry-buttons' : 'AccordionNested'
                          }
                          onClick={() => handleOpenSidenav(option)}
                        >
                          <div className={option.name === 'США' ? 'AccordionNested-helper-1 AccordionNested-helper-1_USA' : 'AccordionNested-helper-1'}></div>
                          <div className={option.name === 'США' ? 'AccordionNested-helper-2 AccordionNested-helper-2_USA' : 'AccordionNested-helper-2'}></div>
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
          sx={{ left: '40%', top: '12% !important', position: 'absolute' }}
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
            <Link
              href={'/'}
              onClick={completeOnboarding}
              className="SecondarySmall"
            >
              <span className="TypoBodyBigLink">пропустить</span>
            </Link>
          </div>
        </Modal>
        <Modal
          isOpen={modalOpen3}
          onClose={closeModal3}
          counter={3}
          sx={{
            left: '414px !important',
            position: 'fixed',
            zIndex: '7',
            top: '116px !important',
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
                addUSA ? '  ModalButton1' : 'SecondarySmallDisable'
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
          sx={{
            left: '414px !important',
            position: 'fixed',
            top: '116px !important',
            zIndex: '7',
          }}
        >
          <p> Возможен выбор отрасли с помощью быстрых фильтров и поиска.</p>
          <p> Нажмите на “ВПК”, чтобы развернуть список.</p>
          <div className="ModalButtons">
            <button className={'ModalButton1'} onClick={handleNext4}>
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
          sx={{ left: '414px !important', top: '116px !important', position: 'fixed', zIndex: '7' }}
        >
          <p> Возможен выбор как всей отрасли, так и конкретных подотраслей.</p>
          <p> Нажмите на “Выбрать все” чтобы добавить отрасль в задачу.</p>
          <div className="ModalButtons">
            <button
              className={
                vpkSelected ? '  ModalButton1' : 'SecondarySmallDisable'
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
          sx={{
            left: '414px !important', 
            top: '116px !important',
            position: 'fixed',
            zIndex: '7',
          }}
        >
          <p> Выберите уровень ущерба.</p>
          <p> Нажмите на “Критический” для добавления в задачу.</p>
          <div className="ModalButtons">
            <button
              className={
                theGorgeSelected
                  ? 'ModalButton1'
                  : 'SecondarySmallDisable'
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
        <div style={{ filter: attackButtonsBlur }} className={styles.onboardingAttack}>
          <button onClick={openModal}>атака</button>
          <div>
            <Image
              src={'onboarding/AttackSign.svg'}
              alt={'attack'}
              width={68}
              height={68}
            />
            <Image
              src={'onboarding/ProtectSign.svg'}
              alt={'protect'}
              width={68}
              height={68}
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
