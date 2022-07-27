import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "views/layout";
import Home from "views/pages/home";
import Investments from "views/pages/investments";
import Staking from "views/pages/staking";
import Rewards from "views/pages/rewards";
import Claim from "views/pages/claim";
import Airdrop from "views/pages/airdrop";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="investments" element={<Investments />} />
          <Route path="staking" element={<Staking />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="claim" element={<Claim />} />
          <Route path="airdrop" element={<Airdrop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
