type TLanguageState = {
  language: string;
  setLanguage: TSetString;
};

type TIsDigitLayoutState = {
  isDigitLayout: boolean;
  setIsDigitLayout: TSetBoolean;
}

type TKeyboardLettersProps = {
  letters: string[];
  isUppercase: boolean;
  onLetterClick: (letter: string) => void
}
