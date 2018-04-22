import IPFS from 'ipfs-mini'

export function initIPFS(payload) {
  const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  })

  return {
    type: 'INIT_IPFS',
    payload: ipfs
  }
}
