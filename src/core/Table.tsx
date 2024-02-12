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
            emptyRowsWhenPaging: true,
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