import axios from "axios";
import { loginUrl } from "../constants/urls";

export const login = async (email, password, remember) => {
  let result = null;
  await axios
    .post(
      loginUrl,
      { email, password, remember },
      { headers: { Accept: "application/json" } }
    )
    .then((response) => {
      if (response.status === 200) {
        result = response;
      }
    })
    .catch((error) => {
      /* console.log(error.response); */
      result = error.response;
    });
  return result;
};
