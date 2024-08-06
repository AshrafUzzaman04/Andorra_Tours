/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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
import { useTranslation } from 'react-i18next';

function SalesTable({ title, rows }) {
  const { t } = useTranslation();
  const Header = [{proejcet_nr: t('Project')},{employee: t('Employee')},{start_date: t('Start Date')},{end_date: t('End Date')}]
  const renderTableCells = rows.map((row, key) => {

    const tableRows = [];
    const rowKey = `row-${key}`;

    Object.entries(row).map(([cellTitle, cellContent]) =>
      Array.isArray(cellContent)
        ? tableRows.push(
            <SalesTableCell
              key={cellContent[1]}
              title={t(cellTitle)}
              content={cellContent[1]}
              noBorder={key === rows.length - 1}
            />
          )
        : tableRows.push(
            <SalesTableCell
              key={cellContent}
              title={t(cellTitle)}
              content={cellContent}
              item={cellContent}
              noBorder={key === rows.length - 1}
            />
            
          )
    );

    return <TableRow key={rowKey}>{tableRows}</TableRow>;
  });
  
  return (
  
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableHead>
          <SoftBox component="tr" width="max-content" display="block" mb={1.5}>
            <SoftTypography variant="h6" component="td">
              {t(title)}
            </SoftTypography>
          </SoftBox>
        </TableHead>
        <TableBody>{useMemo(() => renderTableCells, [rows])}</TableBody>
      </Table>
    </TableContainer>
  );
}

// Setting default values for the props of SalesTable
SalesTable.defaultProps = {
  rows: [{}],
};

// Typechecking props for the SalesTable
SalesTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default SalesTable;
