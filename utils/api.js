import data from "../data/eventstocks.json";

export const getStocks = ({
  sortCriteria = undefined,
  searchTerm = "",
} = {}) => {
  let stocks = data["event_stocks"];

  if (searchTerm.length > 0) {
    stocks = getFilteredStocks({ searchTerm, stocks });
  }

  if (sortCriteria) {
    getSortedStocks({ sortCriteria, stocks });
  }

  return stocks;
};

export const getSortedStocks = ({
  sortCriteria,
  searchTerm = "",
  stocks = getStocks(),
}) => {
  let sortedStocks = stocks.sort(
    (s1, s2) => s2[sortCriteria] - s1[sortCriteria]
  );

  if (searchTerm.length > 0) {
    sortedStocks = getFilteredStocks({ searchTerm, sortedStocks });
  }

  return sortedStocks;
};

export const getFilteredStocks = ({
  searchTerm,
  sortCriteria = undefined,
  stocks = getStocks(),
}) => {
  let filteredStocks = stocks.filter((player) => {
    const normalizedName = player.stock.name.toLowerCase();
    return normalizedName.includes(searchTerm.toLowerCase());
  });

  if (sortCriteria) {
    getSortedStocks({ sortCriteria, filteredStocks });
  }

  return filteredStocks;
};
