 const sha256 = require('sha256');
const currentNodeUrl = process.argv[3]

 function Blockchain(){
 	this.chain  = [];
 	this.pendingTransactions = [];

 	//to generate genesis block

	//genesis block :first block

	this.currentNodeUrl = currentNodeUrl;

	this.networkNodes = []
 	this.createNewBlock(100,'0','0');
 }



 //method
 Blockchain.prototype.createNewBlock = function(nonce,previousBlockHash,hash){
 		//block object
 		const newBlock = {
 			index: this.chain.length+1,
 			timestamp: Date.now(),
 			transactions: this.pendingTransactions,
 			nonce: nonce,
 			hash: hash,
 			previousBlockHash: previousBlockHash
 		};

 		this.pendingTransactions = [];
 		this.chain.push(newBlock);

 		return newBlock;
 }



Blockchain.prototype.getLastBlock = function(){
	return this.chain[this.chain.length-1];
}


Blockchain.prototype.createNewTransaction = function(amount,sender,recipient){
	
	//transaction object
	const newTransaction = {
		amount : amount,
		sender : sender,
		recipient : recipient
	};

	this.pendingTransactions.push(newTransaction);
	return this.getLastBlock()['index'] + 1;
}


Blockchain.prototype.hashBlock = function(previousBlockHash,currentBlockData,nonce){
	//return hash string

	//USING SHA256 to hash block

	//currentBlockData may be jason array or object
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);

	const hash = sha256(dataAsString);

	return hash;
}


//proof of work 
Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
	//let can change,const cannot change
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);

	while(hash.substring(0,4) !== '0000'){
		nonce++;
		hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
	}

	return nonce;

}




module.exports = Blockchain
