export default (state = [], action) => {
  switch (action.type) {
    case 'INIT_IPFS':
      return action.payload
    default:
      return state
  }
}
