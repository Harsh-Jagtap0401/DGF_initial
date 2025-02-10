import { Grid, Container } from "@mui/material";
import GraphComponent from "./GraphComponent";

const Dashboard = () => {
  // Data for the charts
  const requestInProgress = {
    labels: ["SPOC Approval", "Preparing Plan", "Learning In Progress"],
    values: [5, 3, 5],
    colors: ["#FFC107", "#03A9F4", "#8E44AD"],
    hoverColors: ["#FFD54F", "#29B6F6", "#A569BD"]
  };

  const completedRequests = {
    labels: ["Completed", "Completed with Delay", "Partially Completed"],
    values: [5, 3, 5],
    colors: ["#4CAF50", "#FF5722", "#FF9800"],
    hoverColors: ["#66BB6A", "#FF7043", "#FFA726"]
  };

  const incompleteRequests = {
    labels: ["Pending Review", "Not Started", "Waiting for Resources"],
    values: [4, 6, 3],
    colors: ["#9E9E9E", "#FFEB3B", "#F44336"],
    hoverColors: ["#BDBDBD", "#FFEE58", "#E57373"]
  };

  const requestsOnHold = {
    labels: ["Awaiting Approval", "Paused", "Temporarily Blocked"],
    values: [2, 5, 1],
    colors: ["#607D8B", "#FF9800", "#9C27B0"],
    hoverColors: ["#78909C", "#FFB74D", "#BA68C8"]
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* First Row: Requests in Progress and Completed Requests */}
        <Grid item xs={12} md={6}>
          <GraphComponent title="Requests in Progress" data={requestInProgress} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphComponent title="Completed Requests" data={completedRequests} />
        </Grid>

        {/* Second Row: Incomplete Requests and Requests on Hold */}
        <Grid item xs={12} md={6}>
          <GraphComponent title="Incomplete Requests" data={incompleteRequests} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphComponent title="Requests on Hold" data={requestsOnHold} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
