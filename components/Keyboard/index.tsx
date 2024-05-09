'use client';

import Image from 'next/image';
import { MutableRefObject, useState } from 'react';
import SimpleKeyBoard from 'react-simple-keyboard';
import keyboardRussianLayouts from '../../data/keyboardRussianLayout';
import { GlobeIcon } from '../../public/main-screen';
import { ENGLISH, RUSSIAN } from '../../constants';
import keyboardEnglishLayouts from '../../data/keyboardEnglishLayout';

import 'react-simple-keyboard/build/css/index.css';
import './Keyboard.scss';
import styles from './Keyboard.module.scss';

interface IKeyBoardProps {
  setSearchInput: TSetString;
  keyboardRef: MutableRefObject<{
    setSearchInput: (input: string) => void;
  } | null>;
}

const Keyboard = ({ setSearchInput, keyboardRef }: IKeyBoardProps) => {
  const [layoutName, setLayoutName] = useState('default');
  const [language, setLanguage] = useState(ENGLISH);

  const onChange = (input: string) => {
    setSearchInput(input);

    console.log('Input changed', input);
  };

  const handleShift = () => {
    let updatedlayoutName = layoutName;
    setLayoutName(updatedlayoutName === 'default' ? 'shift' : 'default');
  };

  const onKeyPress = (button: string) => {
    console.log('Button pressed', button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const toggleLanguage = () => {
    setLanguage(language === ENGLISH ? RUSSIAN : ENGLISH);
    setLayoutName('default');
  };

  return (
    <>
      <SimpleKeyBoard
        keyboardRef={(r) => (keyboardRef.current = r)}
        theme="hg-theme-default myTheme1"
        layoutName={layoutName}
        layout={
          language === ENGLISH ? keyboardEnglishLayouts : keyboardRussianLayouts
        }
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div role="button" className={styles.globeCtn} onClick={toggleLanguage}>
        <Image
          className={styles.globeIcon}
          src={GlobeIcon}
          alt="GlobeIcon"
          width={56}
          height={56}
          priority
        />
      </div>
    </>
  );
};

export default Keyboard;
