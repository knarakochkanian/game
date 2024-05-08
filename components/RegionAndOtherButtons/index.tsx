'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  InputBase,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import BaseButton from '../../common/BaseButtton';
import Modal from '../../common/Modals/Modal';
import ModalWithSelect from '../../common/Modals/ModalWithSelect';
import { Region, regions } from '../../data/attackRegionsData';

import styles from './RegionAndOtherButtons.module.scss';

interface IRegionAndOtherButtonsProps {
  drawerOpen: boolean;
  setDrawerOpen: TSetBoolean;
}

const RegionAndOtherButtons = ({
  drawerOpen,
  setDrawerOpen,
}: IRegionAndOtherButtonsProps) => {
  const [modalOpen3, setModalOpen3] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);

  const [expanded, setExpanded] = useState(regions[0].id);

  const closeModal3 = () => setModalOpen3(false);

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

  return (
    <div className={styles.regionAndOtherButtons}>
      <BaseButton active={selectOpen} onClick={handleSelectOpen}>
        Регион
      </BaseButton>

      <ModalWithSelect isOpen={selectOpen} onClose={() => {}}>
        <div className={styles.regionAndOtherButtonsInput}>
          <InputBase
            sx={{ ml: 1, flex: 1, color: '#D9D9D9', fontSize: '34px' }}
            placeholder="Поиск"
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: '10px', color: '#D9D9D9' }}
            aria-label="search"
          >
            <SearchIcon
              sx={{ color: '#D9D9D9', width: '48px', height: '48px' }}
            />
          </IconButton>
        </div>

        <div>
          {regions[0].regions?.map((region, index) => (
            <Accordion
              key={index}
              expanded={String(expanded) === region.id}
              onChange={handleExpansion(region.id)}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
                color: '#fff',
                marginBottom: '10px',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${region.id}-content`}
                id={`${region.id}-header`}
              >
                <h5>{region.title}</h5>
              </AccordionSummary>
              <AccordionDetails
                style={{ flexWrap: 'wrap', display: 'flex', gap: '10px' }}
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
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </ModalWithSelect>
      <Modal
        isOpen={modalOpen3}
        onClose={closeModal3}
        counter={3}
        sx={{ left: '30%', position: 'fixed' }}
      >
        <p>
          {' '}
          Возможен выбор группы стран с помощью быстрых фильтров, списка или
          поиска.
        </p>
        <p> Нажмите на “США”, чтобы добавить страну в задачу.</p>
        <div className="ModalButtons">
          <button className="ModalButton1">далее</button>
          <button className="SecondarySmall" onClick={closeModal3}>
            <span>пропустить</span>
          </button>
        </div>
      </Modal>

      <BaseButton disabled={true}>Отрасль</BaseButton>
      <BaseButton disabled={true}>Ущерб</BaseButton>
    </div>
  );
};

export default RegionAndOtherButtons;
