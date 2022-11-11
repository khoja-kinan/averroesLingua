import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { useTranslation } from "react-i18next";
import { AllRolesUrl } from "../../../constants/urls";

export default function FormControlLabelPosition({
  token,
  roleId,
  AllPermissions,
  setPrivilegeDetailsProp,
}) {
  const [isLoading1, setIsLoading1] = useState(true);
  const [PrivilegeDetails, setPrivilegeDetails, PrivilegeDetailsref] = useState(
    []
  );
  const { t } = useTranslation();
  useEffect(() => {
    async function fecthData() {
      await axios
        .get(`${AllRolesUrl}/${roleId}`, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setPrivilegeDetails(response.data.Role_permissions);
            setIsLoading1(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fecthData();
  }, []);
  const handleChange = (event) => {
    let temp = event.target.value;
    PrivilegeDetailsref.current.includes(temp)
      ? setPrivilegeDetails(
          PrivilegeDetailsref.current.filter((item) => item !== temp)
        )
      : setPrivilegeDetails([...PrivilegeDetailsref.current, temp]);
    setPrivilegeDetailsProp(PrivilegeDetailsref.current);
  };
  return (
    <>
      {isLoading1 ? (
        <CircularIndeterminate />
      ) : (
        <>
          <FormLabel component="legend" sx={{ marginBottom: 1, marginTop: 3 }}>
            {t("description.NewPrivilegeRolesTitle")} :
          </FormLabel>
          {AllPermissions.map((permission) => (
            <FormControl component="fieldset" key={permission.id}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value={permission.name}
                  control={
                    <Checkbox
                      checked={
                        PrivilegeDetailsref.current.indexOf(permission.name) !==
                        -1
                      }
                      onChange={handleChange}
                      value={permission.name}
                    />
                  }
                  label={permission.name}
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          ))}
        </>
      )}
    </>
  );
}
