import { Breadcrumbs, Container, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

const AppBreadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const breadcrumbSegments = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLastSegment = index === pathSegments.length - 1;
    const segmentFormatted = segment.charAt(0).toUpperCase() + segment.slice(1);
    return isLastSegment ? (
      <Typography key={path} color="textPrimary">
        {segmentFormatted}
      </Typography>
    ) : (
      <Link key={path} to={path}>
        {segmentFormatted}
      </Link>
    );
  });

  if (location.pathname === "/home") return null;

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/home">Home</Link>
        {breadcrumbSegments}
      </Breadcrumbs>
    </Container>
  );
};

export default AppBreadcrumbs;
