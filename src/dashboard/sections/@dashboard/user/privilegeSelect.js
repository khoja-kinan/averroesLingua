{
  Object.entries(privilegeRolesList).map((pri) => (
    <MenuItem
      key={pri[0]}
      value={pri[0]}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <InputLabel id="demo-multiple-checkbox-label">{pri[0]}</InputLabel>
      {pri[1].map((item) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={item.id}
        >
          <Checkbox checked={pppp.includes(item.code)} />
          <ListItemText primary={item.code} />
        </Box>
      ))}
    </MenuItem>
  ));
}

/*
 */

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { Box } from "@mui/system";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  Privilege_RolesURL,
  token,
  Privilege_Id,
  privilegeRolesList,
}) {
  const [isLoading1, setIsLoading1] = useState(true);
  const [PrivilegeRoles, setPrivilegeRoles] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    async function fecthData() {
      axios
        .get(`${Privilege_RolesURL}/${Privilege_Id}`, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            if (data.status === 1) {
              let result = data.roles;
              setPrivilegeRoles(result);
              setIsLoading1(false);
            }
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fecthData();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTest(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  let pppp = [];
  Object.entries(PrivilegeRoles).map((item) =>
    item[1].map((it) => pppp.push(it.code))
  );

  let pp = [];
  Object.entries(privilegeRolesList).map((item) =>
    item[1].map((it) => pp.push(it.code))
  );
  return (
    <div>
      {isLoading1 ? (
        <CircularIndeterminate />
      ) : (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={pppp}
            onChange={handleChange}
            input={<OutlinedInput label="Roles" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {pppp.map((privilege) => (
              <MenuItem key={privilege} value={privilege}>
                <Checkbox checked={pppp.indexOf(privilege) > -1} />
                <ListItemText primary={privilege} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
