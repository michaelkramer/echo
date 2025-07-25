import { analyticsDataClient } from "../config/analytics-data-client";
import env from "../env";

const propertyId = env.PROPERTY_ID; // Use environment variable or default value

export async function aggregateReport() {
  const property = `properties/${propertyId}`;

  const reports = [
    {
      label: "Daily Active Users",
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
    },
    {
      label: "Weekly Active Users",
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "week" }],
      metrics: [{ name: "activeUsers" }],
    },
    {
      label: "Monthly Active Users",
      dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
      dimensions: [{ name: "month" }],
      metrics: [{ name: "activeUsers" }],
    },
    {
      label: "Avg. Sessions per User (Daily)",
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessionsPerUser" }],
    },
    {
      label: "Avg. Sessions per User (Weekly)",
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "week" }],
      metrics: [{ name: "sessionsPerUser" }],
    },
    {
      label: "Avg. Sessions per User (Monthly)",
      dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
      dimensions: [{ name: "month" }],
      metrics: [{ name: "sessionsPerUser" }],
    },
    {
      label: "Avg. Session Duration (Daily)",
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "averageSessionDuration" }],
    },
    {
      label: "Avg. Session Duration (Weekly)",
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "week" }],
      metrics: [{ name: "averageSessionDuration" }],
    },
    {
      label: "Avg. Session Duration (Monthly)",
      dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
      dimensions: [{ name: "month" }],
      metrics: [{ name: "averageSessionDuration" }],
    },
  ];

  const data = [];
  for (const config of reports) {
    // console.log(`\n=== ${config.label} ===`);
    const [response] = await analyticsDataClient.runReport({
      property,
      ...config,
    });

    const tempData = response.rows?.map((row) => {
      return {
        x: config.dimensions
          .map((_, i) => row.dimensionValues?.[i]?.value ?? "N/A")
          .join(" | "),
        y: config.metrics
          .map((_, i) => row.metricValues?.[i]?.value ?? "N/A")
          .join(", "),
      };
    });
    if (tempData) {
      tempData.sort((a, b) => a.x.localeCompare(b.x));
    }
    data.push({
      label: config.label,
      data: tempData || [],
    });
  }
  const [weeklyActiveUsers] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
    dimensions: [{ name: "week" }],
    metrics: [{ name: "activeUsers" }],
  });

  const weeks = (weeklyActiveUsers.rows ?? []).map((row) => ({
    week: row.dimensionValues?.[0]?.value ?? "N/A",
    activeUsers: parseInt(row.metricValues?.[0]?.value ?? "0", 10),
  }));

  // console.log("\n=== Weekly Churn Estimate ===");
  const churn = [];
  for (let i = 1; i < weeks.length; i++) {
    const thisWeek = weeks[i];
    const lastWeek = weeks[i - 1];
    const churnRate = 1 - thisWeek.activeUsers / lastWeek.activeUsers;
    churn.push({
      lastWeek: lastWeek.week,
      week: thisWeek.week,
      churnRate,
    });
  }

  return {
    reports: data,
    churn,
  };
}
