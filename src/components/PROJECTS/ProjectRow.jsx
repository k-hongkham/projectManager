import React from "react";
// import { useNavigate } from "react-router-dom";

const ProjectRow = ({ project }) => {
  // const navigate = useNavigate();
  // const handleNewProject = (project) => {
  //   navigate(`/${project.id}`);
  // };
  return (
    <>
      <td>{project.id}</td>
      <td>{project.projectTitle}</td>
      <td>{project.projectOwner} </td>
      <td>{project.projectSalesRep}</td>
      <td
        className="table-description"
        style={{ wordWrap: "break-word", minWidth: "400px", maxWidth: "400px" }}
      >
        {project.description}
      </td>
      <td>{project.status}</td>
    </>
  );
};

export default ProjectRow;
