const KeyBoardRow_1 = ({
  layout,
  onLetterClick,
  isUppercase
}: TKeyboardRowProps) => {

  return layout.firstRow.map((letter, index) => (
    <button onClick={() => onLetterClick(letter)} key={index}>
      {isUppercase ? letter.toUpperCase() : letter}
    </button>
  ));
};

export default KeyBoardRow_1;
