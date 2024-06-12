const KeyBoardRow_2 = ({
  layout,
  onLetterClick,
  isUppercase,
}: TKeyboardRowProps) => {
  return layout.secondRow.map((letter, index) => (
    <button onClick={() => onLetterClick(letter)} key={index}>
      {isUppercase ? letter.toUpperCase() : letter}
    </button>
  ));
};

export default KeyBoardRow_2;
