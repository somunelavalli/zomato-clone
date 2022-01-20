import React from "react";
import FoodTabs from "../components/FoodTabs";
import Layout from "../components/Layout";

function HomePage() {
  return (
    <Layout>
      <FoodTabs />
      <h1>Home Page</h1>
    </Layout>
  );
}

export default HomePage;
