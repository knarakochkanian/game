import { useEffect } from "react"
import { proccessActiveBlocks, selectPickedCountries } from "../redux/features/generalSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const useManageBlocksActiveStatus = () => {
const dispatch = useAppDispatch();
const pickedCountries = useAppSelector(selectPickedCountries);

  useEffect(() => {
    dispatch(proccessActiveBlocks());
  }, [JSON.stringify(pickedCountries)]);
}

export default useManageBlocksActiveStatus
