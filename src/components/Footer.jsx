import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        py: 2,
        px: 4,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} HR App
      </Typography>
    </Box>
  );
};

export default Footer;
