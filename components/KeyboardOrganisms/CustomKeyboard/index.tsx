import { useState } from 'react';
import { ENGLISH } from '../../../constants';
import Layout from '../Layout';

import styles from './CustomKeyboard.module.scss';

interface ICustomKeyboardProps extends IKeyboardManagementProps {
  onToggleLanguage: () => void;
  language: string;
}

const CustomKeyboard = ({
  language,
  keyboardRef,
  layoutName,
  onChange,
  onKeyPress,
  onToggleLanguage,
  setShowKeyboard,
  setLayoutName,
}: ICustomKeyboardProps) => {
  const [isDigitLayout, setIsDigitLayout] = useState(false);

  return (
    <div
      className={`${styles.keyboard} ${
        language === ENGLISH ? styles.english : ''
      }`}
    >
      <Layout
        setLayoutName={setLayoutName}
        setShowKeyboard={setShowKeyboard}
        onToggleLanguage={onToggleLanguage}
        onKeyPress={onKeyPress}
        onChange={onChange}
        layoutName={layoutName}
        keyboardRef={keyboardRef}
        isDigitLayout={isDigitLayout}
        language={language}
        setIsDigitLayout={setIsDigitLayout}
      />
    </div>
  );
};

export default CustomKeyboard;
