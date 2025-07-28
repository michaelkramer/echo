import { Breadcrumbs, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ROUTES } from "../../constant/routes";
import { getUser } from "../../services/users.service";

const AppBreadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const [breadcrumbSegments, setBreadcrumbSegments] = useState<
    React.ReactNode[]
  >([]);

  useEffect(() => {
    const getBreadcrumbs = async () => {
      const segments = await Promise.all(
        pathSegments.map(async (segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLastSegment = index === pathSegments.length - 1;
          const segmentFormatted = await segmentToName(
            segment,
            pathSegments[index - 1],
          );
          if (segmentFormatted === "Dashboard" || segmentFormatted === "Home") {
            return null; // Skip the first two segments (Home and Dashboard)
          }
          return isLastSegment ? (
            <Typography key={path} color="textPrimary">
              {segmentFormatted}
            </Typography>
          ) : (
            <Link key={path} to={path}>
              {segmentFormatted}
            </Link>
          );
        }),
      );
      setBreadcrumbSegments(segments.filter(Boolean));
    };
    getBreadcrumbs();
  }, [location.pathname]);

  if (
    location.pathname === ROUTES.HOME ||
    location.pathname === ROUTES.DASHBOARD
  )
    return null;

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={ROUTES.HOME}>Home</Link>
        {breadcrumbSegments}
      </Breadcrumbs>
    </Container>
  );
};

async function segmentToName(
  segment: string,
  prevSegment: string,
): Promise<string> {
  if (prevSegment === "users") {
    return await transformUserIdToName(segment);
  }
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

async function transformUserIdToName(userId: string): Promise<string> {
  const user = await getUser(userId);
  if (user && user.display_name) {
    return user.display_name;
  }
  // If user not found or display_name is not available, return the userId
  console.warn(`User with ID ${userId} not found or display_name is missing.`);
  return userId;
}

export default AppBreadcrumbs;
