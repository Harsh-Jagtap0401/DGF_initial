import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphComponent = ({ title, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors,
        hoverBackgroundColor: data.hoverColors,
      },
    ],
  };

  return (
    <Box 
      sx={{ 
        textAlign: "center", 
        backgroundColor: "#ebebf8fa",  // Apply the background color here
        padding: 2, 
        borderRadius: 2, 
        boxShadow: 3 
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      <Box sx={{ width: 100, margin: "auto" }}>
        <Doughnut data={chartData} />
      </Box>
    </Box>
  );
};

GraphComponent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    hoverColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default GraphComponent;
