import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

// import { getAllPosts } from '../../../service/api';
import { API } from "../../../service/api";

//components
import Post from "./Post";

const Posts = () => {
  const [post, getPost] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
     // console.log("category", category);
      let response = await API.getAllPosts({ category: category || "" });
       // console.log("response.data",response);
       // console.log("response.data",post);
      if (response.issuccess) {
        getPost(response.data);
      //  console.log("response.data",response.data);
       //console.log("response.data",post);
      }
    };
    fetchData();
  }, [category]);
 //console.log("response.data",post);
  return (
    <>
      {post?.length ? (
        post.map((post) => (
          <Grid item lg={3} sm={4} xs={12}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`details/${post._id}`}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No data is available for selected category
        </Box>
      )}
    </>
    





  );
};

export default Posts;
