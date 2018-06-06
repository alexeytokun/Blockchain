// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var Presale = artifacts.require('./Presale.sol')
var Coin= artifacts.require('Coin')

module.exports = function (deployer) {
  // deployer.deploy(ConvertLib)
  deployer.deploy(Coin)
}
