import { Button } from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const PageButton = styled(Button)(({ theme, page, router }) => ({
  color: (page ? router === page : false)
    ? theme.palette.primary.main
    : theme.palette.primary.contrastText,
  borderBottom: (page ? router === page : false) ? "1px solid #DBDFFD" : "none",
  padding: "auto 0",
  transition: "all .1s",
  "&:hover": {
    color: "#DBDFFD",
    backgroundColor: "transparent",
    borderBottom: "1px solid #DBDFFD",
    transform: "translateY(-2px)",
  },
}));

type Props = {
  href: string;
  title: string;
};

export const PageButtons = (props: Props) => {
  const router = useRouter();
  const { href, title } = props;

  return (
    <Link href={href} key={title}>
      <a style={{ textDecoration: "none" }}>
        <PageButton page={href} router={router.pathname}>
          {title}
        </PageButton>
      </a>
    </Link>
  );
};
