import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
const UnderHeroSection = () => {
  return (
    <div className="row mt-4">
      <div className="col">
        <span className="underheroText">
          <LocalShippingOutlinedIcon sx={{ margin: "0 5px 0 0" }} />
          Free Shipping
        </span>

        <span className="underheroText">
          <SupportAgentOutlinedIcon sx={{ margin: "0 5px 0 30px" }} />
          24 hour customer service
        </span>

        <span className="underheroText">
          <ForwardOutlinedIcon sx={{ margin: "0 5px 0 30px" }} />
          Great return policy
        </span>
      </div>
    </div>
  );
};

export default UnderHeroSection;
