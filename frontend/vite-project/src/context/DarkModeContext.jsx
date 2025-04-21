import { createContext, useState, useContext } from 'react';

const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};