

import { Edit, Add } from "@mui/icons-material";
import { Box, Fab, IconButton, Tooltip } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { IComment } from "./IComment";
import FullPage from "../../core/FullPage";
import TableV2 from "../../core/TableV2";
import CommentsClient from "./CommentsClient";


export const AddLink = () => {
    return (
        <Fab to="/comments/create" component={NavLink} variant="extended" color="primary" aria-label="add Comment" size="medium">
            <Add />Add Comment
        </Fab>);
}



const CommentList = () => {


    const columns = useMemo<MRT_ColumnDef<IComment>[]>(
        () => [
            {
                accessorKey: 'id', 
                header: 'Id',
            },
            {
                accessorKey: 'postId', 
                header: 'Post Id',
                size: 10,
            },
            {
                accessorKey: 'name', 
                header: 'Company Name',
                size: 150,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 150,
            },
            {
                accessorKey: 'body', 
                header: 'Body',
                size: 200,
            }            
        ],
        [],
    );


    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const nav = useNavigate();
    //const { companies, setCompanies } = useCompanyContext();
    const [ comments, setComments ] = useState<IComment[]>([]);


    useEffect(() => {
        setIsLoadingComments(true);
        CommentsClient.fetchComments().then((data) => {
            setComments((data || []) as IComment[]);
        }).catch((err) => {
            console.error(JSON.stringify(err))
            setComments([] as IComment[]);
        }).finally(() => {
            setIsLoadingComments(false);
        })
    }, [])

    

    return (
        <FullPage heading="Comments" actions={<AddLink />} >
            <TableV2 state={{ isLoading: isLoadingComments, columnVisibility: { id: false, postId:false } }} enableRowActions={true} columns={columns} data={comments}
                renderRowActions={({ row  }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => nav(`/comments/edit/${row.original.id}`)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
        </FullPage>
    )
}

export default CommentList;