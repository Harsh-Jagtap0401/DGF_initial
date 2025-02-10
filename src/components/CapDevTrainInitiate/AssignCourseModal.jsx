import { useState } from "react";
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  Box,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AssignCourseModal = ({ open, onClose }) => {
  const [courses, setCourses] = useState([
    { name: "AWS", completionDate: "", courseType: "" },
    { name: "Communication", completionDate: "", courseType: "" }
  ]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const handleDeleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSelectCourse = (event) => {
    setSelectedCourse(event.target.value);
    setShowDetails(true);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ style: { width: '924px', height: '724px' } }}>
      <DialogTitle>Assign Course to Learners</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel required>Select Course</InputLabel>
          <Select
            value={selectedCourse}
            onChange={handleSelectCourse}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <em>Search Course</em>;
              }
              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Search Course</em>
            </MenuItem>
            {courses.map((course, index) => (
              <MenuItem key={index} value={course.name}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!showDetails && (
          <Box sx={{ width: '812px', height: '138px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: '4px', marginTop: '20px' }}>
            <Typography variant="body1">Selected Courses will be listed here</Typography>
          </Box>
        )}
        {showDetails && (
          <>
            {courses.map((course, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
                <TextField
                  label="Course Name"
                  value={course.name}
                  disabled
                  fullWidth
                />
                <TextField
                  label="Completion Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={course.completionDate}
                  onChange={(e) => handleCourseChange(index, "completionDate", e.target.value)}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Course Type</InputLabel>
                  <Select
                    value={course.courseType}
                    onChange={(e) => handleCourseChange(index, "courseType", e.target.value)}
                  >
                    {["Udemy", "Sprinkle Zone", "YouTube", "Third Party"].map((type) => (
                      <MenuItem key={type} value={type}>
                        <FormControlLabel value={type} control={<Radio />} label={type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton onClick={() => handleDeleteCourse(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <TextField label="Add Note" multiline rows={3} fullWidth sx={{ width: '812px', height: '110px' }} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AssignCourseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignCourseModal;