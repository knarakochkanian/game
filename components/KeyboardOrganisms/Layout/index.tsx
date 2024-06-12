import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  backspace,
  emogiIcon,
  enterKey,
  globeLanToggle,
  keyboardIcon,
  shift,
} from '../../../public/keyboard';
import KeyBoardRow_1 from '../../../common/KeyBoardRow_1';
import KeyBoardRow_2 from '../../../common/KeyBoardRow_2';
import KeyBoardRow_3 from '../../../common/KeyBoardRow_3';
import {
  getLanguageLayout,
  proccessNewInput,
} from '../../../helpers/helpers_1';
import { BACKSPACE_NAME, DEFAULT, ENGLISH, SHIFT, SHIFT_NAME, SPACE_NAME } from '../../../constants';
import DigitsLayout from '../DigitsLayout';

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
}: ILayoutProps) => {
  const [input, setInput] = useState('');
  const isUppercase = layoutName === SHIFT;
  const handleButtonClick = (button: string) => {
    let newInput = input;
    newInput = proccessNewInput(button, newInput);

    setInput(newInput);
    onChange(newInput);
    onKeyPress(button);
  };

  const onLetterClick = (letter: string) => {
    handleButtonClick(letter);
    if (layoutName === SHIFT) {
      setLayoutName(DEFAULT);
    }
  };

  useEffect(() => {
    if (keyboardRef) {
      keyboardRef({
        setSearchInput: (input: string) => {
          setInput(input);
        },
      });
    }
  }, [keyboardRef]);

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
            <KeyBoardRow_1
              setLayoutName={setLayoutName}
              isUppercase={isUppercase}
              onLetterClick={onLetterClick}
              layout={getLanguageLayout(language)}
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
            <KeyBoardRow_2
              setLayoutName={setLayoutName}
              isUppercase={isUppercase}
              onLetterClick={onLetterClick}
              layout={getLanguageLayout(language)}
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
            <KeyBoardRow_3
              setLayoutName={setLayoutName}
              isUppercase={isUppercase}
              onLetterClick={onLetterClick}
              layout={getLanguageLayout(language)}
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
