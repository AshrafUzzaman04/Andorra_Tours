import React from 'react'
import PaidIcon from '@mui/icons-material/Paid';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PublicIcon from '@mui/icons-material/Public';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card } from '@mui/material';
import { AccountBalanceWallet, DescriptionRounded, Language, ShoppingCart } from '@mui/icons-material';
const SummaryCard = ({title,count,icon}) => {
  return (
    <>
    <Card >
                  <SoftBox backgroundColor="#fff" variant="gradient">
                    <SoftBox display="flex" p={1.8}>
                      
                      <div>
                      <SoftTypography
                        variant="button"
                        backgroundColor="#fff"
                        opacity={.7}
                        textTransform="capitalize"
                        fontWeight="bold"
                      >
                        {title ? title:""}
                      </SoftTypography>
                      <SoftTypography
                        variant="h5"
                        fontWeight="bold"
                        color="dark"
                      >
                        {count ? count:"00"}
                      </SoftTypography>
                      </div>

              
                      {/* backgroundImage="linear-gradient(310deg, #a5c212 0%, #1d1d1b 100%)" */}
                      <SoftBox
                          style={{ backgroundImage:"linear-gradient(310deg, #a5c212 0%, #1d1d1b 100%)" }}
                          color="white"
                          width="3rem"
                          height="3rem"
                          marginRight="auto"
                          borderRadius="md"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          shadow="md"
                        >
                          {icon === "wallet" ? <AccountBalanceWallet/>:icon === "description" ? <DescriptionRounded/>:icon === "language_icon" ? <Language/>:icon === "shopping_cart" ? <ShoppingCart/>:''}
                        </SoftBox>
                    </SoftBox>
                    
                  </SoftBox>
        </Card>
    </>
  )
}

export default SummaryCard