import { Box, Typography } from '@mui/material';
import React, { PropsWithChildren, ReactNode } from 'react';



interface IProps  {
  heading?: string;
  subheading?: ReactNode;
  actions?: ReactNode;
}

const FullPage = ({ subheading, heading, actions, children }: PropsWithChildren<IProps>) =>
    <>
        <section style={{ marginBottom: 20 }}>
            <Box display="flex" alignItems="flex-start">
                <Box flexGrow={1}>
                    <Typography variant="h5" gutterBottom={true}>{heading}</Typography>
                    {subheading && <Typography variant="h6">{subheading}</Typography>}
                </Box>
                {actions && <Box alignSelf="flex-end">{actions}</Box>}
            </Box>
        </section>
        {children}
    </>

export default FullPage;