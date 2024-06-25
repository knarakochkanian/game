import { useState } from 'react';
import Image from 'next/image';
import {
  backspace,
  emogiIcon,
  enterKey,
  globeLanToggle,
  keyboardIcon,
  shift,
} from '../../../public/keyboard';
import {
  getLanguageLayout,
  proccessNewInput,
} from '../../../helpers/helpers_1';
import {
  BACKSPACE_NAME,
  DEFAULT,
  ENGLISH,
  SHIFT,
  SHIFT_NAME,
  SPACE_NAME,
} from '../../../constants';
import DigitsLayout from '../DigitsLayout';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectKeyboardInput,
  setKeyboardInput,
} from '../../../redux/features/helpersSlice';
import KeyboardLetters from '../../../common/KeyboardLetters';
import useKeyboardLayoutEffects from '../../../hooks/useKeyboardLayoutEffects';

import styles from './Layout.module.scss';

interface ILayoutProps extends TIsDigitLayoutState, IKeyboardManagementProps {
  setIsDigitLayout: TSetBoolean;
  onToggleLanguage: () => void;
  language: string;
}

const Layout = ({
  language,
  isDigitLayout,
  setIsDigitLayout,
  onToggleLanguage,
  keyboardRef,
  layoutName,
  onChange,
  onKeyPress,
  setShowKeyboard,
  setLayoutName,
  searchInputRef,
  layoutInputProps,
}: ILayoutProps) => {
  const dispatch = useAppDispatch();
  const isUppercase = layoutName === SHIFT;
  const { cursorPosition, input, setCursorPosition, setInput } =
    layoutInputProps;

  const handleButtonClick = (button: string) => {
    const newInput = proccessNewInput(button, input, cursorPosition);
    dispatch(setKeyboardInput(newInput));
    setInput(newInput);
    onChange(newInput);
    onKeyPress(button);
    if (button === SHIFT_NAME) return;
    const cursorChangeSize = button === ':)' ? 2 : 1;

    setCursorPosition((prevPos) =>
      button === BACKSPACE_NAME
        ? Math.max(prevPos - 1, 0)
        : prevPos + cursorChangeSize
    );
  };

  const onLetterClick = (letter: string) => {
    if (layoutName === SHIFT) {
      setLayoutName(DEFAULT);
      handleButtonClick(letter.toUpperCase());
    } else {
      handleButtonClick(letter);
    }
  };

  useKeyboardLayoutEffects(
    searchInputRef,
    cursorPosition,
    setCursorPosition,
    input,
    setInput,
    keyboardRef
  );

  return (
    <>
      {isDigitLayout ? (
        <DigitsLayout
          setShowKeyboard={setShowKeyboard}
          handleButtonClick={handleButtonClick}
          setIsDigitLayout={setIsDigitLayout}
        />
      ) : (
        <div
          className={`${styles.layout} ${
            language === ENGLISH ? styles.english : ''
          }`}
        >
          <div className={styles.row}>
            <KeyboardLetters
              isUppercase={isUppercase}
              letters={getLanguageLayout(language).firstRow}
              onLetterClick={onLetterClick}
            />
            <button
              onClick={() => handleButtonClick(BACKSPACE_NAME)}
              className={styles.backspace}
            >
              <Image
                priority
                src={backspace}
                alt="backspace"
                width={27}
                height={20}
              />
            </button>
          </div>

          <div className={styles.row}>
            <KeyboardLetters
              isUppercase={isUppercase}
              letters={getLanguageLayout(language).secondRow}
              onLetterClick={onLetterClick}
            />
            <button
              onClick={() => setShowKeyboard(false)}
              className={styles.enterKey}
            >
              <Image
                priority
                src={enterKey}
                alt="enterKey"
                width={26}
                height={26}
              />
            </button>
          </div>

          <div className={styles.row}>
            <button
              onClick={() => handleButtonClick(SHIFT_NAME)}
              className={`${styles.shift} ${isUppercase ? styles.isOn : ''}`}
            >
              <Image priority src={shift} alt="shift" width={26} height={26} />
            </button>
            <KeyboardLetters
              isUppercase={isUppercase}
              letters={getLanguageLayout(language).thirdRow}
              onLetterClick={onLetterClick}
            />
            <button
              onClick={() => handleButtonClick(SHIFT_NAME)}
              className={`${styles.shift} ${isUppercase ? styles.isOn : ''}`}
            >
              <Image priority src={shift} alt="shift" width={26} height={26} />
            </button>
          </div>

          <div className={styles.row}>
            <button
              onClick={() => handleButtonClick(':)')}
              className={styles.emogiIcon}
            >
              <Image
                priority
                src={emogiIcon}
                alt="emogiIcon"
                width={23}
                height={23}
              />
            </button>
            <button
              className={styles.switchToDigitsBtn}
              onClick={() => setIsDigitLayout(true)}
            >
              ?123
            </button>
            <button
              onClick={() => handleButtonClick(SPACE_NAME)}
              className={styles.space}
            ></button>
            <button
              onClick={onToggleLanguage}
              className={styles.changeLanguageBtn}
            >
              <Image
                priority
                src={globeLanToggle}
                alt="changeLanguageBtn"
                width={26}
                height={26}
              />
            </button>
            <button
              className={styles.point}
              onClick={() => handleButtonClick('.')}
            >
              .
            </button>
            <button
              onClick={() => setShowKeyboard(false)}
              className={styles.keyboardIcon}
            >
              <Image
                priority
                src={keyboardIcon}
                alt="keyboardIcon"
                width={30}
                height={16}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
