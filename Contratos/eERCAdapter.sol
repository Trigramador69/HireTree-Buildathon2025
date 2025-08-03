// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CVNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract eERCAdapter is Ownable {
    CVNFT public cvnft;

    address public empresa;

    event NFTMinted(address indexed candidato, address indexed evaluador, string uri);

    constructor(address _cvnft, address _empresa) Ownable(msg.sender) {
        cvnft = CVNFT(_cvnft);
        empresa = _empresa;
    }

    modifier onlyEmpresa() {
        require(msg.sender == empresa, "Solo la empresa puede mintear");
        _;
    }

    function mintCV(address candidato, string memory metadataURI) external onlyEmpresa {
        cvnft.mint(candidato, metadataURI);
        emit NFTMinted(candidato, msg.sender, metadataURI);
    }
}
