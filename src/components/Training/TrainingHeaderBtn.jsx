import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import '../Training/TrainingHeaderBtn.css'
import { Link } from 'react-router-dom';
 
const TrainingHeaderBtn = () => {
  return (
    <AppBar position="static" className="appBar">
      <Toolbar className="toolbar">
        <Box className="box">
          <Typography variant="h6" component="div" className="typography">
            My Training Requests
          </Typography>
          <Typography variant="h6" component="div" className="typography">
         Training Dashboard
          </Typography>
          <Typography variant="h6" component="div" className="typography">
            Reminders
          </Typography>
         
        </Box>
        <Box className="box">
          <Button variant="contained" color="primary" className="button" component={Link} to="/new-request">
            New Request
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
 
export default TrainingHeaderBtn;