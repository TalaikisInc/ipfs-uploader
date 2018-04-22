import React from 'react'
import { connect } from 'react-redux'

const Status = (props) => {
  return (
    <div>
      { !props.ipfs
        ? <div>
          <strong>Warning!</strong> IPFS isn't initiated by some reason.
        </div>
        : null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ipfs: state.ipfs
  }
}

export default connect(mapStateToProps)(Status)
