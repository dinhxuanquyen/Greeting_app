// Configuration for Stacks Greeting App
export const CONFIG = {
    // Your wallet address
    WALLET_ADDRESS: "ST26VVBEQPNDC7DJ3Z1NA57GNYBQCMEX7C5C2DXYY",

    // Deployed contract information
    CONTRACT_ADDRESS: "ST26VVBEQPNDC7DJ3Z1NA57GNYBQCMEX7C5C2DXYY",
    CONTRACT_NAME: "greeting-app",

    // Network configuration
    NETWORK: "testnet" as const,

    // App configuration
    APP_NAME: "Greeting App",
    APP_DESCRIPTION: "Send simple greetings to friends and family",

    // Links
    EXPLORER_URL: "https://explorer.stacks.co/sandbox",
    FAUCET_URL: "https://explorer.stacks.co/sandbox/faucet",
    LEATHER_URL: "https://leather.io",

    // Messages
    MESSAGES: {
        WELCOME: "Welcome to Greeting App!",
        CONNECT_WALLET: "Connect wallet to send greetings",
        NO_DATA: "No greetings yet.",
        SENDING: "Sending greeting...",
        SUCCESS: "Greeting sent successfully!",
        ERROR: "Error sending greeting. Please try again.",
        LOADING: "Loading...",
    }
};

// Helper function to get full contract address
export const getContractAddress = () => {
    return `${CONFIG.CONTRACT_ADDRESS}.${CONFIG.CONTRACT_NAME}`;
};

// Helper function to validate wallet address
export const isValidStacksAddress = (address: string) => {
    return address.startsWith('ST') && address.length === 41;
}; 