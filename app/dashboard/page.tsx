import Dashboard from "@/components/dashboard/Dashboard";
import Layout from "@/components/layout/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard de la app",
};

export default async function DashboardScreen() {


  return (
    <Layout title='Home Layout'>
        <Dashboard />
    </Layout>
  );
}
