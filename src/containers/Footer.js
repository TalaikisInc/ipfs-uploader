import React from 'react';
import { connect } from 'react-redux'

import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'

const Footer = () => (
  <Box align='center'>
    <Paragraph>&copy; 2018, <a href="https://talaikis.com/">Talaikis Ltd.</a></Paragraph>
  </Box>
)

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(Footer)
