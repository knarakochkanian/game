const KeyboardLetters = ({
  onLetterClick,
  isUppercase,
  letters,
}: TKeyboardLettersProps) => {
  const isFirstRow = letters[0] === 'й' || letters[0] === 'q';

  return letters.map((letter, index) => (
    <button onClick={() => onLetterClick(letter)} key={index}>
      {isUppercase ? letter.toUpperCase() : letter}
      {isFirstRow && index < 10 && <span>{index === 9 ? 0 : index + 1}</span>}
    </button>
  ));
};

export default KeyboardLetters;
