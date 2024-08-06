import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
// Soft UI Dashboard PRO React components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React example components
import SalesTableCell from "examples/Tables/SalesTable/SalesTableCell";
import CustomerSalesTable from "./CustomerSalesTable";

function CustomerIndex ({ title, rows, }){
    const Header = [{proejcet_nr:"Project NR"},{employee:"Employee"},{start_date:"Start Date"},{end_date:"End Date"}]
  const renderTableCells = rows.map((row, key) => {
    const tableRows = [];
    const rowKey = `row-${key}`;

    Object.entries(row).map(([cellTitle, cellContent]) =>
      Array.isArray(cellContent)
        ? tableRows.push(
            <CustomerSalesTable
              key={cellContent[1]}
              title={cellTitle}
              content={cellContent[1]}
              noBorder={key === rows.length - 1}
            />
          )
        : tableRows.push(
            <CustomerSalesTable
              key={cellContent}
              title={cellTitle}
              content={cellContent}
              fileName={cellContent}
              noBorder={key === rows.length - 1}
            />
          )
    );

    return<TableRow key={rowKey}>{tableRows} </TableRow> ;
  });

  return (
  
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableHead>
          <SoftBox component="tr" width="max-content" display="block" mb={1.5}>
            <SoftTypography fontWeight="bold" variant="h5" component="td">
              {title}
            </SoftTypography>
          </SoftBox>
        </TableHead>
        <TableBody>{useMemo(() => renderTableCells, [rows])}</TableBody>
      </Table>
    </TableContainer>
  );
}

// Setting default values for the props of SalesTable
CustomerIndex.defaultProps = {
  rows: [{}],
};

// Typechecking props for the SalesTable
CustomerIndex.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default CustomerIndex