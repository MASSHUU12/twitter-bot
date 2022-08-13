import jsonfile from "jsonfile";

export const saveJSON = (file: "auth" | "tokens", data: {}) => {
  jsonfile.writeFile(`src/json/${file}.json`, data);
};
