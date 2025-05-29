// Contract ABIs
export const creditsABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {"internalType": "address","name": "spender","type": "address"},
            {"internalType": "uint256","name": "allowance","type": "uint256"},
            {"internalType": "uint256","name": "needed","type": "uint256"}
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "sender","type": "address"},
            {"internalType": "uint256","name": "balance","type": "uint256"},
            {"internalType": "uint256","name": "needed","type": "uint256"}
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "approver","type": "address"}
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "receiver","type": "address"}
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "sender","type": "address"}
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "spender","type": "address"}
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "owner","type": "address"}
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "account","type": "address"}
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true,"internalType": "address","name": "owner","type": "address"},
            {"indexed": true,"internalType": "address","name": "spender","type": "address"},
            {"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},
            {"indexed": true,"internalType": "address","name": "newOwner","type": "address"}
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true,"internalType": "address","name": "from","type": "address"},
            {"indexed": true,"internalType": "address","name": "to","type": "address"},
            {"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MAX_SUPPLY",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "owner","type": "address"},
            {"internalType": "address","name": "spender","type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "spender","type": "address"},
            {"internalType": "uint256","name": "value","type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool","name": "","type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "account","type": "address"}
        ],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8","name": "","type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "to","type": "address"},
            {"internalType": "uint256","name": "amount","type": "uint256"}
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string","name": "","type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address","name": "","type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string","name": "","type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "to","type": "address"},
            {"internalType": "uint256","name": "value","type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"internalType": "bool","name": "","type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "from","type": "address"},
            {"internalType": "address","name": "to","type": "address"},
            {"internalType": "uint256","name": "value","type": "uint256"}
        ],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool","name": "","type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "newOwner","type": "address"}
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;

export const donationABI = [
    {
        "inputs": [
            {"internalType": "address","name": "creditAddress","type": "address"}
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {"internalType": "address","name": "owner","type": "address"}
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {"internalType": "address","name": "account","type": "address"}
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},
            {"indexed": true,"internalType": "address","name": "newOwner","type": "address"}
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true,"internalType": "address","name": "donor","type": "address"},
            {"indexed": true,"internalType": "string","name": "theCase","type": "string"},
            {"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "CREDITS_PER_ETH",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "credit",
        "outputs": [{"internalType": "contract Credits","name": "","type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256","name": "","type": "uint256"}
        ],
        "name": "donations",
        "outputs": [
            {"internalType": "address","name": "donor","type": "address"},
            {"internalType": "string","name": "theCase","type": "string"},
            {"internalType": "string","name": "message","type": "string"},
            {"internalType": "uint256","name": "amount","type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "user","type": "address"},
            {"internalType": "string","name": "_theCase","type": "string"}
        ],
        "name": "hasVotedFor",
        "outputs": [{"internalType": "bool","name": "","type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address","name": "","type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "showDonors",
        "outputs": [
            {
                "components": [
                    {"internalType": "address","name": "donor","type": "address"},
                    {"internalType": "string","name": "theCase","type": "string"},
                    {"internalType": "string","name": "message","type": "string"},
                    {"internalType": "uint256","name": "amount","type": "uint256"}
                ],
                "internalType": "struct Donation.DonationRecord[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "newOwner","type": "address"}
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "string","name": "theCase","type": "string"},
            {"internalType": "string","name": "message","type": "string"}
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votedCount",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;

// Contract addresses

// For Sepolia
// export const CREDITS_CONTRACT_ADDRESS = "0xBd10ca59C36374d9FFAb2d9EF1F1644581cA2681" as `0x${string}`;
// export const DONATION_CONTRACT_ADDRESS = "0x9D448Ea5a508F0879FC81d697d5c59dABBb9e416" as `0x${string}`;

// For scrollSepolia
export const CREDITS_CONTRACT_ADDRESS = "0x7a59fc37597f911bae74270ae21d1de0a3942e00" as `0x${string}`;
export const DONATION_CONTRACT_ADDRESS = "0x2c787f2e028e07731593137d422acdc038b7ccc2" as `0x${string}`;

// Types
export interface DonationRecord {
    donor: `0x${string}`;
    theCase: string;
    message: string;
    amount: bigint;
}
