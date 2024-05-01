import BackButton from '../BackButton';
import ForwardButton from '../ForwardButton';

interface IBackAndForwardBtnsProps {
  onBack: () => void;
  onForward: () => void;
}

const BackAndForwardBtns = ({
  onBack,
  onForward,
}: IBackAndForwardBtnsProps) => {
  return (
    <>
      <BackButton onBack={onBack} />
      <ForwardButton onForward={onForward} />
    </>
  );
};

export default BackAndForwardBtns;
