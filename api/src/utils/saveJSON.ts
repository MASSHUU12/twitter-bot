import jsonfile from "jsonfile";

/**
 * Saves the data to a JSON file.
 *
 * @returns void
 */
export const saveJSON = (file: "auth" | "tokens", data: {}): void => {
  jsonfile.writeFile(`src/json/${file}.json`, data);
};
