import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import React from "react";
import "./comCss.css";

//navbar with nothing only the names
function NavBar() {
  const dispatch = useAppDispatch();
  const input = useAppSelector((state) => state.input.value);
  const [b_input, setb_input] = React.useState<string>("");

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar className="t_bar">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            WeatherSearch
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
