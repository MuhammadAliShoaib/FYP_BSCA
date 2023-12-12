import Box from "@mui/material/Box";
import { useDisconnect } from "wagmi";
import { Button } from "@mui/material";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const { disconnect } = useDisconnect();
  return (
    <Box
      sx={{
        padding: "10px 20px 10px 20px",
        display: "flex",
        justifyContent: "space-between",
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
      <Button
        onClick={() => disconnect()}
        href="#"
        size="medium"
        variant="contained"
        sx={{ my: 1, mx: 1.5 }}
      >
        Disconnect
      </Button>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '15px', border: '1px solid black', marginRight: '10px' }}>

                        </div>
                        Muhammad Ali
                    </div> */}
    </Box>
  );
}
