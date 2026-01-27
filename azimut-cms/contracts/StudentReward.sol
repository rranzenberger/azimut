// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title StudentReward
 * @dev Smart Contract para incentivar estudantes no Canadá
 * Quando contratam projeto, recebem retorno automático em crypto
 */
contract StudentReward {
    address public owner;
    address public companyWallet;
    address public nftContract; // Contrato NFT para mint automático
    
    // Taxa de retorno (em basis points, 100 = 1%)
    uint256 public rewardPercentage; // Ex: 500 = 5% de retorno
    
    // Mínimo de valor para ativar recompensa
    uint256 public minProjectValue;
    
    // Contador de NFTs mintados
    uint256 public nftCounter;
    
    // Estrutura de projeto
    struct Project {
        uint256 id;
        address student;
        uint256 value;
        uint256 rewardAmount;
        bool rewardPaid;
        uint256 timestamp;
        string description;
    }
    
    // Mapeamento de projetos
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public studentProjects;
    
    uint256 public projectCount;
    
    // Eventos
    event ProjectRegistered(
        uint256 indexed projectId,
        address indexed student,
        uint256 value,
        uint256 rewardAmount
    );
    
    event RewardPaid(
        uint256 indexed projectId,
        address indexed student,
        uint256 amount
    );
    
    event RewardPercentageUpdated(uint256 newPercentage);
    event MinProjectValueUpdated(uint256 newValue);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }
    
    /**
     * @dev Constructor
     * @param _companyWallet Endereço da carteira da empresa
     * @param _rewardPercentage Porcentagem de retorno (em basis points, ex: 500 = 5%)
     * @param _minProjectValue Valor mínimo do projeto para ativar recompensa
     * @param _nftContract Endereço do contrato NFT (opcional, pode ser address(0))
     */
    constructor(
        address _companyWallet,
        uint256 _rewardPercentage,
        uint256 _minProjectValue,
        address _nftContract
    ) validAddress(_companyWallet) {
        owner = msg.sender;
        companyWallet = _companyWallet;
        rewardPercentage = _rewardPercentage;
        minProjectValue = _minProjectValue;
        nftContract = _nftContract;
        nftCounter = 0;
    }
    
    /**
     * @dev Registrar novo projeto e pagar recompensa automaticamente
     * @param _student Endereço do estudante
     * @param _description Descrição do projeto
     */
    function registerProject(
        address _student,
        string memory _description
    ) external payable validAddress(_student) {
        require(msg.value >= minProjectValue, "Project value below minimum");
        require(msg.value > 0, "Value must be greater than 0");
        
        // Calcular recompensa
        uint256 rewardAmount = (msg.value * rewardPercentage) / 10000;
        
        // Criar projeto
        projectCount++;
        projects[projectCount] = Project({
            id: projectCount,
            student: _student,
            value: msg.value,
            rewardAmount: rewardAmount,
            rewardPaid: false,
            timestamp: block.timestamp,
            description: _description
        });
        
        // Adicionar à lista do estudante
        studentProjects[_student].push(projectCount);
        
        // Pagar recompensa automaticamente
        if (rewardAmount > 0) {
            (bool success, ) = _student.call{value: rewardAmount}("");
            require(success, "Reward payment failed");
            projects[projectCount].rewardPaid = true;
            
            emit RewardPaid(projectCount, _student, rewardAmount);
        }
        
        // Mint NFT automático para o estudante (se contrato NFT configurado)
        if (nftContract != address(0)) {
            _mintNFT(_student, projectCount);
        }
        
        // Transferir restante para carteira da empresa
        uint256 companyAmount = msg.value - rewardAmount;
        if (companyAmount > 0) {
            (bool success, ) = companyWallet.call{value: companyAmount}("");
            require(success, "Company payment failed");
        }
        
        emit ProjectRegistered(projectCount, _student, msg.value, rewardAmount);
    }
    
    /**
     * @dev Registrar projeto sem pagamento automático (para pagamentos externos)
     * @param _student Endereço do estudante
     * @param _value Valor do projeto
     * @param _description Descrição do projeto
     */
    function registerProjectExternal(
        address _student,
        uint256 _value,
        string memory _description
    ) external onlyOwner validAddress(_student) {
        require(_value >= minProjectValue, "Project value below minimum");
        
        // Calcular recompensa
        uint256 rewardAmount = (_value * rewardPercentage) / 10000;
        
        // Criar projeto
        projectCount++;
        projects[projectCount] = Project({
            id: projectCount,
            student: _student,
            value: _value,
            rewardAmount: rewardAmount,
            rewardPaid: false,
            timestamp: block.timestamp,
            description: _description
        });
        
        studentProjects[_student].push(projectCount);
        
        emit ProjectRegistered(projectCount, _student, _value, rewardAmount);
    }
    
    /**
     * @dev Pagar recompensa manualmente (para projetos registrados externamente)
     * @param _projectId ID do projeto
     */
    function payReward(uint256 _projectId) external onlyOwner {
        Project storage project = projects[_projectId];
        require(project.id > 0, "Project does not exist");
        require(!project.rewardPaid, "Reward already paid");
        require(address(this).balance >= project.rewardAmount, "Insufficient contract balance");
        
        (bool success, ) = project.student.call{value: project.rewardAmount}("");
        require(success, "Reward payment failed");
        
        project.rewardPaid = true;
        
        emit RewardPaid(_projectId, project.student, project.rewardAmount);
    }
    
    /**
     * @dev Atualizar porcentagem de recompensa
     * @param _newPercentage Nova porcentagem (em basis points)
     */
    function setRewardPercentage(uint256 _newPercentage) external onlyOwner {
        require(_newPercentage <= 10000, "Percentage cannot exceed 100%");
        rewardPercentage = _newPercentage;
        emit RewardPercentageUpdated(_newPercentage);
    }
    
    /**
     * @dev Atualizar valor mínimo do projeto
     * @param _newMinValue Novo valor mínimo
     */
    function setMinProjectValue(uint256 _newMinValue) external onlyOwner {
        minProjectValue = _newMinValue;
        emit MinProjectValueUpdated(_newMinValue);
    }
    
    /**
     * @dev Atualizar carteira da empresa
     * @param _newWallet Novo endereço
     */
    function setCompanyWallet(address _newWallet) external onlyOwner validAddress(_newWallet) {
        companyWallet = _newWallet;
    }
    
    /**
     * @dev Atualizar contrato NFT
     * @param _newNFTContract Novo endereço do contrato NFT
     */
    function setNFTContract(address _newNFTContract) external onlyOwner {
        nftContract = _newNFTContract;
    }
    
    /**
     * @dev Obter projetos de um estudante
     * @param _student Endereço do estudante
     * @return Array de IDs de projetos
     */
    function getStudentProjects(address _student) external view returns (uint256[] memory) {
        return studentProjects[_student];
    }
    
    /**
     * @dev Obter informações de um projeto
     * @param _projectId ID do projeto
     * @return Todas as informações do projeto
     */
    function getProject(uint256 _projectId) external view returns (
        uint256 id,
        address student,
        uint256 value,
        uint256 rewardAmount,
        bool rewardPaid,
        uint256 timestamp,
        string memory description
    ) {
        Project memory project = projects[_projectId];
        return (
            project.id,
            project.student,
            project.value,
            project.rewardAmount,
            project.rewardPaid,
            project.timestamp,
            project.description
        );
    }
    
    /**
     * @dev Obter saldo do contrato
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Retirar fundos (apenas owner)
     * @param _amount Quantidade a retirar
     * @param _to Endereço de destino
     */
    function withdraw(uint256 _amount, address _to) external onlyOwner validAddress(_to) {
        require(address(this).balance >= _amount, "Insufficient balance");
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Withdrawal failed");
    }
    
    // Permitir receber ETH
    receive() external payable {}
}
