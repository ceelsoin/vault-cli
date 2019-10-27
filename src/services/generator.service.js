var SHA256 = require("crypto-js/sha256");

function generateRandomHash(){
 const salt = Math.random() * (391787479173912739821 - 1323798123921793871292) - 419783473897498279832;
 const prefix = Math.random() * (456786976543245687980 - 43567879809786543124267) - 3426789087876543256;
 const date_time = Date.now();

 const hash = SHA256(`${salt}.${prefix}.${date_time}.vault`);
//  console.log(hash.toString())
 return hash.toString();
}

module.exports = {
    generateRandomHash
}