"use client";
import React from "react";
import Image from "next/image";
import {
  Box,
  Card,
  CardHeader,
  CardActionArea,
  Avatar,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Tooltip from "@mui/material/Tooltip";

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

export default function ContestCard({
  name,
  site,
  start_time,
  start_datetime,
  duration_seconds,
  url,
  showCalendar = true,
}) {
  const logo = siteLogos[site] || siteLogos["Informatsy"]; // fallback image

  const formatIcsDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const handleAddToCalendarDownload = () => {
    const startDate = new Date(start_datetime);
    const duration = duration_seconds || 7200;
    const endDate = new Date(startDate.getTime() + duration * 1000);
    const uid = `${name.replace(/\s+/g, "_")}-${startDate.getTime()}@contesto`;
    const dtstamp = formatIcsDate(new Date());
    const dtstart = formatIcsDate(startDate);
    const dtend = formatIcsDate(endDate);
    const blob = new Blob(
      [
        [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Contesto//EN",
          "BEGIN:VEVENT",
          `UID:${uid}`,
          `DTSTAMP:${dtstamp}`,
          `DTSTART:${dtstart}`,
          `DTEND:${dtend}`,
          `SUMMARY:${name}`,
          `DESCRIPTION:Register at ${url}`,
          "BEGIN:VALARM",
          "TRIGGER:-PT30M",
          "ACTION:DISPLAY",
          "DESCRIPTION:Reminder",
          "END:VALARM",
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\r\n"),
      ],
      {
        type: "text/calendar;charset=utf-8",
      },
    );

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${name.replace(/[^a-z0-9]/gi, "_")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const [added, setAdded] = React.useState(false);

  const handleAddToCalendar = () => {
    setAdded(true);
    handleAddToCalendarDownload();

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <Card
      onClick={() => window.open(url, "_blank")}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",

        WebkitTapHighlightColor: "transparent",

        "&:hover": {
          backgroundColor: "action.hover",
        },

        "&:active": {
          transform: "scale(0.99)",
        },
      }}
    >
      <CardHeader
        sx={{
          p: 1.5,
          alignItems: "center",
          "& .MuiCardHeader-title": {
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mr: 0.5,
          },
          "& .MuiCardHeader-subheader": {
            mt: 0.5,
          },
          "& .MuiCardHeader-action": {
            alignSelf: "center",
            margin: 0,
          },
        }}
        avatar={
          <Avatar alt={site} src={logo}>
            {site[0]}
          </Avatar>
        }
        title={name}
        subheader={start_time}
        action={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            {showCalendar && (
              <Tooltip title="Add to calendar">
                <IconButton
                  aria-label="add event"
                  disableRipple
                  disableFocusRipple
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCalendar();
                  }}
                  sx={{
                    p: 0.5,
                    minWidth: 0,
                    transition: "transform 0.1s ease",

                    "&:active": {
                      transform: "scale(0.85)",
                    },
                  }}
                >
                  <Image
                    src={
                      added ? "/Icons/check-mark.png" : "/Icons/add-event.png"
                    }
                    alt="Add event"
                    width={28}
                    height={28}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
      />
    </Card>
  );
}
