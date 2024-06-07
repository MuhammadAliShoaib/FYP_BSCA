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
// import { socket } from "../socket";
import axios from "axios";
import { useAppSelector } from "../config/redux/hooks";
import { Button, Typography } from "@mui/material";
import { DispatchDetails } from "../types/types";
import { toast } from "react-toastify";
import { ACCESS_CONTROL_CONTRACT_ADDRESS } from "../utility/utilts.tsx";
import AccessControl from "../contract/AccessControl.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

// interface Column {
//   id: "date" | "notification";
//   label: string;
//   minWidth?: number | string;
//   align?: "right";
// }

// const columns: readonly Column[] = [
//   { id: "date", label: "Date", minWidth: 170 },
//   { id: "notification", label: "Activities", minWidth: "100%" },
// ];

// const rows = [
//   {
//     _id: 1,
//     date: "04/10/2023",
//     notification: {
//       batchId: "12334",
//       deliverTo: "Distro",
//       dispatchDetails: {
//         batchId: "12334",
//         courier: "abc",
//         distributor: {
//           status: "Dispatched to Distributor",
//           distributorName: "",
//           distributorAddress: "",
//           distributorSupply: 0,
//         },
//       },
//     },
//   },
// ];
interface iDeliverTo {
  name: string;
  address: string;
}

interface Props {
  PharmaTable?: boolean;
}

export default function NotificationTable({ PharmaTable }: Props) {
  const { auth } = useAppSelector((state) => state.auth);
  const [notifications, setNotification] = React.useState([
    {
      _id: "1",
      date: "04/10/2023",
      batchId: "12334",
      deliverTo: { name: "Company", address: "0x305" },
      dispatchDetails: {
        batchId: "",
        courier: "",
        distributor: {
          status: "",
          distributorName: "",
          distributorAddress: "",
          distributorSupply: 0,
        },
        pharmaAddress: "",
        pharmaName: "",
        quantity: 0,
      },
    },
  ]);
  const [flag, setFlag] = React.useState(false);
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
        // console.log("notifications :" + JSON.stringify(res));
        // console.log("new notifications", newNotifications);
        // console.log("Notifications", notifications);
      } catch (error) {
        console.log(error, "Response Error");
      }
    }

    getNotification();
  }, [flag]);

  const {
    data: result,
    writeAsync,
    isSuccess,
  } = useContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: "updateStatus",
  });

  const statusUpdate = async (
    _id: string,
    dispatchDetails: DispatchDetails,
    batchId: string,
    deliverTo: iDeliverTo
  ) => {
    if (dispatchDetails.distributor.status === "Dispatched to Distributor") {
      dispatchDetails.distributor.status = "Delivered to Distributor";
    } else if (dispatchDetails.distributor.status === "Dispatched to Pharmacy")
      dispatchDetails.distributor.status = "Delivered to Pharmacy";
    try {
      writeAsync &&
        (await writeAsync({
          args: [batchId, dispatchDetails.distributor.distributorAddress],
        }));

      const response = await axios.put(`/api/updateStatus`, {
        dispatchDetails,
        _id,
      });
      if (!response) {
        throw new Error("Update Failed");
      }
      try {
        const res = (
          await axios.post("/api/notification", {
            senderAddress: auth.address,
            receiverAddress: deliverTo.address,
            notification: {
              batchId,
              deliverTo,
              dispatchDetails,
            },
            date: new Date(),
          })
        ).data;
      } catch (error) {
        console.log("Error: ", error);
      }
      setFlag(!flag);
      toast.success(`${response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      console.log("Error: ", error);
      if (error.response && error.response.status === 500) {
        toast.error(`${error.response.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

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
              <TableCell sx={{ width: "10%", paddingLeft: "25px" }}>
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
              {auth.role != "manufacturer" && (
                <TableCell
                  sx={{
                    paddingLeft: "25px",
                    background: "#a2d2ff",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Status
                </TableCell>
              )}
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
                    Batch ID: {row.batchId}, Delivered To: {row.deliverTo.name},
                    Supply:{" "}
                    {PharmaTable ||
                    row.dispatchDetails.distributor.status ==
                      "Delivered to Pharmacy"
                      ? row.dispatchDetails?.quantity
                      : row.dispatchDetails?.distributor?.distributorSupply}
                  </TableCell>
                  {auth.role != "manufacturer" && (
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
                      {row.dispatchDetails.distributor.status ===
                        "Dispatched to Distributor" ||
                      row.dispatchDetails.distributor.status ===
                        "Dispatched to Pharmacy" ? (
                        <Button
                          size="medium"
                          variant="contained"
                          onClick={() =>
                            statusUpdate(
                              row._id,
                              row.dispatchDetails,
                              row.batchId,
                              row.deliverTo
                            )
                          }
                        >
                          {row.dispatchDetails.distributor.status}
                        </Button>
                      ) : (
                        <Typography>
                          {row.dispatchDetails.distributor.status}
                        </Typography>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={notifications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    // <pre>{JSON.stringify(notification, null, 4)}</pre>
  );
}
