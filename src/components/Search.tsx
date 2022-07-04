import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  setInput,
  setDay_1,
  setDay_2,
  setDay_3,
  setDay_4,
  setDay_5,
  setCurrentWea,
  setDisplayFlag,
} from "./inputSlice";
import debounce from "lodash/debounce";
import React, { useCallback } from "react";
import "./comCss.css";

// search functions display an autocomplete textfield
// receive input and search the weather
// set weather data after fetching api
function Search() {
  const dispatch = useAppDispatch();
  const input = useAppSelector((state) => state.input.value);

  const [locations, setLocations] = React.useState<any[]>([]);
  const url =
    "https://api.openweathermap.org/geo/1.0/direct?q=input&limit=10&appid={API KEY}";

  const url2 =
    "https://api.openweathermap.org/data/2.5/forecast?lat=data1&lon=data2&units=imperial&appid={API KEY}";

  const url3 =
    "https://api.openweathermap.org/data/2.5/weather?lat=data1&lon=data2&units=imperial&appid={API KEY}";

  // search for the location entered
  async function findLocation(value: string) {
    try {
      fetch(url.replace("input", value))
        .then((res) => res.json())
        .then((data) => {
          setLocations(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // handle function for onchange input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    changeDebounced(e.target.value);
  }

  // handles the change of input, only fetch after 3 seconds when the input finish
  const changeDebounced = useCallback(
    debounce((value) => findLocation(value), 3000),
    []
  );

  // after option selected fetch the selected option to get data
  // two fetch execute here
  // 1 fetch the forecase(5 day weather)
  // 2 fetch the current weather
  async function fetchSelectedOption(LocationObj: any) {
    try {
      var newUrl = url2.replace("data1", LocationObj.lat);
      newUrl = newUrl.replace("data2", LocationObj.lon);
      fetch(newUrl)
        .then((res) => res.json())
        .then((data) => {
          setData_5day(data);
        });

      var newUrl2 = url3.replace("data1", LocationObj.lat);
      newUrl2 = newUrl2.replace("data2", LocationObj.lon);
      fetch(newUrl2)
        .then((res) => res.json())
        .then((data2) => {
          setCurrentWeather(data2);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // set data after the calling api for current weather
  function setCurrentWeather(weather: any) {
    var url = "https://openweathermap.org/img/wn/Icon@2x.png";
    url = url.replace("Icon", weather.weather[0].icon);
    var result: object = {
      temp_min: weather.main.temp_min,
      temp_max: weather.main.temp_max,
      temp: weather.main.temp,
      icon: url,
    };
    dispatch(setCurrentWea(result));
  }

  // set data after the calling api for forecase(5 day) data
  function setData_5day(data: any) {
    var sliceData = data.list.slice(0, 8);
    dispatch(setDay_1(extractData_single_day(sliceData)));
    var sliceData = data.list.slice(8, 16);
    dispatch(setDay_2(extractData_single_day(sliceData)));
    var sliceData = data.list.slice(16, 24);
    dispatch(setDay_3(extractData_single_day(sliceData)));
    var sliceData = data.list.slice(24, 32);
    dispatch(setDay_4(extractData_single_day(sliceData)));
    var sliceData = data.list.slice(32, 40);
    dispatch(setDay_5(extractData_single_day(sliceData)));
    dispatch(setDisplayFlag(true));
  }

  // extract details from the object and set them into one object
  function extractData_single_day(data: any): any {
    var min: number = Number.POSITIVE_INFINITY;
    var max: number = Number.NEGATIVE_INFINITY;
    var date: string;

    for (let i = 0; i < data.length; i++) {
      if (data[i].main.temp_min < min) {
        min = data[i].main.temp_min;
      }
      if (data[i].main.temp_max > max) {
        max = data[i].main.temp_max;
      }
    }

    var result = {
      temp_min: min,
      temp_max: max,
      date: data[0].dt_txt.slice(5, 10),
    };

    return result;
  }

  return (
    <div className="search_bar">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={locations}
        getOptionLabel={(locations) =>
          locations.name + " " + locations.state + " " + locations.country
        }
        onChange={(event, value) => fetchSelectedOption(value)}
        filterOptions={(options, state) => options} // this line can help you refresh out the options
        sx={{ width: 300 }}
        PaperComponent={({ children }) => (
          <Paper style={{ background: "rgb(118, 181, 230)" }}>{children}</Paper>
        )}
        renderInput={(params) => (
          <TextField
            className="text_field"
            {...params}
            value={input}
            onChange={handleChange}
            label="Search Your City"
          />
        )}
      />
    </div>
  );
}

export default Search;
