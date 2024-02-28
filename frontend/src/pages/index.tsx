import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import Head from "next/head";
import Image from "next/image";
import { Box } from "@mui/material";
import { HomeLayout } from "../components/landing/home-layout";
import { ReactElement, useEffect, useState } from "react";

type Profile = {
  ID: number;
  FirstName: string;
  LastName: string;
  JobTitle: string;
  CompanyName: string;
  Image: string;
  ImageText: string;
  Description: string;
};

const HomePageText = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  zIndex: 1,
  alignSelf: "center",
  display: "flex",
  justifyContent: "center",
  textAlign: "end",
  width: "100%",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
  },
}));

const HomePageTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  maxWidth: "95%",
  [theme.breakpoints.up("md")]: {
    maxWidth: "45%",
    paddingRight: "3%",
  },
}));

const HomePage = () => {
  const [profile, setProfile] = useState<null | Profile>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data[0]);
          setProfile(data[0]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Home | Next.js Blog</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          width: "100%",
          position: "relative",
        }}
      >
        {profile && (
          <Image
            src={profile?.Image ? profile.Image : "/images/landing.jpg"}
            alt={profile?.ImageText}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            style={{ zIndex: 0, opacity: 0.4 }}
          />
        )}
        {profile && (
          <HomePageText>
            <HomePageTextBox>
              <Typography
                variant="h2"
                sx={{ fontFamily: "Permanent Marker", letterSpacing: ".5rem" }}
              >
                {profile?.FirstName} {profile?.LastName}
              </Typography>
              <Typography
                variant="h6"
                mb="5%"
                sx={{ lineHeight: 2, opacity: 0.7 }}
              >
                {profile?.JobTitle}, {profile?.CompanyName}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ lineHeight: 2 }}>
                {profile?.Description}
              </Typography>
            </HomePageTextBox>
          </HomePageText>
        )}
      </Box>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default HomePage;
