import jsonfile from "jsonfile";

export const getAuth = async () => {
  const res = await jsonfile
    .readFile("src/json/auth.json")
    .then((obj) => obj)
    .catch((err) => {
      throw new Error(err);
    });

  return res;
};
