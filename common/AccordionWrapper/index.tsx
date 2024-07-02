import { ReactNode } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import { RegionCategory } from '../../data/attackRegionsData';
import GreenLineBorders from '../GreenLineBorders';
import { plusIcon, plusIconProtect } from '../../public/ui_kit';
import { INDUSTRY, top_capitalization } from '../../constants';
import ResetOrSelectAll_2 from '../ResetOrSelectAll_2';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAttacking } from '../../redux/features/generalSlice';

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
}: IAccordionWrapperProps) => {
  const isAttacking = useAppSelector(selectIsAttacking);
  const {
    accordionBackground,
    accordionDetailsHeight,
    accordionDetailsMaxHeight,
  } = styles;

  let showPlusIcon;
  let allDataSelected;

  if (selectedOtionsCount) {
    showPlusIcon = selectedOtionsCount > 0;
    allDataSelected = selectedOtionsCount === data.options?.length;
  }

  const summaryStyles = {
    maxWidth: '364px',
    marginRight: '8px',
    marginLeft: '4px',
    padding: '12px 16px',
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
  };

  return (
    <Accordion
      expanded={expanded === data.id}
      onChange={handleExpansion(data.id)}
      sx={{
        backgroundColor: `${
          accordionBackground ? accordionBackground : 'transparent'
        } `,
        color: '#fff',
        marginBottom:
          showPlusIcon !== undefined || from === INDUSTRY ? '0' : '10px',
      }}
    >
      <AccordionSummary
        style={summaryStyles}
        expandIcon={
          <Image
            className={`${style.arrow} ${
              expanded === data.id ? style.expanded : ''
            } ${from === INDUSTRY ? style.fromIndustry : ''}`}
            src={'onboarding/arrow.svg'}
            alt={'arrow'}
            width={12}
            height={12}
          />
        }
        aria-controls={`${data.id}-content`}
        id={`${data.id}-header`}
      >
        {titleHighlighted && <GreenLineBorders />}
        {showPlusIcon && (
          <Image
            className={style.plusIcon}
            src={isAttacking ? plusIcon : plusIconProtect}
            alt={'plusIcon'}
            width={49}
            height={30}
          />
        )}

        <div className={style.titleAndCountCts}>
          <h5
            className={`${style.title} ${
              titleHighlighted ? style.highlighted : ''
            } ${
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
        </div>
      </AccordionSummary>
      <AccordionDetails
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          gap: '10px',
          height: accordionDetailsHeight,
          maxHeight: accordionDetailsMaxHeight,
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
  );
};

export default AccordionWrapper;
