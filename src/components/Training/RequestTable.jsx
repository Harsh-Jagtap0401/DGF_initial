import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, IconButton, TablePagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'; // Import the new icon
import "../Training/RequestTable.css"; // Import the CSS file

const data = [
  { id: "123", project: "iAlign", learners: 5, objective: "Upskilling", techStack: "Accessibility", requestedOn: "Jan 20, 2025", status: "SPOC Approval Awaited" },
  { id: "231", project: "Staffing Nation", learners: 5, objective: "Upskilling", techStack: "React", requestedOn: "Jan 20, 2025", status: "Learning In Progress", progress: "2/7 Completed" },
  { id: "321", project: "Other Project Name", learners: 3, objective: "Upskilling", techStack: "Soft Skills", requestedOn: "Jan 15, 2025", status: "Preparing Learning Plan" },
  { id: "321", project: "Project Name/Title", learners: 2, objective: "Upskilling", techStack: "Angular", requestedOn: "Jan 12, 2025", status: "Learning In Progress", progress: "2/7 Completed" },
  { id: "321", project: "Project Title", learners: 2, objective: "Upskilling", techStack: "MongoDB", requestedOn: "Jan 10, 2025", status: "Clarification Awaited" },
  { id: "322", project: "Another Project", learners: 4, objective: "Upskilling", techStack: "Python", requestedOn: "Jan 8, 2025", status: "Completed" },
  { id: "323", project: "Yet Another Project", learners: 3, objective: "Upskilling", techStack: "Node.js", requestedOn: "Jan 5, 2025", status: "Pending" }
];

const RequestTable = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Req No</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Learners</TableCell>
            <TableCell>Objective</TableCell>
            <TableCell>Tech Stack</TableCell>
            <TableCell>Requested On</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.project}</TableCell>
              <TableCell>
                <Avatar>{row.learners}</Avatar>
              </TableCell>
              <TableCell>{row.objective}</TableCell>
              <TableCell>{row.techStack}</TableCell>
              <TableCell>{row.requestedOn}</TableCell>
              <TableCell>
                <Typography color={row.status.includes("Progress") ? "primary" : "textSecondary"}>
                  {row.status} {row.progress ? `(${row.progress})` : ""}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton>
                  <ArrowCircleRightOutlinedIcon /> {/* Replace eye icon with new icon */}
                </IconButton>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default RequestTable;