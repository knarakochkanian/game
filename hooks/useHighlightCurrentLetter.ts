import { MutableRefObject, RefObject, useEffect } from 'react';

const useHighlightCurrentLetter = (
  isCountry: boolean,
  letters: string[],
  currentLetter: string,
  setCurrentLetter: TSetString,
  containerRef: RefObject<HTMLDivElement>,  
  countryRefs: MutableRefObject<Record<string, HTMLDivElement | null>>,  
) => {
  useEffect(() => {
    if (isCountry) {
      const listElement = containerRef.current;
      listElement?.addEventListener('scroll', highlightCurrentLetter);

      return () => {
        listElement?.removeEventListener('scroll', highlightCurrentLetter);
      };
    }
  }, [isCountry]);

  const highlightCurrentLetter = () => {
    const listElement = containerRef.current;
    if (!listElement) return;

    const listTop = listElement.getBoundingClientRect().top;
    const scrollTop = listElement.scrollTop;
    let newCurrentLetter = letters[0];

    if (scrollTop === 0) {
      setCurrentLetter(letters[0]);
      return;
    }

    for (let letter of letters) {
      const element = countryRefs.current[letter];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top - listTop <= 200) {
          newCurrentLetter = letter;
        }
      }
    }

    if (newCurrentLetter !== currentLetter) {
      setCurrentLetter(newCurrentLetter);
    }
  };
};

export default useHighlightCurrentLetter;
