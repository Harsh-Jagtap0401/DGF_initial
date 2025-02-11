import { useState,useEffect,useContext } from "react";
import {
  Container,Paper,Typography,Select,MenuItem,FormControl,RadioGroup,
  TextField,FormControlLabel,Radio,Button,
  Box,Divider,TableCell,TableContainer,TableBody,TableHead,TableRow,Table,IconButton,Avatar,Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from "@mui/icons-material/Close";
import TablePagination from "@mui/material/TablePagination";
import ReactQuill from 'react-quill-new'; // Import react-quill-new
import 'react-quill-new/dist/quill.snow.css'; // Import styles for react-quill-new
import './NewTrainingRequest.css'; // Import the CSS file
import AuthContext from "../Auth/AuthContext";

const CustomRadio = styled(Radio)({
  "& .MuiSvgIcon-root": { fontSize: 16 },
});

// Sample Employee Data
const employeeDatabase = {
  "jonathan.hart@example.com": { id: "HS158", name: "Jonathan Hart", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  "mike.clark@example.com": { id: "HS305", name: "Mike Clark", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  "alan.patel@example.com": { id: "HS97", name: "Alan Patel", image: "https://randomuser.me/api/portraits/men/3.jpg" },
  "joe.estrada@example.com": { id: "HS391", name: "Joe Estrada", image: "https://randomuser.me/api/portraits/men/4.jpg" },
  "janet.powell@example.com": { id: "HS467", name: "Janet Powell", image: "https://randomuser.me/api/portraits/women/5.jpg" },
};

const NewTrainingRequest = () => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const [formData, setFormData] = useState({
    completionCriteria: "",
    otherSkill: "",
    comment: "",
    trainingPurpose: "prospect",
    employeeDetails: "add",
    selectedDate: null,
    emails: "",
    employees: [],
    invalidEmails: [],
    showSummary: false,
    rowsPerPage: 5,
    page: 0,
    showTable: false,
    sources: [], // Add sources to the state
    trainingObjectives: [], // Add training objectives to the state
    selectedSource: "", // Add selected source to the state
    selectedTrainingObjective: "", // Add selected training objective to the state
    techStacks: [], // Add tech stacks to the state
    selectedTechStack: "", // Add selected tech stack to the state
    primarySkills: [], // Add primary skills to the state
    selectedPrimarySkill: "", // Add selected primary skill to the state
    projects: [], // Add projects to the state
    selectedProject: "", // Add selected project to the state
    employeeLevels: [], // Add employee levels to the state
    selectedEmployeeLevel: "", // Add selected employee level to the state
    services: [], // Add services to the state
  });

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8000/api/role/sources?role_id=${user.role_id}`)
        .then(response => response.json())
        .then(data => {
          setFormData(prevFormData => ({
            ...prevFormData,
            sources: data,
          }));
        })
        .catch(error => console.error('Error fetching sources:', error));
    }

    // Fetch tech stacks
    fetch(`http://localhost:8000/api/techstack/all`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevFormData => ({
          ...prevFormData,
          techStacks: data,
        }));
      })
      .catch(error => console.error('Error fetching tech stacks:', error));
  }, [user]);

  useEffect(() => {
    // Fetch services data
    fetch(`http://localhost:8000/api/services`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevFormData => ({
          ...prevFormData,
          services: data.services,
        }));
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDateChange = (newValue) => setFormData({ ...formData, selectedDate: newValue });

  const handleSourceChange = (e) => {
    const selectedSource = e.target.value;
    setFormData({ ...formData, selectedSource });

    // Fetch training objectives based on the selected source
    fetch(`http://localhost:8000/api/training/objectives?source_id=${selectedSource}`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevFormData => ({
          ...prevFormData,
          trainingObjectives: data,
          selectedTrainingObjective: "",
        }));
      })
      .catch(error => console.error('Error fetching training objectives:', error));
  };

  const handleTrainingObjectiveChange = (e) => {
    const selectedTrainingObjective = e.target.value;
    setFormData({ ...formData, selectedTrainingObjective });
  };

  // Update the handleTechStackChange function
  const handleTechStackChange = (e) => {
    const selectedTechStack = e.target.value;
    setFormData({ ...formData, selectedTechStack });

    // Fetch primary skills based on the selected tech stack
    fetch(`http://localhost:8000/api/primaryskill/by-stack?stack_id=${selectedTechStack}`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevFormData => ({
          ...prevFormData,
          primarySkills: data,
          selectedPrimarySkill: "",
        }));
      })
      .catch(error => console.error('Error fetching primary skills:', error));
  };

  // Fetch projects data
  useEffect(() => {
    fetch(`http://localhost:8000/api/project/all`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevFormData => ({
          ...prevFormData,
          projects: data,
        }));
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  // Fetch employee levels data
  useEffect(() => {
    fetch(`http://localhost:8000/api/employee-level/all`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevFormData => ({
          ...prevFormData,
          employeeLevels: data,
        }));
      })
      .catch(error => console.error('Error fetching employee levels:', error));
  }, []);

  const handleEmployeeSearch = (event, value) => {
    if (value.length > 0) {
      fetch(`http://localhost:8000/api/employee/search?name=${value}`)
        .then(response => response.json())
        .then(data => {
          setFormData(prevFormData => ({
            ...prevFormData,
            employees: data,
          }));
        })
        .catch(error => console.error('Error fetching employees:', error));
    }
  };

  const addEmployee = () => {
    const { emails, employees } = formData;
    if (!emails.trim()) return setFormData({ ...formData, invalidEmails: ["Please enter at least one email."] });

    const emailList = emails.split(",").map(email => email.trim());
    const validEmployees = [];
    const invalidEmails = [];

    emailList.forEach(email => {
      if (employeeDatabase[email]) {
        if (!employees.some(emp => emp.id === employeeDatabase[email].id)) {
          validEmployees.push({ ...employeeDatabase[email], availableFrom: "", bandwidth: "", weekend: "No" });
        }
      } else {
        invalidEmails.push(email);
      }
    });

    setFormData({
      ...formData,
      employees: [...employees, ...validEmployees],
      invalidEmails,
      emails: "",
      showTable: true,
      showSummary: true,
    });
  };

  const removeEmployee = (id) => {
    setFormData({ ...formData, employees: formData.employees.filter(emp => emp.id !== id) });
  };

  const updateEmployee = (id, field, value) => {
    setFormData({
      ...formData,
      employees: formData.employees.map(emp => (emp.id === id ? { ...emp, [field]: value } : emp)),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Container maxWidth="md" className="container">
          <Paper elevation={3} className="paper">
            <Typography variant="h5" gutterBottom className="simpleHeading">New Training Request</Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between" marginBottom="1rem">
              <Typography className="subheader">Request ID/No: <strong>#1234</strong></Typography>
              <Typography className="subheader">Requested By: <strong>Joe Maison</strong></Typography>
            </Box>
            <Paper elevation={1} style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
              <Typography className="simpleHeading">Training Details</Typography>
              <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="2rem" gap={2}>
                <FormControl fullWidth className="formControl">
                  <Typography className="subheader">Request on behalf <span className="required">*</span></Typography>
                  <TextField variant="outlined" name="requestonbehalf" InputProps={{ endAdornment: <SearchIcon color="disabled" /> }} />
                </FormControl>
                <FormControl fullWidth className="formControl">
                  <Typography className="subheader">Source <span className="required">*</span></Typography>
                  <Select
                    variant="outlined"
                    name="source"
                    value={formData.selectedSource}
                    onChange={handleSourceChange}
                    style={{ height: "30px", fontSize: "12px" }}
                  >
                    {formData.sources.map(source => (
                      <MenuItem key={source.source_id} value={source.source_id}>
                        {source.source_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth className="formControl">
                  <Typography className="subheader">Training Objective <span className="required">*</span></Typography>
                  <Select
                    variant="outlined"
                    name="trainingObjective"
                    value={formData.selectedTrainingObjective}
                    onChange={handleTrainingObjectiveChange}
                    style={{ height: "30px", fontSize: "12px" }}
                  >
                    {formData.trainingObjectives.map(objective => (
                      <MenuItem key={objective.training_id} value={objective.training_id}>
                        {objective.training_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Typography className="simpleHeading">Training Purpose</Typography>
              <FormControl component="fieldset">
                <RadioGroup row name="trainingPurpose" value={formData.trainingPurpose} onChange={handleChange}>
                  <FormControlLabel value="prospect" control={<CustomRadio />} label={<Typography className="subheader">Prospect</Typography>} />
                  <FormControlLabel value="project" control={<CustomRadio />} label={<Typography className="subheader">Project</Typography>} />
                </RadioGroup>
              </FormControl>
              {formData.trainingPurpose === "prospect" ? (
                <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="2rem" gap={2}>
                  <FormControl fullWidth className="formControl">
                    <Typography className="subheader">Prospect Name <span className="required">*</span></Typography>
                    <TextField variant="outlined" name="prospectName" InputProps={{ endAdornment: <SearchIcon color="disabled" /> }} />
                  </FormControl>
                  <FormControl fullWidth className="formControl">
                    <Typography className="subheader">Service Division <span className="required">*</span></Typography>
                    <Select variant="outlined" defaultValue="" style={{ height: "30px", fontSize: "12px" }}>
                      {formData.services.map(service => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.service_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="2rem" gap={2}>
                  <FormControl fullWidth className="formControl">
                    <Typography className="subheader">Prospect Name <span className="required">*</span></Typography>
                    <Select
                      variant="outlined"
                      name="prospectName"
                      value={formData.selectedProject}
                      onChange={(e) => setFormData({ ...formData, selectedProject: e.target.value })}
                      style={{ height: "30px", fontSize: "12px" }}
                    >
                      <MenuItem value=""><em>Select Project</em></MenuItem>
                      {formData.projects.map(project => (
                        <MenuItem key={project.ProjectID} value={project.ProjectID}>
                          {project.ProjectName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="formControl">
                    <Typography className="subheader">Service Division <span className="required">*</span></Typography>
                    <Select variant="outlined" defaultValue="" style={{ height: "30px", fontSize: "12px" }}>
                      {formData.services.map(service => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.service_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
              <Typography className="simpleHeading">Employee Details</Typography>
              <FormControl component="fieldset" className="formControl">
                <RadioGroup row name="employeeDetails" value={formData.employeeDetails} onChange={handleChange}>
                  <FormControlLabel value="add" control={<CustomRadio />} label={<Typography className="subheader">Add Employees</Typography>} />
                  <FormControlLabel value="open" control={<CustomRadio />} label={<Typography className="subheader">Place an Open Request</Typography>} />
                </RadioGroup>
              </FormControl>
              <Box style={{ width: "100%" }}>
                {formData.employeeDetails === "add" ? (
                  <Box display="flex" flexDirection="column" marginBottom="1rem">
                    <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="1rem" gap={2}>
                    <FormControl fullWidth className="formControl">
  <Typography className="subheader">Select Employee <span className="required">*</span></Typography>
  <Autocomplete
    options={formData.employees}
    getOptionLabel={(option) => option.name || ""}
    onInputChange={handleEmployeeSearch}
    renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type employee name" />}
  />
</FormControl>
                      <Typography className="subheader" align="center" style={{ margin: "auto 0" }}>OR</Typography>
                      <FormControl fullWidth className="formControl">
                        <Typography className="subheader">Enter comma(,) separated email ids <span className="required">*</span></Typography>
                        <TextField variant="outlined" name="emails" value={formData.emails} onChange={handleChange} />
                      </FormControl>
                    </Box>
                    <Box marginTop="1.5rem" display="flex" justifyContent="flex-end">
                      <Button variant="contained" onClick={addEmployee} sx={{ height: "35px", fontSize: "12px", minWidth: "75px" }}>+</Button>
                    </Box>
                    {formData.showTable && (
                      <TableContainer component={Paper} className="tableContainer">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell className="tableHeader">Employee ID</TableCell>
                              <TableCell className="tableHeader">Name</TableCell>
                              <TableCell className="tableHeader">Available From</TableCell>
                              <TableCell className="tableHeader">Daily Bandwidth</TableCell>
                              <TableCell className="tableHeader">Available on Weekend?</TableCell>
                              <TableCell className="tableHeader">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {formData.employees.slice(formData.page * formData.rowsPerPage, formData.page * formData.rowsPerPage + formData.rowsPerPage).map((employee) => (
                              <TableRow key={employee.id}>
                                <TableCell>
                                  <Box display="flex" alignItems="center" gap={1}>
                                    <Avatar src={employee.image} />
                                    {employee.id}
                                  </Box>
                                </TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>
                                  <TextField type="date" value={employee.availableFrom} onChange={(e) => updateEmployee(employee.id, "availableFrom", e.target.value)} size="small" />
                                </TableCell>
                                <TableCell>
                                  <Select value={employee.bandwidth} onChange={(e) => updateEmployee(employee.id, "bandwidth", e.target.value)} size="small">
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="2 Hours">2 Hours</MenuItem>
                                    <MenuItem value="4 Hours">4 Hours</MenuItem>
                                    <MenuItem value="6 Hours">6 Hours</MenuItem>
                                    <MenuItem value="Full Day">Full Day</MenuItem>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <RadioGroup row value={employee.weekend} onChange={(e) => updateEmployee(employee.id, "weekend", e.target.value)}>
                                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                                  </RadioGroup>
                                </TableCell>
                                <TableCell>
                                  <IconButton color="error" onClick={() => removeEmployee(employee.id)} size="small"><CloseIcon /></IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={formData.employees.length} rowsPerPage={formData.rowsPerPage} page={formData.page} onPageChange={(e, newPage) => setFormData({ ...formData, page: newPage })} onRowsPerPageChange={(e) => setFormData({ ...formData, rowsPerPage: parseInt(e.target.value, 10), page: 0 })} />
                      </TableContainer>
                    )}
                    {formData.showSummary && <Typography>Total employees selected: {formData.employees.length}</Typography>}
                  </Box>
                ) : (
                  <Box display="flex" flexDirection="column" marginBottom="1rem">
                    <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="1rem" gap={2}>
                      <FormControl fullWidth className="formControl">
                        <Typography className="subheader">Number of People to be Trained <span className="required">*</span></Typography>
                        <TextField variant="outlined" type="number" />
                      </FormControl>
<FormControl fullWidth className="formControl">
  <Typography className="subheader">Employee Level <span className="required">*</span></Typography>
  <Select
    variant="outlined"
    name="employeeLevel"
    value={formData.selectedEmployeeLevel}
    onChange={(e) => setFormData({ ...formData, selectedEmployeeLevel: e.target.value })}
    style={{ height: "30px", fontSize: "12px" }}
  >
    <MenuItem value=""><em>Select Employee Level</em></MenuItem>
    {formData.employeeLevels.map(level => (
      <MenuItem key={level.id} value={level.id}>
        {level.job_title}
      </MenuItem>
    ))}
  </Select>
</FormControl>
                    </Box>
                  </Box>
                )}
              </Box>
              <Typography className="simpleHeading">Skill Details</Typography>
              <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="1rem" gap={2}>
                <FormControl fullWidth className="formControl">
                  <Typography className="subheader">Expected completion Timeline <span className="required">*</span></Typography>
                  <DatePicker value={formData.selectedDate} onChange={handleDateChange} renderInput={(params) => <TextField {...params} variant="outlined" />} />
                </FormControl>
                <FormControl fullWidth className="formControl">
  <Typography className="subheader">Request for - Tech Stack / Area <span className="required">*</span></Typography>
  <Select
    variant="outlined"
    name="techStack"
    value={formData.selectedTechStack}
    onChange={handleTechStackChange}
    style={{ height: "30px", fontSize: "12px" }}
  >
    <MenuItem value=""><em>Select Tech Stack</em></MenuItem>
    {formData.techStacks.map(stack => (
      <MenuItem key={stack.stack_id} value={stack.stack_id}>
        {stack.stack_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl fullWidth className="formControl">
  <Typography className="subheader">Request for - Primary Skill / Competency <span className="required">*</span></Typography>
  <Select
    variant="outlined"
    name="primarySkill"
    value={formData.selectedPrimarySkill}
    onChange={(e) => setFormData({ ...formData, selectedPrimarySkill: e.target.value })}
    style={{ height: "30px", fontSize: "12px" }}
  >
    <MenuItem value=""><em>Select Skill</em></MenuItem>
    {formData.primarySkills.map(skill => (
      <MenuItem key={skill.skill_id} value={skill.skill_id}>
        {skill.skill_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="1rem" gap={2}>
                <FormControl fullWidth className="formControl">
                  <Typography className="subheader">Provide other skills information <span className="required">*</span></Typography>
                  <ReactQuill
                    value={formData.otherSkill}
                    onChange={(value) => setFormData({ ...formData, otherSkill: value })}
                    modules={{
                      toolbar: [
                        ['bold', 'italic'], // Only bold and italic
                      ],
                    }}
                  />
                </FormControl>
                <FormControl fullWidth className="formControl">
                  <Typography className="subheader">Suggest completion criteria <span className="required">*</span></Typography>
                  <ReactQuill
                    value={formData.completionCriteria}
                    onChange={(value) => setFormData({ ...formData, completionCriteria: value })}
                    modules={{
                      toolbar: [
                        ['bold', 'italic'], // Only bold and italic
                      ],
                    }}
                  />
                </FormControl>
                <FormControl fullWidth className="formControl">
                  <Typography className="subheader">Comments</Typography>
                  <ReactQuill
                    value={formData.comment}
                    onChange={(value) => setFormData({ ...formData, comment: value })}
                    modules={{
                      toolbar: [
                        ['bold', 'italic'], // Only bold and italic
                      ],
                    }}
                  />
                </FormControl>
              </Box>
              <Box className="buttonGroup">
                <Button variant="outlined" style={{ minWidth: "75px" }}>Cancel</Button>
                <Button variant="contained" style={{ minWidth: "75px" }}>Submit</Button>
              </Box>
            </Paper>
          </Paper>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default NewTrainingRequest;