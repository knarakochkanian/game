import { MouseEvent, ReactNode, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import { RegionCategory } from '../../data/attackRegionsData';
import GreenLineBorders from '../GreenLineBorders';
import { INDUSTRY, RESET, top_capitalization } from '../../constants';
import ResetOrSelectAll_2 from '../ResetOrSelectAll_2';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  proccesIndustriesByTitle,
  selectIsAttacking,
} from '../../redux/features/generalSlice';
import {
  selectEventModalId,
  setEventModalId,
} from '../../redux/features/helpersSlice';
import useCloseModal from '../../hooks/useCloseModal';
import EventModal from '../../components/EventModal';
import { proccessPlusOrCloseIconSrc } from '../../helpers/helpers_2';
import { minusSign } from '../../public/main-screen';

import './AccordionWrapper.scss';
import style from './AccordionWrapper.module.scss';

type TStyle = {
  [key: string]: string;
};

interface IAccordionWrapperProps {
  titleHighlighted?: boolean;
  selectedOtionsCount?: number;
  data: RegionCategory;
  children: ReactNode;
  expanded: number;
  styles: TStyle;
  from?: string;
  fromSideNav?: boolean;
  handleExpansion: (panel: any) => (event: any, isExpanded: any) => void;
}

const AccordionWrapper = ({
  titleHighlighted,
  children,
  expanded,
  data,
  from,
  handleExpansion,
  selectedOtionsCount,
  styles,
  fromSideNav,
}: IAccordionWrapperProps) => {
  const dispatch = useAppDispatch();
  const alwaysExpanded = from === 'industryAccordion' && fromSideNav;
  const isAttacking = useAppSelector(selectIsAttacking);
  const eventModalId = useAppSelector(selectEventModalId);
  const {
    accordionBackground,
    accordionDetailsHeight,
    accordionDetailsMaxHeight,
  } = styles;
  const eventModalIsOpen = data.id === eventModalId;
  const eventIsSelected = Boolean(data.event);
  let showPlusIcon: boolean | undefined;
  let allDataSelected;
  const plusOrCloseIconSrc = proccessPlusOrCloseIconSrc(
    eventModalIsOpen,
    isAttacking,
    eventIsSelected
  );

  if (selectedOtionsCount && !alwaysExpanded) {
    showPlusIcon = selectedOtionsCount > 0 && from !== 'industryAccordion';
    allDataSelected = selectedOtionsCount === data.options?.length;
  }

  const summaryStyles = {
    maxWidth: '344px',
    maxHeight: '50px',
    marginRight: '8px',
    marginLeft: '4px',
    marginBottom: `${
      alwaysExpanded && (data.title?.length as number) > 27 ? '15px' : '0'
    }`,
    borderRight: titleHighlighted
      ? `0.941px solid ${isAttacking ? '#5ED1C5' : '#6291FF'}`
      : 'inherit',
    borderLeft: titleHighlighted
      ? `0.941px solid ${isAttacking ? '#5ED1C5' : '#6291FF'}`
      : 'inherit',
    background: titleHighlighted
      ? isAttacking
        ? '#011A17'
        : '#010526'
      : showPlusIcon
      ? '#131E1D'
      : 'inherit',
    paddingLeft: `${alwaysExpanded ? '9px' : '16px'}`,
  };

  const onClick = () => {
    dispatch(
      proccesIndustriesByTitle({
        actionType: RESET,
        title: data.title as string,
      })
    );
  };

  const onPlusClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(setEventModalId(data.id));
  };

  useCloseModal(
    eventModalIsOpen,
    undefined,
    'dialog',
    undefined,
    'number',
    setEventModalId
  );

  useEffect(() => {
    if (!showPlusIcon) {
      dispatch(setEventModalId(-1));
    }
  }, [showPlusIcon]);

  return (
    <>
      {from === INDUSTRY && eventModalIsOpen && (
        <EventModal
          eventName={data.event as string}
          industryName={data.title as string}
        />
      )}
      <Accordion
        disableGutters
        expanded={alwaysExpanded ? true : expanded === data.id}
        onChange={handleExpansion(data.id)}
        sx={{
          backgroundColor: `${
            accordionBackground ? accordionBackground : 'transparent'
          } `,
          color: '#fff',
          boxShadow: 'unset',
        }}
      >
        <AccordionSummary
          style={summaryStyles}
          expandIcon={
            alwaysExpanded ? undefined : (
              <Image
                className={`${style.arrow} ${
                  expanded === data.id ? style.expanded : ''
                } ${from === INDUSTRY ? style.fromIndustry : ''}`}
                src={'onboarding/arrow.svg'}
                alt={'arrow'}
                width={12}
                height={12}
              />
            )
          }
          aria-controls={`${data.id}-content`}
          id={`${data.id}-header`}
        >
          {titleHighlighted && <GreenLineBorders />}
          {showPlusIcon && (
            <button onClick={(event) => onPlusClick(event)}>
              <Image
                className={`${
                  eventModalIsOpen ? style.closeEventIcon : style.plusIcon
                }`}
                src={plusOrCloseIconSrc}
                alt={'plusIcon'}
                width={49}
                height={30}
              />
            </button>
          )}

          <div className={style.titleAndCountCts}>
            <h5
              className={`${style.title} ${
                fromSideNav ? style.fromSideNav : ''
              } ${titleHighlighted ? style.highlighted : ''} ${
                data.title === top_capitalization ? style.topCapitalization : ''
              } ${isAttacking ? '' : style.isProtecting}`}
            >
              {data.title}
            </h5>
            {!allDataSelected && showPlusIcon && expanded !== data.id && (
              <span
                className={`${style.count} ${
                  isAttacking ? '' : style.isProtecting
                }`}
              >
                {selectedOtionsCount}
                <GreenLineBorders width={4} />
              </span>
            )}

            {alwaysExpanded && (
              <button onClick={() => onClick()} className={style.minusButton}>
                <Image
                  src={minusSign}
                  alt="minusSign"
                  width={20}
                  height={20}
                  priority
                />
              </button>
            )}
          </div>
        </AccordionSummary>

        {alwaysExpanded && Boolean(selectedOtionsCount) && (
          <>
            {Boolean(data.event) && (
              <p className={style.eventName}>
                {'['}
                {data.event}
                {']'}
              </p>
            )}
            <p className={style.subIndustryCount}>
              Подотрасль {selectedOtionsCount}
            </p>
          </>
        )}

        <AccordionDetails
          style={{
            flexWrap: 'wrap',
            display: 'flex',
            gap: '10px',
            paddingBottom: fromSideNav ? '4px' : '16px',
            height: fromSideNav ? 'unset' : accordionDetailsHeight,
            maxHeight: fromSideNav ? 'unset' : accordionDetailsMaxHeight,
            overflowY: fromSideNav ? 'visible' : 'auto',
            scrollbarWidth: fromSideNav ? 'unset' : 'none',
            paddingLeft: `${(from === 'leftSideNav' ? '22px' : '16px')}`,
          }}
        >
          {from === INDUSTRY && (
            <ResetOrSelectAll_2
              data={data}
              selectedOtionsCount={selectedOtionsCount}
            />
          )}
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionWrapper;
