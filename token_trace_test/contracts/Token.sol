// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Token {
    string private _name;

    //TokenId to owner mapping
    mapping (uint => address) private _owners;

    event Transfer(uint256 indexed TokenId, address from, address to);
    event MadeIn(uint indexed TokenID, address factoryAddress);

    constructor(string memory name){
        _name = name;
    }

    function FactoryMint(uint256 TokenId, address factoryAddress, address _owner) public {
        emit MadeIn(TokenId, factoryAddress);
        require(_owners[TokenId] == address(0));
        _owners[TokenId] = _owner;
        emit Transfer(TokenId, address(0), _owner);
    }

    function Mint(uint256 TokenId) public {
        require(_owners[TokenId] == address(0));
        _owners[TokenId] = msg.sender;
        emit Transfer(TokenId, address(0), msg.sender);
    }

    function TransferTo(uint256 TokenId, address to) public {
        require(_owners[TokenId] == msg.sender);
        require(to != address(0));

        _owners[TokenId] = to;
        emit Transfer(TokenId, msg.sender, to);
    }

    function Name() public view returns(string memory) {
        return _name;
    }

    function ownerOf(uint256 TknId) public view returns(address){
        return _owners[TknId];
    }
}