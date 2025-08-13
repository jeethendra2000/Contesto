"use client"; // Add this directive to mark the component as a Client Component

import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material"; // Import from MUI v5

export default function TestComponent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or some async action
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Test Component</Typography>
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="body1">Data has been loaded!</Typography>
        )}
      </Grid>
    </Grid>
  );
}
