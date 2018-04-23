import React, { Component } from 'react'
import { connect } from 'react-redux'

import Toast from 'grommet/components/Toast'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'
import Form from 'grommet/components/Form'
import Button from 'grommet/components/Button'
import TextInput from 'grommet/components/TextInput'
import Image from 'grommet/components/Image'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      success: '',
      failure: '',
      modalOpen: false,
      hash: '',
      data: '',
      loading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const value = event.target.value ? event.target.value : ''
    
    this.setState({
      [event.target.name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({
      loading: true
    })

    if (this.state.hash !== '') {
      this.props.ipfs.catJSON(this.state.hash, async (err, data) => {
        if(err) {
          // console.log(err)
          this.setState({
            modalOpen: true,
            failure: `Error occured: ${err.message}`
          })
        } else {
          this.setState({
            data: data
          })
        }
      })
    } else {
      this.setState({
        modalOpen: true,
        failure: `You need to enter IPFS hash.`
      })
    }

    this.setState({
      loading: false
    })
  }

  render() {
    return (
      <Box>
        <Box align="center">
          <Heading align="center">Load data from IPFS</Heading>
          <Form onSubmit={this.handleSubmit}>
            <Box pad='small' align='center'>
              <Label labelFor="hash">Enter IPFS hash:</Label>
            </Box>
            <Box pad='small' align='center'>
              <TextInput id='hash'
                type='text'
                name='hash'
                onDOMChange={this.handleChange}
                value={this.state.hash}
                placeHolder='E.g. QmfWyGyMYHqqzEFUmfoUJyPQ6EzGnoB18v9CNbPjczXGgH' />
            </Box>
            <Box pad='small' align='center'>
              { this.state.loading ? 'Loading...' : <Button primary={true} type='submit' label='Get it' /> }
            </Box>
            <Box pad='small' align='center'>
              <Label align="cenyer">{ this.state.hash ? `Hash: ${this.state.hash}` : '' }</Label>
            </Box>
          </Form>
          { this.state.data ? <Image src={this.state.data} size='large' align="center" />
            : ''
          }
          <Box align="center">
            <Label align="center">
              If you want to add this image as your image source, use this url:
            </Label>
            <pre>
              https://ipfs.infura.io:5001/api/v0/cat/{this.state.hash}
            </pre>
          </Box>
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

export default connect(mapStateToProps)(Home)
