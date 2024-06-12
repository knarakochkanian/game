const KeyBoardRow_3 = ({
  layout,
  onLetterClick,
  isUppercase,
}: TKeyboardRowProps) => {
  return layout.thirdRow.map((letter, index) => (
    <button onClick={() => onLetterClick(letter)} key={index}>
      {isUppercase ? letter.toUpperCase() : letter}
    </button>
  ));
};

export default KeyBoardRow_3;
