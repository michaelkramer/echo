import { Typography } from "@mui/material";
import { Activity, getActivity } from "../../services/activities.service";

export async function clientLoader({
  params,
}: {
  params: { activityId: string };
}): Promise<Activity> {
  console.log("params", params);
  const data = await getActivity(params.activityId);
  return data;
}

export default function Component({ loaderData }: { loaderData: Activity }) {
  return (
    <div>
      Activity
      <div>
        {Object.entries(loaderData).map(([key, value]) => (
          <div key={key}>
            <Typography variant="body1">{key}</Typography>
            <Typography variant="body2">{String(value)}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
