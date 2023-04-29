import React, { Fragment } from 'react'
import Navbar from '../navbar/Navbar'


function MembershipPricing() {
  return (
    <Fragment>
    <Navbar/>
    <stripe-pricing-table
      pricing-table-id="prctbl_1N1XVUHb9PPilNEFS3YJaJlf"
      publishable-key="pk_test_51MrbuEHb9PPilNEFLOBXLab8FeRp1UTvmpQlYpchMfjYn56yyHtr36yBd5ze0T7iuXtrCF6bTvgpyGMhmU0vfPdI00owic9D25"
    //   client-reference-id="{{CLIENT_REFERENCE_ID}}"
    >
    </stripe-pricing-table>
    </Fragment>
  )
}

export default MembershipPricing
