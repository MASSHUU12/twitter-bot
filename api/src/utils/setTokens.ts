import jsonfile from "jsonfile";

export const setTokens = async (accessToken: string, refreshToken: string) => {
  const object = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  jsonfile.writeFile("src/json/tokens.json", object);
};
