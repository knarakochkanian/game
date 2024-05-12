import { ReactNode, createContext, useState } from 'react';

type MainScreenContextType = {
  isAttacking: boolean;
  setIsAttacking: TSetBoolean;
};

export const MainScreenContext = createContext<MainScreenContextType>({
  isAttacking: true,
  setIsAttacking: () => {},
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [isAttacking, setIsAttacking] = useState(true);

  return (
    <MainScreenContext.Provider value={{ isAttacking, setIsAttacking }}>
      {children}
    </MainScreenContext.Provider>
  );
};
