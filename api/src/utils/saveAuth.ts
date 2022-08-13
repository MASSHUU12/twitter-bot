import jsonfile from "jsonfile";

export const saveAuth = (codeVerifier: string, state: string) => {
  const object = {
    codeVerifier: codeVerifier,
    state: state,
  };

  jsonfile.writeFile("src/json/auth.json", object);
};
