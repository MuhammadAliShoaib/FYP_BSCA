import Box from "@mui/material/Box";
import { useDisconnect } from "wagmi";
import { Badge, Button, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

type Props = {
  title: string;
};

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#2380D6',
    },
  },
});

export default function Header({ title }: Props) {
  const { disconnect } = useDisconnect();
  return (
    <Box
      sx={{
        padding: "0px 20px 0px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems:'center',
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
      <div>

        <Button
          onClick={() => disconnect()}
          href="#"
          size="medium"
          variant="contained"
          sx={{ my: 1, mx: 1.5 }}
        >
          Disconnect
        </Button>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '15px', border: '1px solid black', marginRight: '10px' }}>

                        </div>
                        Muhammad Ali
                    </div> */}
    </Box>
  );
}
