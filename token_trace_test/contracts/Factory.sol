// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./Token.sol";

contract Factory {
    address _owner;

    event RawMaterial(address indexed tknAddr, uint256 indexed tknId, address rawAddr, uint256 rawTknId);

    constructor(){
        _owner = msg.sender;
    }

    function singleMint(address TknAddr, uint256 TknId, string memory ipfsHash) public {
        Token tknInstance = Token(TknAddr);
        tknInstance.FactoryMint(TknId, address(this), _owner, ipfsHash);
        emit RawMaterial(TknAddr, TknId, address(0), 0);
    }

    function MultiMint(uint256 N, address[] memory RawAddr, uint256[] memory RawTknId, address TknAddr, uint256 TknId, string memory ipfsHash) public {
        for (uint i = 0; i < N; i++){
            Token tknInstance = Token(RawAddr[i]);
            require(tknInstance.ownerOf(RawTknId[i]) == _owner);  
            emit RawMaterial(TknAddr, TknId, RawAddr[i], RawTknId[i]);
        }
        Token newTknInstance = Token(TknAddr);
        newTknInstance.FactoryMint(TknId, address(this), _owner, ipfsHash);

    }

    function getOwner() public view returns(address) {
        return _owner;
    }
}