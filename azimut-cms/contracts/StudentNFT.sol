// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title StudentNFT
 * @dev NFT exclusivo para estudantes que contratam projetos
 * Versão simplificada - ERC-721 básico
 * 
 * NOTA: Para produção, use OpenZeppelin:
 * npm install @openzeppelin/contracts
 * import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 */

interface IERC721 {
    function safeMint(address to, uint256 tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
    function balanceOf(address owner) external view returns (uint256);
}

/**
 * @dev Versão simplificada do StudentNFT
 * Para deploy rápido, use este contrato básico
 * Para produção completa, use versão com OpenZeppelin
 */
contract StudentNFT {
    address public owner;
    address public studentRewardContract;
    
    string public name;
    string public symbol;
    string private baseURI;
    
    uint256 private _tokenCounter;
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => uint256) public projectToToken;
    mapping(uint256 => string) public tokenMetadata;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event NFTMinted(uint256 indexed tokenId, address indexed to, uint256 indexed projectId, string metadata);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || msg.sender == studentRewardContract,
            "Not authorized"
        );
        _;
    }
    
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        baseURI = _baseURI;
        _tokenCounter = 0;
    }
    
    function safeMint(
        address _to,
        uint256 _projectId,
        string memory _metadata
    ) external onlyAuthorized returns (uint256) {
        require(_to != address(0), "Cannot mint to zero address");
        
        _tokenCounter++;
        uint256 newTokenId = _tokenCounter;
        
        _owners[newTokenId] = _to;
        _balances[_to]++;
        
        projectToToken[_projectId] = newTokenId;
        tokenMetadata[newTokenId] = _metadata;
        _tokenURIs[newTokenId] = string(abi.encodePacked(baseURI, _projectId));
        
        emit Transfer(address(0), _to, newTokenId);
        emit NFTMinted(newTokenId, _to, _projectId, _metadata);
        
        return newTokenId;
    }
    
    function safeMint(address _to, uint256 _tokenId) external onlyAuthorized {
        require(_to != address(0), "Cannot mint to zero address");
        require(_owners[_tokenId] == address(0), "Token already exists");
        
        _owners[_tokenId] = _to;
        _balances[_to]++;
        _tokenURIs[_tokenId] = string(abi.encodePacked(baseURI, _tokenId));
        
        emit Transfer(address(0), _to, _tokenId);
        emit NFTMinted(_tokenId, _to, 0, "");
    }
    
    function setStudentRewardContract(address _contract) external onlyOwner {
        studentRewardContract = _contract;
    }
    
    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }
    
    function totalSupply() external view returns (uint256) {
        return _tokenCounter;
    }
    
    function getNFTByProject(uint256 _projectId) external view returns (uint256) {
        return projectToToken[_projectId];
    }
    
    function getTokenMetadata(uint256 _tokenId) external view returns (string memory) {
        return tokenMetadata[_tokenId];
    }
    
    function ownerOf(uint256 tokenId) external view returns (address) {
        address owner_addr = _owners[tokenId];
        require(owner_addr != address(0), "Token does not exist");
        return owner_addr;
    }
    
    function balanceOf(address owner_addr) external view returns (uint256) {
        require(owner_addr != address(0), "Zero address");
        return _balances[owner_addr];
    }
    
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
}
