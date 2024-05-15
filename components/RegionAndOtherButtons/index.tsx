'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { IconButton, InputBase } from '@mui/material';
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
import {
  COUNTRIES,
  DAMAGE_LEVEL_MODAL,
  INDUSTRY_MODAL,
  REGIONS,
  REGION_MODAL,
} from '../../constants';
import AccordionWrapper from '../../common/AccordionWrapper';
import useManageModals from '../../hooks/useManageModals';
import Select from '../Select';
import SelectDamageModal from '../SelectDamageModal';
import IndustrySelection from '../IndustrySelection';
import SearchInput from '../SearchInput';
import SearchResult from '../SearchResult';

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
  const [openModal, setOpenModal] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectDamageOpen, setSelectDamageOpen] = useState(false);
  const [selectIndustryOpen, setSelectIndustryOpen] = useState(false);

  const keyboardRef = useRef<{
    setSearchInput: (input: string) => void;
  } | null>(null);
  const [expanded, setExpanded] = useState(regions[0].id);

  useManageModals(
    openModal,
    setSelectOpen,
    setSelectDamageOpen,
    setSelectIndustryOpen
  );

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
    console.log();
  };

  const handleSelectOpen = () => {
    setOpenModal(REGION_MODAL);
  };

  const handleDamageSelectOpen = () => {
    setOpenModal(DAMAGE_LEVEL_MODAL);
  };

  const handleIndustrySelectOpen = () => {
    setOpenModal(INDUSTRY_MODAL);
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
        <SearchInput
          onChangeInput={onChangeInput}
          onSearchClick={onSearchClick}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        <SearchResult searchInput={searchInput} showKeyboard={showKeyboard}>
          <Places places={search(searchInput)} />
        </SearchResult>

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
                    data={region}
                    key={index}
                  >
                    <Places name={region.title} places={region.options} />
                  </AccordionWrapper>
                );
            }

            return (
              <AccordionWrapper
                styles={{
                  accordionDetailsHeight: 'unset',
                  accordionDetailsHeightMax: '600px',
                }}
                key={index}
                expanded={expanded}
                handleExpansion={handleExpansion}
                data={region}
              >
                {region.options?.map((option) => (
                  <div
                    key={option.id}
                    style={{
                      flexWrap: 'wrap',
                      gap: '10px',
                    }}
                  >
                    <button
                      className="SecondarySmallDisable"
                      // onClick={() => {
                      //   console.log('Button clicked:', option.name);
                      //   onOptionClick(option.name);
                      // }}
                    >
                      <span>
                        <span className={styles.optionName}>{option.name}</span>
                      </span>
                    </button>
                  </div>
                ))}
              </AccordionWrapper>
            );
          })}
        </div>
      </ModalWithSelect>

      <Select
        handleSelectOpen={handleIndustrySelectOpen}
        selectOpen={selectIndustryOpen}
        name="Отрасль"
      >
        <IndustrySelection
          expanded={expanded}
          handleExpansion={handleExpansion}
          showKeyboard={showKeyboard}
          onChangeInput={onChangeInput}
          onSearchClick={onSearchClick}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </Select>

      <Select
        handleSelectOpen={handleDamageSelectOpen}
        selectOpen={selectDamageOpen}
        name="Ущерб"
      >
        <SelectDamageModal />
      </Select>

      {showKeyboard && (
        <dialog className={styles.keyboard}>
          <Keyboard setSearchInput={setSearchInput} keyboardRef={keyboardRef} />
        </dialog>
      )}
    </div>
  );
};

export default RegionAndOtherButtons;
