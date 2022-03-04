import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  createContext,
} from 'react';
import axios from 'axios';

const DataContext = createContext({});

const DataContextProvider = ({ children }) => {
  const userDatabase = useMemo(
    () => [
      {
        name: 'Joe Bloggs',
        email: 'joe@abc.com',
        password: '1234',
      },
      {
        name: 'Jane Doe',
        email: 'jane@abc.com',
        password: '1234',
      },
    ],
    []
  );

  const [userDetails, setUserDetails] = useState({});

  const signIn = useCallback(
    (email, password) => {
      const user = userDatabase.find((item) => item.email === email);
      if (user.password === password) {
        setUserDetails(user);
      }
    },
    [userDatabase]
  );
  const signOut = useCallback(() => {
    setUserDetails({});
  }, []);

  const [portfolioDetails, setPortfolioDetails] = useState([
    { stock: 'IBM', quantity: 500, data: [] },
    { stock: 'AAPL', quantity: 600, data: [] },
    { stock: 'AMZN', quantity: 150, data: [] },
    { stock: 'TSLA', quantity: 200, data: [] },
  ]);

  const [loading, setLoading] = useState(true);
  const [apiLimit, setApiLimit] = useState(false);

  const fetchStockData = async (stock) => {
    let returnValue = {};
    try {
      const res = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'TIME_SERIES_WEEKLY_ADJUSTED',
          symbol: stock,
          apikey: process.env.REACT_APP_ALPHA_VANTAGE,
        },
      });
      if (res.status !== 200) {
        console.log('Status:', `${res.status} - ${res.statusText}`);
      } else if (res.data.Note?.includes('Thank you for using')) {
        setLoading(false);
        setApiLimit(true);
        return returnValue;
      } else {
        const timeSeriesData = res.data['Weekly Adjusted Time Series'];
        const tempData = [];
        for (const key in timeSeriesData) {
          const dateSplit = key.split('-');
          const tempDate = new Date(
            dateSplit[0],
            dateSplit[1] - 1,
            dateSplit[2]
          );
          const startDate = new Date('2017', '2', '0');
          if (tempDate >= startDate) {
            tempData.push({
              date: tempDate,
              close: Number(timeSeriesData[key]['5. adjusted close']),
              volume: Number(timeSeriesData[key]['6. volume']),
            });
          }
        }
        tempData.sort((a, b) => a.date - b.date);
        const latestDate = tempData[tempData.length - 1].date;
        const latestClose = tempData[tempData.length - 1].close;
        const latestVolume = tempData[tempData.length - 1].volume;
        returnValue = {
          latestDate,
          latestClose,
          latestVolume,
          data: tempData,
        };
      }
    } catch (error) {
      console.error(error);
    }
    return returnValue;
  };

  // Not viable to include sector/country etc due to api limits...

  /* const fetchStockOverview = async (stock) => {
    let returnValue = {};
    try {
      const res = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'OVERVIEW',
          symbol: stock,
          apikey: process.env.REACT_APP_ALPHA_VANTAGE2,
        },
      });
      if (res.status !== 200) {
        console.log('Status:', `${res.status} - ${res.statusText}`);
      } else {
        console.log(res);
        returnValue = { sector: res.data.Sector, country: res.data.Country };
      }
    } catch (error) {
      console.log(error);
    }
    return returnValue;
  }; */

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setApiLimit(false);
    const tempPortfolioDetails = [];
    for (const item of portfolioDetails) {
      // eslint-disable-next-line
      const stockData = await fetchStockData(item.stock);
      // eslint-disable-next-line
      /*  const overview = await fetchStockOverview(item.stock); */
      tempPortfolioDetails.push({
        stock: item.stock,
        quantity: item.quantity,
        /* sector: overview.sector,
        country: overview.country, */
        latestDate: stockData.latestDate,
        latestClose: stockData.latestClose,
        latestVolume: stockData.latestVolume,
        data: stockData.data,
      });
    }
    if (
      tempPortfolioDetails[tempPortfolioDetails.length - 1].data !== undefined
    ) {
      setPortfolioDetails(tempPortfolioDetails);
      setLoading(false);
    }
  }, [portfolioDetails]);

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line
  }, []);

  const handlePortfolioDetailsQuantityChange = useCallback((stock, value) => {
    setPortfolioDetails((prev) => {
      const tempDetails = prev.map((item) => {
        if (item.stock === stock) {
          return { ...item, stock: item.stock, quantity: value };
        }
        return item;
      });
      return tempDetails;
    });
  }, []);

  const handlePortfolioDetailsDelete = useCallback((stock) => {
    setPortfolioDetails((prev) => {
      const tempDetails = prev.filter((item) => item.stock !== stock);
      return tempDetails;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      portfolioDetails,
      loading,
      apiLimit,
      userDetails,
      handlePortfolioDetailsQuantityChange,
      handlePortfolioDetailsDelete,
      signIn,
      signOut,
    }),
    [
      portfolioDetails,
      loading,
      apiLimit,
      userDetails,
      handlePortfolioDetailsQuantityChange,
      handlePortfolioDetailsDelete,
      signIn,
      signOut,
    ]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
