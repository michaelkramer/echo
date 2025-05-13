import { Outlet } from "react-router";
import Layout from "./layout";

export default function GlobalLayout() {
  return (
    <Layout disableCustomTheme={false}>
      <Outlet />
    </Layout>
  );
}
