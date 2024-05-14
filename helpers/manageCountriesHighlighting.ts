import { DEFAULT_COLOR } from "../components/Map/theme";
import { TSetCountryColor, TFocusOnCountry, TSetCountryContourVisibility } from "../hooks/useManagePlaceClick";
import { removeFromPickedCountries, addToPickedCountries } from "../redux/features/generalSlice";
import { AppDispatch } from "../redux/store";

export type ManageCountriesHighlightingParameters = {
  name: string,
  pickedCountries: string[],
  setCountryColor: TSetCountryColor,
  focusOnCountry: TFocusOnCountry,
  setCountryContourVisibility: TSetCountryContourVisibility,
  highlightColor: string,
  dispatch: AppDispatch,
}

export const manageCountriesHighlighting = ({
  name,
  pickedCountries,
  setCountryColor,
  focusOnCountry,
  setCountryContourVisibility,
  highlightColor,
  dispatch,
}: ManageCountriesHighlightingParameters) => {
  if (pickedCountries.includes(name)) {
    dispatch(removeFromPickedCountries(name));
    setCountryColor(name, DEFAULT_COLOR)
  } else {
    dispatch(addToPickedCountries(name));
    setCountryColor(name, highlightColor)
    focusOnCountry(name);
  }
}
