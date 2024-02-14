
import { useTheme } from "@mui/material";
import { MaterialReactTable, MaterialReactTableProps } from "material-react-table";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowData = any;


export const TableV2 = function Table(props: MaterialReactTableProps<RowData>) {


    const theme = useTheme();


    const defaultProps: Partial<MaterialReactTableProps<RowData>> = {
        enableGlobalFilter: true,
        enableFullScreenToggle: false,
        enableFilters: true,
        enableDensityToggle: false,
        enableGlobalFilterModes: true,
        state: {
            density: 'compact',
            // showGlobalFilter: true
        },
        positionActionsColumn: 'last',
        enableStickyHeader: true,
        layoutMode: "grid",

        muiTopToolbarProps: {
            sx: {
                 background : theme.palette.primary.main
            }
        },


        muiSearchTextFieldProps: {
            variant: "outlined",
            InputProps: {
                style: {  backgroundColor: "white"}
            },
            sx: {
                minWidth: '1rem',                
            }
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '0',
            },
        },
        muiTableBodyProps: {
            sx: {
                //stripe the rows, make odd rows a darker color
                '& tr:nth-of-type(odd) > td': {
                    backgroundColor: '#f5f5f5',
                },
            },
        },
    };


    const { ...tableProps } = { ...defaultProps, ...props };       // Shallow merge props
    tableProps.state = { ...defaultProps.state, ...props.state };                                // Merge options


    return (<MaterialReactTable  {...tableProps as MaterialReactTableProps<RowData>} />);


}


export default TableV2;
