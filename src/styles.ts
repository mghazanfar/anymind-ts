import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage:
        "url(https://st4.depositphotos.com/12371120/19860/i/1600/depositphotos_198605068-stock-photo-mermaid-scale-ocean-wave-japanese.jpg)",
    },
    paperContainer: {
      width: "100%",
    },
    downButton: {
      left: "48%",
      bottom: -2,
      position: "sticky !important" as any,
      backgroundColor: "rgb(69, 137, 185) !important",
      color: "white !important",
    },
    upButton: {
      left: "48%",
      top: -13,
      position: "sticky !important" as any,
      backgroundColor: "rgb(69, 137, 185) !important",
      color: "white !important",
    },
    wallpaperItem: {
      borderRadius: 8,
      border: "5px solid white",
      height: 110,
      width: 65,
      cursor: "pointer",
      marginRight: 12,
      marginTop: 12,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    chatWallpaper: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  });
});
