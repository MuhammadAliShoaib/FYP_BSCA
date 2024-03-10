import Box from "@mui/material/Box";
import { useDisconnect } from "wagmi";
import { Badge, Button, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch } from "../config/redux/hooks";
import { clearData } from "../config/redux/features/Auth/authSlice";
import ToggleColorMode from "./ToggleColorMode";
import { ThemeContext } from "../config/Context/themeProvider";
import { useContext } from "react";

type Props = {
  title: string;
};

// const theme = createTheme({
//   palette: {
//     primary: blue,
//     secondary: {
//       main: "#2380D6",
//     },
//   },
// });

export default function Header({ title }: Props) {
  const { disconnect } = useDisconnect();
  const dispatch = useAppDispatch();
  const ctx = useContext(ThemeContext)


  let handleDisconnect = () => {
    disconnect();
    dispatch(clearData());
  }

  return (
    <Box
      sx={{
        padding: "0px 20px 0px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="">
          <p
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 25,
            }}
          >
            {title}
          </p>
        </div>
      </Box>
      <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center' }}>
        <Button
          onClick={handleDisconnect}
          href=""
          size="medium"
          variant="contained"
          sx={{ my: 1, mx: 1.5 }}
        >
          Disconnect
        </Button>
        <ToggleColorMode mode={ctx.mode} toggleColorMode={ctx.toggleColorMode} />
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
    </Box>
  );
}
