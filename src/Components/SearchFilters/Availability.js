 
import "./Styles/FilterStyles.css";
import { Box } from "@mui/material";
import CheckBoxFilter from "./CheckBoxFilter";
const Availability = ({ currentQuery }) => {

  return (
    <>
      <Box marginTop={"-20px"}>
        <CheckBoxFilter
          currentQuery={currentQuery}
          filterOne="onlineAvailability=true"
          labelOne="Online"
          idOne="online"
        />
        <CheckBoxFilter
          currentQuery={currentQuery}
          filterOne="inStoreAvailability=true"
          labelOne="In Store"
          idOne="instore"
        />
      </Box>
      
    </>
  );
};

export default Availability;
