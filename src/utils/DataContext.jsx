import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  createContext,
} from 'react';

const DataContext = createContext({});

const DataContextProvider = ({ children }) => {
  const [portfolioDetails, setPortfolioDetails] = useState([
    { stock: 'IBM', quantity: 100 },
  ]);

  const handlePortfolioDetailsQuantityChange = useCallback((stock, value) => {
    setPortfolioDetails((prev) => {
      const tempDetails = prev.map((item) => {
        if (item.stock === stock) {
          return { stock: item.stock, quantity: value };
        }
        return item;
      });
      return tempDetails;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      portfolioDetails,
      handlePortfolioDetailsQuantityChange,
    }),
    [portfolioDetails, handlePortfolioDetailsQuantityChange]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
