type TLanguageState = {
  language: string;
  setLanguage: TSetString;
};

type TIsDigitLayoutState = {
  isDigitLayout: boolean;
  setIsDigitLayout: TSetBoolean;
}

type TKeyboardRowProps = {
  setLayoutName: TSetString;
  isUppercase: boolean;
  layout: TLayout;
  onLetterClick: (letter: string) => void
}
