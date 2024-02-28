import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import styled from "@emotion/styled";
import _ from "lodash";
import { ReactElement, useState } from "react";
import { HomeSidebar } from "./home-sidebar";
import { PageButtons } from "./page-buttons";
import { CustomMenuIcon } from "./menu-icon";

type Props = {
  window?: () => Window;
  children: ReactElement;
};

function HiddenNav(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const pages = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/blog",
    title: "Blog",
  },
  {
    href: "/contact",
    title: "Contact",
  },
];

const HomeNavRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: theme.palette.primary.contrastText,
  boxShadow: "none",
  display: "flex",
  padding: "10px 0",
  zIndex: 500,
  backdropFilter: "blur(0.125rem)",
}));

export const HomeNav = () => {
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorNav) {
      setAnchorNav(event.currentTarget);
    } else {
      setAnchorNav(null);
    }
  };

  const pagesList = _.map(pages, (page) => (
    <PageButtons key={page.href} href={page.href} title={page.title} />
  ));

  return (
    <>
      <HiddenNav>
        <Box>
          <HomeNavRoot position="fixed">
            <Toolbar disableGutters sx={{ px: "3.6%" }}>
              <Typography variant="h4" color="primary.main" sx={{ flex: 1 }}>
                Blog Name
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flex: "0 1 30%",
                  justifyContent: "space-between",
                }}
              >
                {pagesList}
              </Box>
            </Toolbar>
          </HomeNavRoot>
          <Box
            sx={{
              display: { xs: "inline-block", md: "none" },
              position: "fixed",
              top: 25,
              right: 10,
              zIndex: 2000,
            }}
          >
            <IconButton size="large" onClick={handleOpen}>
              <CustomMenuIcon anchor={Boolean(anchorNav)} />
            </IconButton>
            <HomeSidebar
              open={Boolean(anchorNav)}
              onClose={() => setAnchorNav(null)}
              pages={pages}
            />
          </Box>
        </Box>
      </HiddenNav>
    </>
  );
};
