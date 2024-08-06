import PropTypes from "prop-types";

// @mui material components
import TableCell from "@mui/material/TableCell";
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
// Soft UI Dashboard PRO React components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { useState } from "react";
import { IoDocumentText } from "react-icons/io5";
function CustomerSalesTable ({ title,content,fileName, noBorder, ...rest }){
  const [isShow,setIsShow] = useState(false) 
  let template;
  template = (
    
    <>
    <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography
          variant="caption"
          color="text"
          fontWeight="bold"
          textTransform="capitalize"
          align="right"
          style={{ cursor:"pointer" }}
          onClick={()=>setIsShow(!isShow)}
        >
          {title}: 
          
        </SoftTypography>
        <SoftTypography style={{ fontSize:"14px" }} align="right" variant="button" fontWeight="bold" textTransform="capitalize">
          {content}
        </SoftTypography>
        <SoftTypography display={isShow ? 'block':'none'} mt={2} align="right" variant="button" fontWeight="medium" textTransform="capitalize">
            {/* <TextSnippetRoundedIcon style={{ width:"20%",height:"80%", cursor:"pointer", color:"#A5C212" }} /> */}
            <IoDocumentText style={{ cursor:"pointer" }} size="2.8rem" color="#A5C212" />
        <SoftTypography
          variant="caption"
          color="text"
          fontWeight="medium"
          textTransform="capitalize"
          display="block"
        > 
        {/* IoDocumentTextOutline */}
          {fileName}
        </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </TableCell>
    
    </>
  );

  return template;
}

// Setting default values for the props of SalesTableCell
CustomerSalesTable.defaultProps = {
  image: "",
  noBorder: false,
};

// Typechecking props for the SalesTableCell
CustomerSalesTable.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool,
};
export default CustomerSalesTable