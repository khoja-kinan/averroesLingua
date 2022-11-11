import Box from "@mui/material/Box";
import AVELoading from "../../assets/loading/AVELoading.webp";
const Loading = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={AVELoading}
        alt="Loading Web site"
        style={{
          display: "block",
          position: "relative",
          width: "40%",
          verticalAlign: "middle",
        }}
        className="mobileLoading"
      />
    </Box>
  );
};

export default Loading;
