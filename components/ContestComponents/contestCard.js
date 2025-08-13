"use client";
import React from "react";
import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

// Image map for platform logos
const siteLogos = {
  Informatsy: "/logo.png", // default fallback
  CodeForces: "/codeforces.png",
  CodeChef: "/codechef.jpg",
  LeetCode: "/leetcode.jpg",
  TopCoder: "/topcoder.jpg",
  AtCoder: "/atcoder.png",
  CsAcademy: "/csacademy.png",
  HackerRank: "/hackerrank.png",
  HackerEarth: "/hackeearth.png",
  KickStart: "/google-img.png",
};

export default function ContestCard({ name, site, start_time, url }) {
  const logo = siteLogos[site] || siteLogos["Informatsy"]; // fallback image

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar alt={site} src={logo}>
            {site[0]}
          </Avatar>
        }
        title={name}
        subheader={start_time}
        action={
          <IconButton
            aria-label="compete"
            color="red"
            onClick={() => window.open(url, "_blank")}
            sx={{
              ml: 1,
              mt: 1,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        }
      />
    </Card>
  );
}
