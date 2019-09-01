import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import ReactGA from 'react-ga'

import '../../node_modules/grommet-css'
import App from 'grommet/components/App'
import Box from 'grommet/components/Box'

import * as actions from '../actions'
import Header from '../containers/Header'
import Footer from '../containers/Footer'
import Status from './Status'
import See from './See'
import Upload from './Upload'

class _App extends Component {
  initGA () {
    ReactGA.initialize(process.env.GA_TRACKING_ID)
    // console.log('Initialized')
  }

  logPageView () {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
    // console.log(`Logged: ${window.location.pathname}`)
  }

  componentDidMount () {
    this.props.initIPFS()
    if (process.env.NODE_ENV === 'production') {
      if (!window.GA_INITIALIZED) {
        this.initGA()
        window.GA_INITIALIZED = true
      }
      this.logPageView()
    }
  }

  render() {
    return (
      <App>
        <div>
          <BrowserRouter>
            <div>
              <Box align='center' responsive={true} pad='large'>
                <Status ipfs={this.props.ipfs} {...this.props} />
                <Box align='center' responsive={true} pad='medium'>
                  <Header />
                </Box>
                <Route exact path='/upload' component={Upload} />
                <Route exact path='/see' component={See} />
              </Box>
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      </App>
    )
  }
}

function mapStateToProps(state) {
  return {
    ipfs: state.ipfs
  }
}

export default connect(mapStateToProps, actions)(_App)
