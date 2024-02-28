import { Box } from "@mui/material";
import styled from "@emotion/styled";

const MenuCloseIcon = styled(Box)(({ theme, anchor }) => ({
  backgroundColor: anchor ? "transparent" : theme.palette.primary.contrastText,
  width: "1.2rem",
  height: "2px",
  position: "relative",
  "&::before, &::after": {
    content: '""',
    backgroundColor: anchor
      ? theme.palette.primary.dark
      : theme.palette.primary.contrastText,
    width: "1.2rem",
    height: "2px",
    zIndex: 2000,
    display: "inline-block",
    position: "absolute",
    left: 0,
    transition: "transform .2s",
  },
  "&::before": {
    top: anchor ? 0 : "-.4rem",
    transform: anchor && "rotate(45deg)",
  },
  "&::after": {
    content: '""',
    top: anchor ? 0 : ".4rem",
    transform: anchor && "rotate(-45deg)",
  },
}));

type Props = {
  anchor: boolean;
};

export const CustomMenuIcon = ({ anchor }: Props) => {
  return <MenuCloseIcon anchor={anchor} />;
};
