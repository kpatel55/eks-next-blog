import { Box } from "@mui/material"
import { styled } from "@mui/material/styles";
import { AppProps } from "next/app";
import type { ReactNode } from 'react'
import { HomeNav } from "../nav/home-nav";

const HomeLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    width: '100%',
    height: '100vh',
}));

type Props = {
    children?: ReactNode
}

export const HomeLayout = (props: Props) => {
    const { children } = props;

    return (
        <>
            <HomeNav />
            <HomeLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        width: '100%'
                    }}
                >
                    { children }
                </Box>
            </HomeLayoutRoot>
        </>
    );
};