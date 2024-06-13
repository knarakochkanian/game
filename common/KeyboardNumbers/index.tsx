interface IKeyboardNumbersProps {
  numbers: number[];
  handleButtonClick: (button: string) => void;
}

const KeyboardNumbers = ({
  numbers,
  handleButtonClick,
}: IKeyboardNumbersProps) => {
  return numbers.map((number) => (
    <button onClick={() => handleButtonClick(String(number))} key={number}>
      {number}
    </button>
  ));
};

export default KeyboardNumbers;
