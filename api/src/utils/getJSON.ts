import jsonfile from "jsonfile";

/**
 * Returns the contents of the JSON file.
 *
 * @returns Promise<any>
 */
export const getJSON = async (file: "auth" | "tokens"): Promise<any> => {
  const res = await jsonfile
    .readFile(`src/json/${file}.json`)
    .then((obj) => obj)
    .catch((err) => {
      throw new Error(err);
    });

  return res;
};
