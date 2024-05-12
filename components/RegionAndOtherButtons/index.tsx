'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BaseButton from '../../common/BaseButtton';
import ModalWithSelect from '../../common/Modals/ModalWithSelect';
import { regions } from '../../data/attackRegionsData';
import Keyboard from '../Keyboard';
import useCloseModal from '../../hooks/useCloseModal';
import { slashes_90_degree } from '../../public/main-screen';
import { closeXButton } from '../../public/ui_kit';
import Places from '../Places';
import { search } from '../../helpers';
import { COUNTRIES, REGIONS } from '../../constants';
import AccordionWrapper from '../../common/AccordionWrapper';

import styles from './RegionAndOtherButtons.module.scss';

interface IRegionAndOtherButtonsProps {
  drawerOpen: boolean;
  setDrawerOpen: TSetBoolean;
  isAttacking: boolean;
}

const RegionAndOtherButtons = ({
  drawerOpen,
  setDrawerOpen,
  isAttacking,
}: IRegionAndOtherButtonsProps) => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);
  const keyboardRef = useRef<{
    setSearchInput: (input: string) => void;
  } | null>(null);
  const [expanded, setExpanded] = useState(regions[0].id);

  const onChangeInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newInput = event.target.value;
    setSearchInput(newInput);
    if (keyboardRef.current && keyboardRef.current.setSearchInput) {
      keyboardRef.current.setSearchInput(newInput);
    }
  };

  const handleNext3 = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  // @ts-ignore
  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSearchClick = () => {
    setShowKeyboard(true);
  };

  useCloseModal(showKeyboard, setShowKeyboard, 'dialog', 'input');

  return (
    <div className={styles.regionAndOtherButtons}>
      <BaseButton
        protectMode={!isAttacking}
        active={selectOpen}
        onClick={handleSelectOpen}
      >
        Регион
      </BaseButton>

      <ModalWithSelect isOpen={selectOpen} onClose={() => {}}>
        <div className={styles.regionAndOtherButtonsInput}>
          <InputBase
            sx={{ ml: 1, flex: 1, color: '#D9D9D9', fontSize: '34px' }}
            placeholder="Поиск"
            value={searchInput}
            onChange={(e) => onChangeInput(e)}
            onClick={onSearchClick}
          />
          <IconButton
            type="button"
            sx={{ p: '10px', color: '#D9D9D9' }}
            aria-label="search"
          >
            {searchInput ? (
              <div
                role="button"
                className={styles.closeXButton}
                onClick={() => setSearchInput('')}
              >
                <Image
                  src={closeXButton}
                  alt="closeXButton"
                  width={40}
                  height={40}
                  priority
                />
              </div>
            ) : (
              <SearchIcon
                sx={{ color: '#D9D9D9', width: '48px', height: '48px' }}
              />
            )}
          </IconButton>
        </div>

        {
          <dialog
            className={`${styles.searchResult} ${
              showKeyboard || searchInput ? '' : styles.displayNone
            }`}
          >
            <h5>результаты поиска</h5>
            <Image
              className={styles.slashes_90_degree}
              src={slashes_90_degree}
              alt="slashes_90_degree"
              width={24}
              height={150}
              priority
            />
            <Places places={search(searchInput)} />
          </dialog>
        }

        <div
          className={
            showKeyboard || searchInput ? styles.hideSelectionPanel : ''
          }
        >
          {regions[0].regions?.map((region, index) => {
            switch (region.title) {
              case REGIONS:
              case COUNTRIES:
                return (
                  <AccordionWrapper
                    styles={{ accordionDetailsHeight: '686px' }}
                    expanded={expanded}
                    handleExpansion={handleExpansion}
                    region={region}
                    key={index}
                  >
                    <Places places={region.options} />
                  </AccordionWrapper>
                );
            }

            return (
              <AccordionWrapper
                styles={{ accordionDetailsHeight: 'unset' }}
                key={index}
                expanded={expanded}
                handleExpansion={handleExpansion}
                region={region}
              >
                {region.options?.map((option) => (
                  <div
                    key={option.id}
                    style={{ flexWrap: 'wrap', gap: '10px' }}
                  >
                    <button
                      className={`SecondarySmallDisable ${
                        option.name == 'США' ? 'SecondarySmallShine' : ''
                      }`}
                      onClick={handleNext3}
                    >
                      <span>
                        <span>{option.name}</span>
                      </span>
                    </button>
                  </div>
                ))}
              </AccordionWrapper>
            );
          })}
        </div>
      </ModalWithSelect>

      <BaseButton disabled={true}>Отрасль</BaseButton>
      <BaseButton disabled={true}>Ущерб</BaseButton>

      {showKeyboard && (
        <dialog>
          <Keyboard setSearchInput={setSearchInput} keyboardRef={keyboardRef} />
        </dialog>
      )}
    </div>
  );
};

export default RegionAndOtherButtons;
