'use client';
import { MutableRefObject, useState } from 'react';
import SimpleKeyBoard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';
import './Keyboard.scss';

interface IKeyBoardProps {
  setSearchInput: TSetString;
  keyboardRef: MutableRefObject<{
    setSearchInput: (input: string) => void;
  } | null>;
}

const Keyboard = ({ setSearchInput, keyboardRef }: IKeyBoardProps) => {
  const [layoutName, setLayoutName] = useState('default');

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

  return (
      <SimpleKeyBoard
        keyboardRef={(r) => (keyboardRef.current = r)}
        theme="hg-theme-default myTheme1"
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
  );
};

export default Keyboard;
