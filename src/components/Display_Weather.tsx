import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import "./comCss.css";

// this function only display the current tempeature, icon of the current temperature
// and temperature range of today
function Display_Weather() {
  const weather = useAppSelector((state) => state.input.currentWea);
  const flag = useAppSelector((state) => state.input.display_flag);

  return (
    <div className="dis_view">
      {flag ? (
        <div>
          <div className="display_row_1">
            <Card className="card_view" sx={{ minWidth: 200 }}>
              <Typography
                className="current_temp"
                sx={{ fontSize: 45 }}
                color="text.secondary"
                gutterBottom
              >
                <span>{weather.temp}°F</span>
              </Typography>
            </Card>

            <Card className="card_view_2" sx={{ minWidth: 200 }}>
              <Typography
                sx={{ fontSize: 25 }}
                color="text.secondary"
                gutterBottom
              >
                <img src={weather.icon}></img>
              </Typography>
            </Card>
          </div>
          <div>
            <Card className="card_view_3" sx={{ minWidth: 200 }}>
              <Typography
                className="temp_range"
                sx={{ fontSize: 40 }}
                color="text.secondary"
                gutterBottom
              >
                <span>
                  {weather.temp_min}°F ~ {weather.temp_max}°F
                </span>
              </Typography>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Display_Weather;
