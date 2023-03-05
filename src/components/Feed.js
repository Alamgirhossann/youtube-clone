import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import {Sidebar, Videos} from "./";


const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])


  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
    .then((data)=>{
      setVideos(data.items)
    })
  },[selectedCategory])

  if (!videos?.length) return <div style={{color:"white", display:"flex", justifyContent:"center", height:"90vh"}}>Loading...</div>

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "81vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
          pb: { sx: 0, md: 1.2 },
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, mb: 1, color: "#fff" }}
        >
          Copyright 2022 Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "81vh", flex: 2 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#f31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  );
};

export default Feed;
