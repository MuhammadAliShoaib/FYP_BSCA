import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { socket } from "../socket";
import axios from "axios";
import { useAppSelector } from "../config/redux/hooks";
import { Button } from "@mui/material";

interface Column {
  id: "date" | "notification";
  label: string;
  minWidth?: number | string;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", minWidth: 170 },
  { id: "notification", label: "Activities", minWidth: "100%" },
];

const rows = [
  {
    _id: 1,
    date: "04/10/2023",
    notification: {
      batchId: "12334",
      deliverTo: "Distro",
      dispatchDetails: {
        batchId: "12334",
        courier: "abc",
        distributor: {
          distributorAddress: "1234",
          distributorSupply: 400,
        },
      },
    },
  },
];

export default function NotificationTable() {
  const { auth } = useAppSelector((state) => state.auth);

  const [notifications, setNotification] = React.useState([
    {
      _id: 1,
      date: "04/10/2023",
      batchId: "12334",
      deliverTo: "Distro",
      dispatchDetails: {
        batchId: "12334",
        courier: "abc",
        distributor: {
          distributorAddress: "1234",
          distributorSupply: 400,
        },
      },
    },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // React.useEffect(() => {
  //   socket.on("getNotification", (data) => {
  //     setNotification((prev) => [...prev, {
  //       _id: Math.floor(Math.random()), date: "04/10/2024", notification: data
  //     }]);
  //   });
  // }, [socket, notification]);

  React.useEffect(() => {
    async function getNotification() {
      try {
        const res = (await axios.get(`/api/getNotification/${auth.address}`))
          .data;
        const notificationsWithLocaleDate = res.map((notificationItem: any) => {
          const date = new Date(notificationItem.date);
          const localeDateString = date.toLocaleDateString("en-GB");

          // Extract specific properties from the notification object
          const { batchId, deliverTo, dispatchDetails } =
            notificationItem.notification;
          // Return a new object with the extracted properties
          return {
            _id: notificationItem._id,
            date: localeDateString,
            batchId,
            deliverTo,
            dispatchDetails,
          };
        });

        // Filter out notifications that already exist in the state
        const newNotifications = notificationsWithLocaleDate.filter(
          (newNotification: any) => {
            return !notifications.some(
              (existingNotification) =>
                existingNotification._id === newNotification._id
            );
          }
        );

        // Update the state with the new notifications
        setNotification((prevNotifications) => [
          ...prevNotifications,
          ...newNotifications,
        ]);
        console.log("notifications :" + JSON.stringify(res));
        console.log("new notifications", newNotifications);
        console.log("Notifications", notifications);
      } catch (error) {
        console.log(error, "Response Error");
      }
    }

    getNotification();
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '10%', paddingLeft: "25px" }}>
                <QueryStatsIcon style={{ marginRight: "10px" }} />
              </TableCell>
              <TableCell sx={{ width: "80%", paddingLeft: "25px" }}>
                Your latest activity across all projects
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: 170,
                  paddingLeft: "25px",
                  background: "#a2d2ff",
                  color: "black",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  paddingLeft: "25px",
                  background: "#a2d2ff",
                  color: "black",
                }}
              >
                Activities
              </TableCell>
              <TableCell
                sx={{
                  paddingLeft: "25px",
                  background: "#a2d2ff",
                  color: "black",
                  display:'flex',
                  justifyContent:'center'
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover tabIndex={-1} key={row._id}>
                  <TableCell
                    key="date"
                    align="left"
                    sx={{
                      paddingLeft: "25px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    key="notification"
                    align="left"
                    sx={{
                      paddingLeft: "25px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Batch ID: {row.batchId}, Delivered To: {row.deliverTo},
                    Supply:{" "}
                    {row.dispatchDetails?.distributor?.distributorSupply}
                  </TableCell>
                  <TableCell
                    key="status"
                    align="left"
                    sx={{
                      paddingLeft: "25px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Button
                      href=""
                      size="medium"
                      variant="contained"
                    >
                      Delivered
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    // <pre>{JSON.stringify(notification, null, 4)}</pre>
  );
}
