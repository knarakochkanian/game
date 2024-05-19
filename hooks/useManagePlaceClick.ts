import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addToPickedCountries,
  removeFromPickedCountries,
  selectFirstClick,
  selectIsAttacking,
  selectPickedCountries,
  selectPlaceName,
  setSingleRegionStatus,
} from '../redux/features/generalSlice';
import {
  DEFAULT_COLOR,
  PICKED_COLOR,
  PROTECT_BLUE,
} from '../components/Map/theme';
import {
  getParentCountyNameByRegionName,
  getRegionsNamesByCountryName,
} from '../components/Map/utils/utils';
import { complexCountriesNames } from '../components/Map/geodata/complex-countries';
import { manageRegionHighlighting } from '../helpers';

export type TSetCountryColor = (
  name: string | string[],
  color?: string | undefined
) => void;

export type TFocusOnCountry = (name: string) => void;

export type TSetCountryContourVisibility = (
  name: string | string[],
  visible: boolean
) => void;

const useManagePlaceClick = (
  setCountryColor: TSetCountryColor,
  focusOnCountry: TFocusOnCountry,
  setCountryContourVisibility: TSetCountryContourVisibility
) => {
  const dispatch = useAppDispatch();
  const pickedCountries: string[] = useAppSelector(selectPickedCountries);
  const firstClick = useAppSelector(selectFirstClick);
  const isAttacking = useAppSelector(selectIsAttacking);
  const highlightColor = isAttacking ? PICKED_COLOR : PROTECT_BLUE;

  const regionsNames = useMemo(() => {
    const regionsNames: string[] = [];
    complexCountriesNames.forEach((name) => {
      regionsNames.push(...getRegionsNamesByCountryName(name));
    });
    return regionsNames;
  }, []);

  const clickedPlaceName = useAppSelector(selectPlaceName);

  useEffect(() => {
    const handleTerritoryHighlighing = (name: string) => {
      if (pickedCountries.includes(name)) {
        setCountryColor(name, DEFAULT_COLOR);
        dispatch(removeFromPickedCountries(name));
      } else {
        setCountryColor(name, highlightColor);
        focusOnCountry(name);
        dispatch(addToPickedCountries(name));
      }
    };

    switch (typeof clickedPlaceName) {
      case 'string':
        if (!regionsNames.includes(clickedPlaceName)) {
          handleTerritoryHighlighing(clickedPlaceName);
        }

        // если кликнули по региону страны, то сначала отображаем контуры регионов
        const parentCountry = getParentCountyNameByRegionName(clickedPlaceName);
        if (!parentCountry) {
          return;
        }

        handleTerritoryHighlighing(clickedPlaceName);

        // определить, выделена ли сама страна
        if (!pickedCountries.includes(parentCountry)) {
          // если не выделена, то выделить контуры регионов
          const regions = getRegionsNamesByCountryName(parentCountry);
          setCountryContourVisibility(regions, true);
          dispatch(addToPickedCountries(parentCountry));
        }

        dispatch(setSingleRegionStatus({ parentCountry, region: clickedPlaceName }));

        return;

      case 'object': //array of strings
        clickedPlaceName.forEach((placeName) => {
          if (!regionsNames.includes(placeName)) {
            handleTerritoryHighlighing(placeName);
          }

          manageRegionHighlighting(
            setCountryContourVisibility,
            pickedCountries,
            dispatch,
            placeName,
            handleTerritoryHighlighing
          );
        });
        return;
    }
  }, [clickedPlaceName, firstClick]);
};

export default useManagePlaceClick;
