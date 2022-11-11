import Box from "@mui/material/Box";
import heroVideo from "../../assets/hero/averrose.webp";

const AviVideo = () => {
  return (
    <Box
      data-aos="zoom-in"
      data-aos-duration="1500"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        marginTop: "5rem",
      }}
    >
      <img
        src={heroVideo}
        alt="avi"
        style={{
          width: "100%",
          height: "auto",
          gridColumnStart: "4",
          gridColumnEnd: "10",
        }}
        className="aviVideoMobile"
      />
    </Box>
  );
};

export default AviVideo;
