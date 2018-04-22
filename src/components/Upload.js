import React, { Component } from 'react'
import { connect } from 'react-redux'

import Toast from 'grommet/components/Toast'
import Heading from 'grommet/components/Heading'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Label  from 'grommet/components/Label'
import Form  from 'grommet/components/Form'

class Put extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hash: '',
      success: '',
      failure: '',
      modalOpen: false,
      document: '',
      loading: false
    }

    this.handleUploadFile = this.handleUploadFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUploadFile(event) {
    const data = event.target.files[0]
    const name = event.target.name
    if (data.type.match('image/*')) {
      const reader = new FileReader()
      reader.onload = (function(theFile) {
        return function(e) {
          this.setState({
            [name]: e.target.result
          })
        }.bind(this)
    }.bind(this))(data)
    reader.readAsDataURL(data)
    } else {
      this.setState({
        modalOpen: true,
        failure: `We can accept only image files.`
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({
      loading: true
    })

    if (this.state.document !== '') {
      this.props.ipfs.addJSON(this.state.document, async (err, _hash) => {
        if (err) {
          this.setState({
            failure: `Error occured: ${err.message}`
          })
        } else {
          this.setState({
            modalOpen: true,
            hash: _hash,
            success: `Success! Your hash: ${_hash}`
          })
        }
      })
    } else {
      this.setState({
        modalOpen: true,
        failure: `You need an image.`
      })
    }
  }

  render() {
    return (
      <Box align="center">
        <Heading align="center">Upload image to Interplanetary File System (IPFS)</Heading>
        <Box align='center'>
          <Form onSubmit={this.handleSubmit}>
            <Box pad='small' align='center'>
              <Label>Please attach your image:</Label>
              <input id='file' name='document' type='file' onChange={this.handleUploadFile} />
            </Box>
            <Box pad='small' align='center'>
              { this.state.loading ? 'Loading...' : <Button primary={true} type='submit' label='Upload' /> }
            </Box>
          </Form>
          { this.state.hash !== '' ? `Note your hash: ${this.state.hash}` : '' }
        </Box>
          { this.state.modalOpen && <Toast
            status={this.state.success ? 'ok' : 'critical' }>
              <p>{ this.state.success ? this.state.success : null }</p>
              <p>{ this.state.failure ? this.state.failure : null }</p>
            </Toast>
          }
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    ipfs: state.ipfs
  }
}

export default connect(mapStateToProps)(Put)
