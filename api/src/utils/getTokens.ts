import jsonfile from "jsonfile";

export const getTokens = async () => {
  const res = await jsonfile
    .readFile("src/json/tokens.json")
    .then((obj) => obj)
    .catch((err) => {
      throw new Error(err);
    });

  return res;
};
