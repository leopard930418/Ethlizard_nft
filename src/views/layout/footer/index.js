import React, { useState, useEffect } from "react";
import { Container, Divider, Grid } from "@mui/material";
import CustomText from "views/components/CustomText";
import CustomImage from "views/components/CustomImage";
import FooterLogo from "assets/images/FooterLogo.svg";
import Discord from "assets/images/Discord.svg";
import Twitter from "assets/images/Twitter.svg";
import OtherLink from "assets/images/OtherLink.svg";
import { Link, useLocation } from "react-router-dom";

export default function Footer({ ...props }) {
  const pathname = useLocation().pathname;

  const [active, setActive] = useState({ to: pathname });
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const handleActive = (value = {}) => setActive(value);
  return (
    <Container sx={{ maxWidth: 1200 }}>
      <Grid container className="items-center">
        {width > 497 ? (
          <>
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className="flex sm:block justify-center"
            >
              <Grid item xs={6}>
                <CustomImage src={FooterLogo} className="h-16"></CustomImage>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                direction={{ xs: "column", sm: "row" }}
              >
                {[
                  { to: "/home", label: "Whitepaper", target:"_blank"},
                  { to: "/investments", label: "Privacy Policy", target:"_blank" },
                  { to: "/staking", label: "Cookie Policy", target:"_blank" },
                  { to: "/rewards", label: "Teams of Use", target:"_blank" },
                ].map((item, itemIndex) => (
                  <Grid item key={itemIndex}>
                    <a
                      href={item?.to ?? "#"}
                      onClick={() => handleActive(item)}
                      target="_blank"
                      rel='noreferrer'
                    >
                      <CustomText
                        transparent
                        bold="bold"
                        color="white"
                        size="sm"
                      >
                        {item?.label ?? ""}
                      </CustomText>
                    </a>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className="sm:justify-end justify-center"
            >
              <Grid item className="pr-2 pl-2">
                <a href="https://discord.com/invite/ethlizards">
                  <CustomImage src={Discord}></CustomImage>
                </a>
              </Grid>
              <Grid item className="pr-2 pl-2">
                <a href="https://twitter.com/ethlizards">
                  <CustomImage src={Twitter}></CustomImage>
                </a>
              </Grid>
              <Grid item className="pr-2 pl-2">
                <a href="https://opensea.io/collection/ethlizards">
                  <CustomImage src={OtherLink}></CustomImage>
                </a>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className="flex sm:block justify-center"
            >
              <Grid item xs={6}>
                <CustomImage src={FooterLogo} className="h-16"></CustomImage>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className="sm:justify-end justify-center pb-4"
            >
              <Grid item className="pr-2 pl-2">
                <a href="https://discord.com/invite/ethlizards">
                  <CustomImage src={Discord}></CustomImage>
                </a>
              </Grid>
              <Grid item className="pr-2 pl-2">
                <a href="https://twitter.com/ethlizards">
                  <CustomImage src={Twitter}></CustomImage>
                </a>
              </Grid>
              <Grid item className="pr-2 pl-2">
                <a href="https://opensea.io/collection/ethlizards">
                  <CustomImage src={OtherLink}></CustomImage>
                </a>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                direction={{ xs: "column", sm: "row" }}
              >
                {[
                  { to: "/home", label: "Whitepaper" },
                  { to: "/investments", label: "Privacy Policy" },
                  { to: "/staking", label: "Cookie Policy" },
                  { to: "/rewards", label: "Teams of Use" },
                ].map((item, itemIndex) => (
                  <Grid item key={itemIndex}>
                    <Link
                      to={item?.to ?? "#"}
                      onClick={() => handleActive(item)}
                    >
                      <CustomText transparent bold="bold" size="sm">
                        {item?.label ?? ""}
                      </CustomText>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={12} className="pt-4 pb-4">
          <CustomText transparent size="xs" color="white">
            Ethlizards @2021. All rights reserved
          </CustomText>
        </Grid>
      </Grid>
    </Container>
  );
}
