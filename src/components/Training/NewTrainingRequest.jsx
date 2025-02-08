import React from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Button,
  Box,
  Divider,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Table,
  IconButton,
  Avatar,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReactQuill from "react-quill-new";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TablePagination from "@mui/material/TablePagination";
import 'quill/dist/quill.snow.css';
import "./NewTrainingRequest.css";

const CustomRadio = styled(Radio)({
  "& .MuiSvgIcon-root": {
    fontSize: 16,
  },
});
// Sample Employee Data (Can be replaced with API calls)
const employeeDatabase = {
  "jonathan.hart@example.com": {
    id: "HS158",
    name: "Jonathan Hart",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    training: {
      reqNo: "#231",
      project: "Staffing Nation",
      objective: "Upskilling",
      techStack: "React",
      requestedOn: "Jan 20, 2025",
    },
  },
  "mike.clark@example.com": {
    id: "HS305",
    name: "Mike Clark",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  "alan.patel@example.com": {
    id: "HS97",
    name: "Alan Patel",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  "joe.estrada@example.com": {
    id: "HS391",
    name: "Joe Estrada",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  "janet.powell@example.com": {
    id: "HS467",
    name: "Janet Powell",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
};

const NewTrainingRequest = () => {
  const [completioncriteria, setCompletionCriteria] = useState("");
  const [otherskill, setOtherSkill] = useState("");
  const [comment, setComments] = useState("");
  const [trainingPurposeOption, setTrainingPurposeOption] =
    useState("prospect");
  const [employeeDetailsOption, setEmployeeDetailsOption] = useState("add");
  const [selectedDate, setSelectedDate] = useState(null);
  const [emails, setEmails] = useState("");
  const [employees, setEmployees] = useState([]);
  const [invalidEmails, setInvalidEmails] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOtherSkill = (value) => {
    setOtherSkill(value);
  };

  const handleComments = (value) => {
    setComments(value);
  };

  const handleCompletionCriteria = (value) => {
    setCompletionCriteria(value);
  };

  const handleTrainingPurposeOptionChange = (event) => {
    setTrainingPurposeOption(event.target.value);
  };

  const handleEmployeeDetailsOptionChange = (event) => {
    setEmployeeDetailsOption(event.target.value);
  };

  const addEmployee = () => {
    setShowTable(true);
    if (!emails.trim()) {
      setInvalidEmails(["Please enter at least one email."]);
      return;
    }

    const emailList = emails.split(",").map((email) => email.trim());
    const validEmployees = [];
    const invalidEmails = [];

    emailList.forEach((email) => {
      if (email in employeeDatabase) {
        if (!employees.some((emp) => emp.id === employeeDatabase[email].id)) {
          validEmployees.push({
            ...employeeDatabase[email],
            availableFrom: "",
            bandwidth: "",
            weekend: "No",
          });
        }
      } else {
        invalidEmails.push(email);
      }
    });

    if (validEmployees.length > 0) {
      setEmployees((prev) => [...prev, ...validEmployees]);
    }
    setInvalidEmails(invalidEmails);
    setEmails("");
    setShowSummary(true);
  };

  const removeEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const updateEmployee = (id, field, value) => {
    setEmployees(
      employees.map((emp) => (emp.id === id ? { ...emp, [field]: value } : emp))
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Container maxWidth="md" style={{ width: "100%", marginTop: "2rem" }}>
          <Paper elevation={3} style={{ padding: "2rem", width: "100%" }}>
            <Box
              justifyContent="space-between"
              style={{ marginBottom: "1rem" }}
            >
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                New Training Request
              </Typography>
              <Divider></Divider>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: "1rem", backgroundColor: "white" }}
            >
              <Typography color="textSecondary" style={{ fontSize: "12px" }}>
                Request ID/No: <span style={{ fontWeight: "bold" }}>#1234</span>
              </Typography>
              <Typography color="textSecondary" style={{ fontSize: "12px" }}>
                Requested By:{" "}
                <span style={{ fontWeight: "bold" }}>Joe Maison</span>
              </Typography>
            </Grid>
            <Paper
              elevation={1}
              style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}
            >
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "12px", fontWeight: "bold" }}
              >
                Training Details
              </Typography>
              <Grid
                container
                spacing={3}
                style={{
                  marginBottom: "2rem",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <FormControl fullWidth>
                      <Typography
                        style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                      >
                        Request on behalf{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        variant="outlined"
                        defaultValue="Joe Maison"
                        InputProps={{
                          style: { height: "30px", fontSize: "12px" },
                          endAdornment: <SearchIcon color="disabled" />,
                        }}
                      />
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <FormControl fullWidth>
                      <Typography
                        style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                      >
                        Source <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Select
                        variant="outlined"
                        defaultValue=""
                        style={{ height: "30px", fontSize: "12px" }}
                      >
                        <MenuItem value="">
                          <em>Select Source</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <FormControl fullWidth>
                      <Typography
                        style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                      >
                        Training Objective{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Select
                        variant="outlined"
                        defaultValue=""
                        style={{ height: "30px", fontSize: "12px" }}
                      >
                        <MenuItem value="">
                          <em>Select Training Objective</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                gutterBottom
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Training Purpose
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={trainingPurposeOption}
                  onChange={handleTrainingPurposeOptionChange}
                >
                  <FormControlLabel
                    value="prospect"
                    control={<CustomRadio />}
                    label={
                      <Typography style={{ fontSize: "12px" }}>
                        Prospect
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="project"
                    control={<CustomRadio />}
                    label={
                      <Typography style={{ fontSize: "12px" }}>
                        Project
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>

              {trainingPurposeOption === "prospect" ? (
                <Grid
                  container
                  spacing={3}
                  style={{
                    marginBottom: "2rem",

                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Typography
                        style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                      >
                        Prospect Name <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        variant="outlined"
                        defaultValue="Joe Maison"
                        InputProps={{
                          style: { height: "30px", fontSize: "12px" },
                          endAdornment: <SearchIcon color="disabled" />,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Typography
                        style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                      >
                        Service Division <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Select
                        variant="outlined"
                        defaultValue=""
                        style={{ height: "30px", fontSize: "12px" }}
                      >
                        <MenuItem value="tech-services">Tech Services</MenuItem>
                        <MenuItem value="content-services">
                          Content Services
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  spacing={3}
                  style={{
                    marginBottom: "2rem",

                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Typography
                        style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                      >
                        Project Name <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        variant="outlined"
                        defaultValue="Joe Maison"
                        InputProps={{
                          style: { height: "30px", fontSize: "12px" },
                          endAdornment: <SearchIcon color="disabled" />,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Typography
                        style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                      >
                        Service Division <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Select
                        variant="outlined"
                        defaultValue=""
                        style={{ height: "30px", fontSize: "12px" }}
                      >
                        <MenuItem value="">
                          <em>Select Service Division</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "12px", fontWeight: "bold" }}
              >
                Employee Details
              </Typography>
              <FormControl
                component="fieldset"
                style={{ marginBottom: "1rem" }}
              >
                <RadioGroup
                  row
                  value={employeeDetailsOption}
                  onChange={handleEmployeeDetailsOptionChange}
                >
                  <FormControlLabel
                    value="add"
                    control={<CustomRadio />}
                    label={
                      <Typography style={{ fontSize: "12px" }}>
                        Add Employees
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="open"
                    control={<CustomRadio />}
                    label={
                      <Typography style={{ fontSize: "12px" }}>
                        Place an Open Request
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>

              <Box style={{ width: "100%" }}>
                {employeeDetailsOption === "add" ? (
                  <Grid
                    container
                    spacing={3}
                    style={{
                      marginBottom: "1rem",

                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Typography
                          style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                        >
                          Select Employee{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Autocomplete
                          options={employees}
                          getOptionLabel={(option) => option.label || ""}
                          // onInputChange={handleInputChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Type employee name"
                              InputProps={{
                                ...params.InputProps,
                                style: { height: "30px", fontSize: "12px" },
                              }}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={0.75}>
                      <Typography style={{ fontSize: "14px" }}>OR</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Typography
                          style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                        >
                          Enter comma(,) seperated email ids
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          variant="outlined"
                          type="text"
                          value={emails}
                          onChange={(e) => setEmails(e.target.value)}
                          InputProps={{
                            style: { height: "30px", fontSize: "12px" },
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} style={{ marginTop: "1.5rem" }}>
                      <Button
                        variant="contained"
                        onClick={addEmployee}
                        sx={{
                          height: "35px",
                          fontSize: "12px",
                          minWidth: "75px",
                          backgroundColor: "white",
                          color: "primary.main",
                          borderColor: "primary.main",
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        }}
                      >
                        +
                      </Button>
                    </Grid>
                    {/* Employee Table */}
                    {showTable && (
                      <TableContainer
                        component={Paper}
                        style={{ padding: "16px", marginTop: "16px" }}
                      >
                        <Table size="small">
                          {employees.length > 0 && (
                            <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                              <TableRow>
                                <TableCell
                                  style={{ padding: "8px", fontWeight: "bold" }}
                                >
                                  Employee ID
                                </TableCell>
                                <TableCell
                                  style={{ padding: "8px", fontWeight: "bold" }}
                                >
                                  Name
                                </TableCell>
                                <TableCell
                                  style={{ padding: "8px", fontWeight: "bold" }}
                                >
                                  Available From
                                </TableCell>
                                <TableCell
                                  style={{ padding: "8px", fontWeight: "bold" }}
                                >
                                  Daily Bandwidth
                                </TableCell>
                                <TableCell
                                  style={{ padding: "8px", fontWeight: "bold" }}
                                >
                                  Available on Weekend?
                                </TableCell>
                                <TableCell
                                  style={{ padding: "8px", fontWeight: "bold" }}
                                >
                                  Actions
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          )}
                          <TableBody>
                            {employees
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((employee) => (
                                <React.Fragment key={employee.id}>
                                  <TableRow>
                                    <TableCell style={{ padding: "8px" }}>
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                      >
                                        <Avatar src={employee.image} />
                                        {employee.id}
                                      </Box>
                                    </TableCell>
                                    <TableCell style={{ padding: "8px" }}>
                                      {employee.name}
                                    </TableCell>
                                    <TableCell style={{ padding: "8px" }}>
                                      <TextField
                                        type="date"
                                        value={employee.availableFrom}
                                        onChange={(e) =>
                                          updateEmployee(
                                            employee.id,
                                            "availableFrom",
                                            e.target.value
                                          )
                                        }
                                        size="small"
                                      />
                                    </TableCell>
                                    <TableCell style={{ padding: "8px" }}>
                                      <FormControl fullWidth>
                                        <Select
                                          value={employee.bandwidth}
                                          onChange={(e) =>
                                            updateEmployee(
                                              employee.id,
                                              "bandwidth",
                                              e.target.value
                                            )
                                          }
                                          size="small"
                                        >
                                          <MenuItem value="">Select</MenuItem>
                                          <MenuItem value="2 Hours">
                                            2 Hours
                                          </MenuItem>
                                          <MenuItem value="4 Hours">
                                            4 Hours
                                          </MenuItem>
                                          <MenuItem value="6 Hours">
                                            6 Hours
                                          </MenuItem>
                                          <MenuItem value="Full Day">
                                            Full Day
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell style={{ padding: "8px" }}>
                                      <RadioGroup
                                        row
                                        value={employee.weekend}
                                        onChange={(e) =>
                                          updateEmployee(
                                            employee.id,
                                            "weekend",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={<Radio size="small" />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={<Radio size="small" />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </TableCell>
                                    <TableCell style={{ padding: "8px" }}>
                                      <IconButton
                                        color="error"
                                        onClick={() =>
                                          removeEmployee(employee.id)
                                        }
                                        size="small"
                                      >
                                        <CloseIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  {employee.training && (
                                    <TableRow>
                                      <TableCell
                                        colSpan={6}
                                        sx={{
                                          backgroundColor: "#fffbe6",
                                          padding: 2,
                                        }}
                                      >
                                        <Typography fontWeight="bold">
                                          1 training is already in progress
                                        </Typography>
                                        <Table size="small">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell
                                                style={{
                                                  padding: "8px",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Req No:
                                              </TableCell>
                                              <TableCell
                                                style={{
                                                  padding: "8px",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Project
                                              </TableCell>
                                              <TableCell
                                                style={{
                                                  padding: "8px",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Objective
                                              </TableCell>
                                              <TableCell
                                                style={{
                                                  padding: "8px",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Tech Stack
                                              </TableCell>
                                              <TableCell
                                                style={{
                                                  padding: "8px",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Requested on
                                              </TableCell>
                                              <TableCell
                                                style={{
                                                  padding: "8px",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Action
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell
                                                style={{ padding: "8px" }}
                                              >
                                                {employee.training.reqNo}
                                              </TableCell>
                                              <TableCell
                                                style={{ padding: "8px" }}
                                              >
                                                {employee.training.project}
                                              </TableCell>
                                              <TableCell
                                                style={{ padding: "8px" }}
                                              >
                                                {employee.training.objective}
                                              </TableCell>
                                              <TableCell
                                                style={{ padding: "8px" }}
                                              >
                                                {employee.training.techStack}
                                              </TableCell>
                                              <TableCell
                                                style={{ padding: "8px" }}
                                              >
                                                {employee.training.requestedOn}
                                              </TableCell>
                                              <TableCell
                                                style={{ padding: "8px" }}
                                              >
                                                <IconButton
                                                  color="error"
                                                  onClick={() =>
                                                    removeEmployee(employee.id)
                                                  }
                                                  size="small"
                                                >
                                                  <CloseIcon />
                                                </IconButton>
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </React.Fragment>
                              ))}
                          </TableBody>
                        </Table>
                        {employees.length > 0 && (
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={employees.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        )}
                      </TableContainer>
                    )}
                    {showSummary && (
                      <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography variant="body1">
                          Total employees selected: {employees.length}
                        </Typography>
                        {invalidEmails.length > 0 && (
                          <Typography
                            variant="body1"
                            color="error"
                            style={{ marginLeft: "20px" }}
                          >
                            Invalid Emails: {invalidEmails.join(", ")}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Grid>
                ) : (
                  <Grid container spacing={3} style={{ marginBottom: "1rem" }}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Typography style={{ fontSize: "12px" }}>
                          Number of People to be Trained{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          variant="outlined"
                          type="number"
                          InputProps={{
                            style: { height: "30px", fontSize: "12px" },
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Typography style={{ fontSize: "12px" }}>
                          Employee Level <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Select
                          variant="outlined"
                          defaultValue=""
                          style={{ height: "30px", fontSize: "12px" }}
                        >
                          <MenuItem value="">
                            <em>Select Employee Level</em>
                          </MenuItem>
                          <MenuItem value="junior">Junior</MenuItem>
                          <MenuItem value="mid">Mid</MenuItem>
                          <MenuItem value="senior">Senior</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
              </Box>

              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "12px", fontWeight: "bold" }}
              >
                Skill Details
              </Typography>
              <Grid
                container
                spacing={3}
                style={{ marginBottom: "1rem" }}
                direction="row"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Expected completion Timeline{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <DatePicker
                      style={{ height: "70px" }}
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      textField={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            style: { height: "30px", fontSize: "12px" },
                          }}
                          InputLabelProps={{
                            style: { fontSize: "12px" },
                          }}
                          style={{
                            height: "30px",
                            fontSize: "12px",
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Request for - Tech Stack / Area{" "}
                      <span style={{ color: "red" }}> *</span>
                    </Typography>
                    <Select
                      variant="outlined"
                      defaultValue=""
                      style={{ height: "30px", fontSize: "12px" }}
                    >
                      <MenuItem value="">
                        <em>Select Tech Stack</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Request for - Primary Skill / Competency{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Select
                      variant="outlined"
                      defaultValue=""
                      style={{ height: "30px", fontSize: "12px" }}
                    >
                      <MenuItem value="">
                        <em>Select Skill</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ marginBottom: "1rem" }}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <Typography
                      style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                    >
                      Provide other skills information{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <ReactQuill
                      value={otherskill}
                      onChange={handleOtherSkill}
                      modules={{
                        toolbar: [["bold", "italic", "underline"], ["clean"]],
                      }}
                      placeholder="Other Skill Details should be less than 1000 Words"
                      style={{ height: "150px" }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <Typography
                      style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                    >
                      Suggest completion criteria{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <ReactQuill
                      value={completioncriteria}
                      onChange={handleCompletionCriteria}
                      modules={{
                        toolbar: [["bold", "italic", "underline"], ["clean"]],
                      }}
                      placeholder="Suggest Completion Criteria should be less than 1000 Words"
                      style={{ height: "150px" }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <Typography
                      style={{ fontSize: "12px", marginBottom: "0.5rem" }}
                    >
                      Comments
                    </Typography>
                    <ReactQuill
                      value={comment}
                      onChange={handleComments}
                      modules={{
                        toolbar: [["bold", "italic", "underline"], ["clean"]],
                      }}
                      placeholder="Comments should be less than 350 Words"
                      style={{ height: "150px" }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                style={{ marginTop: "4rem" }}
                gap={2}
              >
                <Button
                  variant="outlined"
                  style={{
                    height: "35px",
                    fontSize: "12px",
                    minWidth: "75px",
                    color: "primary",
                    borderColor: "transparent",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "primary",
                    color: "white",
                    height: "35px",
                    fontSize: "12px",
                    minWidth: "75px",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Paper>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default NewTrainingRequest;
