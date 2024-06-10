import { MutableRefObject, useEffect } from 'react';

const useScrollToActiveLetter = (
  letterRefs: MutableRefObject<Record<string, HTMLDivElement | null>>,
  currentLetter: string,
  clickedOnLetter: boolean
) => {
  useEffect(() => {
    if (!clickedOnLetter) {
      const activeLetterElement = letterRefs.current[currentLetter];

      if (activeLetterElement) {
        const container = activeLetterElement.parentNode as HTMLElement;

        if (container) {
          setTimeout(() => {
            const containerRect = container.getBoundingClientRect();
            const elementRect = activeLetterElement.getBoundingClientRect();

            const scrollPosition =
              elementRect.top -
              containerRect.top +
              container.scrollTop -
              (container.clientHeight / 2 - elementRect.height / 2);

            container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
          }, 400);
        }
      }
    }
  }, [currentLetter]);
};

export default useScrollToActiveLetter;
