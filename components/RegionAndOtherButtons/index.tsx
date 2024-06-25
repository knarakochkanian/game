'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import BaseButton from '../../common/BaseButtton';
import ModalWithSelect from '../../common/Modals/ModalWithSelect';
import { notFriendlyCountries, regions } from '../../data/attackRegionsData';
import Keyboard from '../KeyboardOrganisms/Keyboard';
import useCloseModal from '../../hooks/useCloseModal';
import Places from '../Places';
import { search } from '../../helpers';
import {
  COUNTRIES,
  DAMAGE_LEVEL_MODAL,
  INDUSTRY_MODAL,
  MOST_LIKELY_CHOICE,
  NOT_FRIENDLY_COUNTRIES,
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
import { useAppSelector } from '../../redux/hooks';
import { selectPlaces } from '../../redux/features/generalSlice';
import { USARegions } from '../../data/countriesWithCodes';
import useCloseSelection from '../../hooks/useCloseSelection';
import CountryBlocks from '../CountryBlocks';

import styles from './RegionAndOtherButtons.module.scss';
import useResetSearch from '../../hooks/useResetSearch';
import { selectKeyboardInput } from '../../redux/features/helpersSlice';

interface IRegionAndOtherButtonsProps {
  drawerOpen: boolean;
  setDrawerOpen: TSetBoolean;
  isAttacking: boolean;
}

const RegionAndOtherButtons = ({
  // drawerOpen,
  // setDrawerOpen,
  isAttacking,
}: IRegionAndOtherButtonsProps) => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [openModal, setOpenModal] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectDamageOpen, setSelectDamageOpen] = useState(false);
  const [selectIndustryOpen, setSelectIndustryOpen] = useState(false);
  const countries = useAppSelector(selectPlaces);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const defaultInputValue = useAppSelector(selectKeyboardInput);
  const [input, setInput] = useState(defaultInputValue || '');
  const [cursorPosition, setCursorPosition] = useState(0);

  const layoutInputProps = {
    input,
    setInput,
    cursorPosition,
    setCursorPosition,
  };

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

  useResetSearch(openModal, setSearchInput, setInput, setCursorPosition);

  useCloseSelection(
    setSelectOpen,
    setSelectDamageOpen,
    setSelectIndustryOpen,
    setOpenModal
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

      <ModalWithSelect from="main" isOpen={selectOpen} onClose={() => {}}>
        <SearchInput
          setCursorPosition={setCursorPosition}
          setInput={setInput}
          searchInputRef={searchInputRef}
          onChangeInput={onChangeInput}
          onSearchClick={onSearchClick}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        <SearchResult searchInput={searchInput} showKeyboard={showKeyboard}>
          <Places places={search(searchInput)} />
        </SearchResult>

        <div
          className={`${styles.accordionsContainer} ${
            showKeyboard || searchInput ? styles.hideSelectionPanel : ''
          }`}
        >
          {regions[0].regions?.map((region, index) => {
            let placesInSwitch;

            switch (region.title) {
              case REGIONS:
                placesInSwitch = USARegions;

                break;
              case COUNTRIES:
                placesInSwitch = countries;

                break;
              case NOT_FRIENDLY_COUNTRIES:
                placesInSwitch = countries.filter((country) =>
                  notFriendlyCountries?.includes(country.name)
                );
                break;
            }

            switch (region.title) {
              case REGIONS:
              case COUNTRIES:
                return (
                  <AccordionWrapper
                    styles={{ accordionDetailsHeight: '510px' }}
                    expanded={expanded}
                    handleExpansion={handleExpansion}
                    data={region}
                    key={index}
                  >
                    <Places name={region.title} places={placesInSwitch} />
                  </AccordionWrapper>
                );

              case NOT_FRIENDLY_COUNTRIES:
                return (
                  isAttacking && (
                    <AccordionWrapper
                      styles={{ accordionDetailsHeight: '510px' }}
                      expanded={expanded}
                      handleExpansion={handleExpansion}
                      data={region}
                      key={index}
                    >
                      <Places name={region.title} places={placesInSwitch} />
                    </AccordionWrapper>
                  )
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
                <CountryBlocks
                  options={
                    !isAttacking && region.title === MOST_LIKELY_CHOICE
                      ? region.optionsForProtection
                      : region.options
                  }
                />
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
          setCursorPosition={setCursorPosition}
          setInput={setInput}
          searchInputRef={searchInputRef}
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
          <Keyboard
            layoutInputProps={layoutInputProps}
            searchInputRef={searchInputRef}
            setShowKeyboard={setShowKeyboard}
            setSearchInput={setSearchInput}
            keyboardRef={keyboardRef}
          />
        </dialog>
      )}
    </div>
  );
};

export default RegionAndOtherButtons;
