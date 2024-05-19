type TSetNumber = React.Dispatch<React.SetStateAction<number>>;
type TSetBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type TSetString = React.Dispatch<React.SetStateAction<string>>;
type TSetModalNews = Dispatch<SetStateAction<INews | undefined>>;
type TDispatch = ThunkDispatch<
  {
    generalReducer: IInitialState;
  },
  undefined,
  UnknownAction
> &
  Dispatch<UnknownAction>;
