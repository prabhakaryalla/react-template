import MaterialTable, { Action, Column, MTableToolbar, MaterialTableProps, Options } from "material-table";
import React from "react";
import tableIcons from "./TableIcons";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material";


export type DefaultTableProps<T extends object> = Omit<MaterialTableProps<T>, 'actions'> & {
    actions?: (Action<T> | ((rowData: T) => Action<T>))[];
    options?: Options<T>
};

export type TableProps<T extends object> = DefaultTableProps<T>


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowData = any;

const defaultPageSizes = [5, 10, 20, 50, 100].sort((a, b) => a - b);

export const Table = function Table(props: MaterialTableProps<RowData>) {
    const tableRef = React.useRef<MaterialTable<RowData>>(props.tableRef);
    const theme = useTheme();

    const defaultProps: Partial<MaterialTableProps<RowData>> = {
        tableRef: tableRef,
        icons: tableIcons,
        options: {
            pageSize: 10,
            pageSizeOptions: defaultPageSizes,
            selection: false,
            exportButton: true,
            exportAllData: true,
            columnsButton: true,
            toolbar: true,
            padding: 'dense',
            search: true,
            searchFieldAlignment: 'right',
            emptyRowsWhenPaging: false,
            actionsColumnIndex: -1,
            draggable: false,
            headerStyle: { fontWeight: "bold", backgroundColor: grey[300] },
            rowStyle: (data: any, index: any) => {
                if (index % 2 !== 0)
                    return { backgroundColor: grey[200] }
                return {}
            },
        },
        components: {
            Toolbar: props => (<div style={{ backgroundColor: theme.palette.primary.main }} >
                    <MTableToolbar {...props} searchFieldStyle={{ backgroundColor: grey[200] }} />
                </div>)
        }
    };

    const { ...tableProps } = { ...defaultProps, ...props };       // Shallow merge props
    tableProps.options = { ...defaultProps.options, ...props.options };                                // Merge options
    
    tableProps.actions = [...(props.actions || [])];

    tableProps.actions!.forEach((action: any) => {
        if ('render' in action) {
            action.icon = '';
            action.onClick = (() => { });
        }
    });

    tableProps.components = { ...defaultProps.components, ...props.components };

    if (tableProps.columns) {
        if (tableRef && tableRef.current && tableRef.current.props) {
            tableProps.columns = tableRef.current.props.columns;
        } else {
            // default sorting is... strange and doens't really work very well
              tableProps.columns.forEach(x => x.customSort = x.customSort || localeCompareSort(x));
        }
    }

    return <MaterialTable {...tableProps as MaterialTableProps<RowData>} />
}

const localeCompareSort = (col: Column<RowData>) => (data1: RowData, data2: RowData): number => {
    if (!col.field){ return 0; }
    const f1 = data1[col.field];
    const f2 = data2[col.field];
    if (isNaN(f1 as number) || isNaN(f2)){
      return JSON.stringify(f1).localeCompare(JSON.stringify(f2));
    } else {
      return (f1 as number) - (f2 as number);
    }
  }
  

export default Table;


// import { useTheme } from "@mui/material";
// import { MaterialReactTable, MaterialReactTableProps } from "material-react-table";


// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type RowData = any;


// export const Table = function Table(props: MaterialReactTableProps<RowData>) {


//     const theme = useTheme();


//     const defaultProps: Partial<MaterialReactTableProps<RowData>> = {
//         enableGlobalFilter: true,
//         enableFullScreenToggle: false,
//         state: {
//             density: 'compact'
//         },
//         positionActionsColumn: 'last',
//         enableStickyHeader: true,


//         muiTopToolbarProps: {
//             sx: {
//                  background : theme.palette.primary.main
//             }
//         },


//         muiSearchTextFieldProps: {
//             variant: "outlined",
//             sx: {
//                 minWidth: '18rem',
//             }
//         },
//         muiTablePaperProps: {
//             elevation: 0,
//             sx: {
//                 borderRadius: '0',
//             },
//         },
//         muiTableBodyProps: {
//             sx: {
//                 //stripe the rows, make odd rows a darker color
//                 '& tr:nth-of-type(odd) > td': {
//                     backgroundColor: '#f5f5f5',
//                 },
//             },
//         },
//     };


//     const { ...tableProps } = { ...defaultProps, ...props };       // Shallow merge props
//     tableProps.state = { ...defaultProps.state, ...props.state };                                // Merge options


//     return (<MaterialReactTable  {...tableProps as MaterialReactTableProps<RowData>} />);


// }


// export default Table;



// import { Edit, Add } from "@mui/icons-material";
// import { Box, Checkbox, Fab, IconButton, Tooltip } from "@mui/material";
// import { NavLink, useNavigate } from "react-router-dom";
// import FullPage from "../../layout/FullPage";
// import { useEffect, useMemo, useState } from "react";
// import { useCompanyContext } from "./CompanyContext";
// import ICompanyModel from "./ICompanyModel";
// import { Table } from '../../core/Table';
// import CompanyClient from "./CompanyClient";
// import { MRT_ColumnDef } from "material-react-table";


// export const AddLink = () => {
//     return (
//         <Fab to="/companies/create" component={NavLink} variant="extended" color="primary" aria-label="add company" size="medium">
//             <Add />Add Company
//         </Fab>);
// }


// // const columns = [
// //     { title: 'Company Name', field: 'name' },
// //     { title: 'Company Code', field: 'code' },
// //     { title: 'MPT Short Name', field: 'mptshortname' },
// //     { title: 'Wire Company', field: 'type' },
// //     { title: 'Exceptions Allowed', field: 'exceptionallowed', render: (rowData: any) => <Checkbox style={{ height: "5px" }} checked={rowData.exceptionallowed} /> }
// // ];


// const CompanyList = () => {


//     const columns = useMemo<MRT_ColumnDef<ICompanyModel>[]>(
//         () => [
//             {
//                 accessorKey: 'id', 
//                 header: 'Id',
//             },
//             {
//                 accessorKey: 'name', 
//                 header: 'Company Name',
//                 size: 150,
//             },
//             {
//                 accessorKey: 'code',
//                 header: 'Code',
//                 size: 150,
//             },
//             {
//                 accessorKey: 'mptshortname', 
//                 header: 'MPT Short Name',
//                 size: 200,
//             },
//             {
//                 accessorKey: 'type',
//                 header: 'Wire Company',
//                 size: 150,
//             }
//         ],
//         [],
//     );


//     const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
//     const nav = useNavigate();
//     const { companies, setCompanies } = useCompanyContext();


//     useEffect(() => {
//         setIsLoadingCompanies(true);
//         CompanyClient.fetchCompanies().then((data) => {
//             setCompanies((data || []) as ICompanyModel[]);
//         }).catch((err) => {
//             console.error(JSON.stringify(err))
//             setCompanies([] as ICompanyModel[]);
//         }).finally(() => {
//             setIsLoadingCompanies(false);
//         })
//     }, [])


//     return (
//         <FullPage heading="Autowire Companies" actions={<AddLink />} >
//             <Table state={{ isLoading: isLoadingCompanies, columnVisibility: { id: false } }} enableRowActions={true} columns={columns} data={companies}
//                 renderRowActions={({ row  }) => (
//                     <Box sx={{ display: 'flex', gap: '1rem' }}>
//                         <Tooltip title="Edit">
//                             <IconButton onClick={() => nav(`/companies/edit/${row.original.id}`)}>
//                                 <Edit />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 )}
//             />
//         </FullPage>
//     )
// }
