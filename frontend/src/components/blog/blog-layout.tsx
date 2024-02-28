import { styled } from "@mui/material";
import { ReactNode } from "react";
import { HomeNav } from "../nav/home-nav";
import { Box } from "@mui/material";

const BlogLayoutRoot = styled('div')(({ theme }) => ({
    // background: theme.palette.background.paper,
    diaply: 'flex',
    flex: '1 1 auto',
    // height: '100vh',
    width: '100%'
}));

type Props = {
    children?: ReactNode
}

export const BlogLayout = (props: Props) => {
    const {children} = props;

    return (
        <>
            <BlogLayoutRoot>
                <HomeNav />
                <Box
                    sx={{
                        width: '100%',
                        py: '5rem',
                        px: '3.6%'
                    }}
                >
                    {children}
                </Box>
            </BlogLayoutRoot>
        </>
    );
}