const Blockchain = require('./blockchain');
const veroin = new Blockchain();

// define a sample random previous block
const previousBlockHash = '2068463A56754328757FCBA89975369';
// CREATE a new block for a current blck representation
const currentBlockData = [
  {
    amount: 10,
    sender: 'WH3GE9JFFJJVE46GSRF4C',
    recipient: 'HHDY6TEGTY65DBE5EGY'
  },
  {
    amount: 100,
    sender: 'WH3KCCXRT5MJE468C4C',
    recipient: '75FD5Y5EZTEGTY65DBE5EGY'
  },
  {
    amount: 210,
    sender: 'WEHE5UDE56ESGD5HCFJJVE468C4C',
    recipient: 'HN77N7BT5D533SEGTY65DBE5EGY'
  }
];
const nonce = 100;
console.log(veroin.proofOfWork(previousBlockHash,currentBlockData))

