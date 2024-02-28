import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import _ from "lodash";
import Image from "next/image";
import { Search } from "@mui/icons-material";
import { ChangeEvent, useEffect, useState } from "react";

type Articles = {
  ID: string;
  Image: string;
  ImageText: string;
  Title: string;
  Subtitle: string;
  Description: string;
};

const ArticleCardAction = styled(CardActionArea)(() => ({
  height: 460,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  "&:hover": {
    "& .description": {
      height: 100,
      opacity: 1,
      transition: "all 1s",
    },
    "& .imageBox": {
      opacity: "1 !important",
      transform: `scale(1.1)`,
      transition: "all 1s",
    },
  },
}));

const BlogTextBox = styled(Box)(() => ({
  zIndex: 1,
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  disaply: "flex",
  flexDirection: "column",
  width: "60%",
  padding: "1rem",
  backdropFilter: "blur(0.125rem)",
}));

export const BlogArticles = () => {
  const [allArticles, setAllArticles] = useState<Articles[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Articles[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      fetch("/api/blog")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setAllArticles(data);
          setFilteredArticles(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchedArticles = allArticles.filter((article) =>
      article.Title.toLowerCase().includes(event.target.value)
    );
    setFilteredArticles(searchedArticles);
  };

  const articlesList = _.map(filteredArticles, (article) => (
    <Grid item xs={12} sm={6} md={4} key={article?.ID}>
      <Card sx={{ bgcolor: "background.default" }}>
        <ArticleCardAction>
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={article?.Image ? article.Image : "/images/dinner.jpg"}
              alt={article?.ImageText}
              layout="fill"
              objectFit="cover"
              className="imageBox"
              style={{ zIndex: 0, opacity: 0.7, transition: "all 1s" }}
            />
          </Box>
          <BlogTextBox>
            <Typography
              variant="h6"
              sx={{ color: "primary.main", opacity: 0.7 }}
            >
              {article?.Subtitle}
            </Typography>
            <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
              {article?.Title}
            </Typography>
            <Typography
              className="description"
              sx={{
                color: "primary.main",
                fontSize: ".7rem",
                fontWeight: 700,
                height: { md: 0 },
                opacity: { md: 0 },
                transition: "all 1s",
              }}
            >
              {article?.Description}
            </Typography>
          </BlogTextBox>
        </ArticleCardAction>
      </Card>
    </Grid>
  ));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h3" color="primary.contrastText">
          Latest
        </Typography>
        <Box sx={{ flexBasis: 430 }}>
          <Card>
            <CardContent sx={{ padding: "0 !important" }}>
              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  placeholder="Search articles"
                  variant="outlined"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box width="100%" sx={{ py: "1rem" }}>
        <Grid
          container
          rowSpacing={{ xs: 4, md: 3 }}
          columnSpacing={{ sm: 2, md: 3 }}
        >
          {articlesList}
        </Grid>
      </Box>
    </Box>
  );
};
