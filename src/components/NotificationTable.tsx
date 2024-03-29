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
    notification:
      "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
  },
  {
    _id: 2,
    date: "05/10/2023",
    notification:
      "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
  },
  {
    _id: 3,
    date: "06/10/2023",
    notification:
      "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
  },
  // {
  //   _id: 4,
  //   date: "07/10/2023",
  //   notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
  // },
  // {
  //   _id: 5,
  //   date: "08/10/2023",
  //   notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
  // }, {
  //   _id: 6,
  //   date: "09/10/2023",
  //   notification: "Please scan and update the portal before you are blacklisted or any additional charges are issued on you. Please Note!",
  // }
];

export default function NotificationTable() {
  const { auth } = useAppSelector((state) => state.auth);

  const [notification, setNotification] = React.useState(rows);
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
        const notificationsWithLocaleDate = res.map((notificationItem) => {
          const date = new Date(notificationItem.date);
          const localeDateString = date.toLocaleDateString("en-GB");
          return { ...notificationItem, date: localeDateString };
        });

        setNotification([...notification, ...notificationsWithLocaleDate]);
        console.log("notifications :" + JSON.stringify(res));
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
              <TableCell sx={{ width: 170, paddingLeft: "25px" }}>
                <QueryStatsIcon style={{ marginRight: "10px" }} />
              </TableCell>
              <TableCell sx={{ width: "100%", paddingLeft: "25px" }}>
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
                  width: "100%",
                  paddingLeft: "25px",
                  background: "#a2d2ff",
                  color: "black",
                }}
              >
                Activities
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notification
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.date}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          paddingLeft: "25px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
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
