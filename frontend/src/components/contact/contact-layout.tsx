import { Box, styled } from "@mui/material"
import { ReactNode } from "react"
import { HomeNav } from "../nav/home-nav";

const ContactLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    width: '100%'
}));

type Props = {
    children?: ReactNode
}

export const ContactLayout = (props: Props) => {
    const {children} = props;

    return (
        <>
            <ContactLayoutRoot>
                <HomeNav />
                <Box
                    sx={{
                        width: '100%',
                        py: '7rem',
                        px: '3.6%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {children}
                </Box>
            </ContactLayoutRoot>
        </>
    );
}