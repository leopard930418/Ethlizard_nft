import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import BackgroundContainer from "./BackgroundContainer";

export default function Layout() {
  return (
    <BackgroundContainer>
      <Container sx={{maxWidth: 1200}}>
        <Outlet />
      </Container>
    </BackgroundContainer>
  );
}
