import jsonfile from "jsonfile";

export const getQuotes = async () => {
  const res = await jsonfile
    .readFile("src/json/quotes.json")
    .then((obj) => obj)
    .catch((err) => {
      throw new Error(err);
    });

  return res;
};
