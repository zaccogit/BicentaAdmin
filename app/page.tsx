import Dashboard from "@/components/dashboard/Dashboard";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <Layout title='Home Layout'>.
        <Dashboard />
    </Layout>
  );
}
