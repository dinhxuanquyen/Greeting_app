import { openContractCall } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";
import {
    callReadOnlyFunction,
    contractPrincipalCV,
    standardPrincipalCV,
    stringUtf8CV
} from "@stacks/transactions";
import { useEffect, useState } from 'react';
import './App.css';
import { CONFIG } from './config';

interface Greeting {
    id: number;
    sender: string;
    receiver: string;
    message: string;
    timestamp: number;
    read: boolean;
}

// Helper function to create principal CV
const createPrincipalCV = (address: string) => {
    if (address.includes('.')) {
        const [contractAddress, contractName] = address.split('.');
        return contractPrincipalCV(contractAddress, contractName);
    } else {
        return standardPrincipalCV(address);
    }
};

function App() {
    const [connected, setConnected] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const [greetings, setGreetings] = useState<Greeting[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    // Connect wallet
    const connectWallet = async () => {
        try {
            setLoading(true);
            setStatusMessage('');

            const result = await openContractCall({
                network: new StacksTestnet(),
                appDetails: {
                    name: CONFIG.APP_NAME,
                    icon: "https://example.com/icon.png",
                },
                contractAddress: CONFIG.CONTRACT_ADDRESS,
                contractName: CONFIG.CONTRACT_NAME,
                functionName: "send-greeting",
                functionArgs: [
                    createPrincipalCV(CONFIG.WALLET_ADDRESS),
                    stringUtf8CV("test")
                ],
                onFinish: (data) => {
                    console.log("Connected:", data);
                    setConnected(true);
                    setUserAddress(CONFIG.WALLET_ADDRESS);
                    setLoading(false);
                    setStatusMessage('Wallet connected successfully!');
                    loadGreetings();
                },
                onCancel: () => {
                    console.log("Connection cancelled");
                    setLoading(false);
                    setStatusMessage('Connection cancelled');
                },
            });
        } catch (error) {
            console.error("Connection error:", error);
            setLoading(false);
            setStatusMessage('Wallet connection error');
        }
    };

    // Register email
    const registerEmail = async () => {
        if (!userEmail) return;

        try {
            setLoading(true);
            await openContractCall({
                network: new StacksTestnet(),
                appDetails: {
                    name: CONFIG.APP_NAME,
                    icon: "https://example.com/icon.png",
                },
                contractAddress: CONFIG.CONTRACT_ADDRESS,
                contractName: CONFIG.CONTRACT_NAME,
                functionName: "register-email",
                functionArgs: [stringUtf8CV(userEmail)],
                onFinish: (data) => {
                    console.log("Email registered:", data);
                    setShowEmailForm(false);
                    setLoading(false);
                    setStatusMessage('Email registered successfully!');
                },
            });
        } catch (error) {
            console.error("Email registration error:", error);
            setLoading(false);
            setStatusMessage('Email registration error');
        }
    };

    // Send greeting
    const sendGreeting = async () => {
        if (!newMessage || !receiverAddress) {
            setStatusMessage('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            setStatusMessage('Sending greeting...');

            await openContractCall({
                network: new StacksTestnet(),
                appDetails: {
                    name: CONFIG.APP_NAME,
                    icon: "https://example.com/icon.png",
                },
                contractAddress: CONFIG.CONTRACT_ADDRESS,
                contractName: CONFIG.CONTRACT_NAME,
                functionName: "send-greeting",
                functionArgs: [
                    createPrincipalCV(receiverAddress),
                    stringUtf8CV(newMessage)
                ],
                onFinish: (data) => {
                    console.log("Greeting sent:", data);
                    setNewMessage('');
                    setReceiverAddress('');
                    setLoading(false);
                    setStatusMessage('Greeting sent successfully!');
                    loadGreetings();
                },
                onCancel: () => {
                    console.log("Send greeting cancelled");
                    setLoading(false);
                    setStatusMessage('Send greeting cancelled');
                },
            });
        } catch (error) {
            console.error("Send greeting error:", error);
            setLoading(false);
            setStatusMessage('Error sending greeting');
        }
    };

    // Load greetings
    const loadGreetings = async () => {
        if (!userAddress) return;

        try {
            const result = await callReadOnlyFunction({
                network: new StacksTestnet(),
                contractAddress: CONFIG.CONTRACT_ADDRESS,
                contractName: CONFIG.CONTRACT_NAME,
                functionName: "get-user-greetings",
                functionArgs: [createPrincipalCV(userAddress)],
                senderAddress: userAddress,
            });

            console.log("Greetings loaded:", result);
            if (result && Array.isArray(result)) {
                const parsedGreetings = result.map((greeting: any, index: number) => ({
                    id: index + 1,
                    sender: greeting.sender,
                    receiver: greeting.receiver,
                    message: greeting.message,
                    timestamp: greeting.timestamp,
                    read: greeting.read
                }));
                setGreetings(parsedGreetings);
            }
        } catch (error) {
            console.error("Load greetings error:", error);
            setStatusMessage('Error loading greetings');
        }
    };

    // Auto-load greetings when connected
    useEffect(() => {
        if (connected && userAddress) {
            loadGreetings();
        }
    }, [connected, userAddress]);

    // Clear status message after 3 seconds
    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => {
                setStatusMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    return (
        <div className="app">
            {/* Floating particles */}
            <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>

            <div className="counter-container">
                <div className="counter-header">
                    <h1>💌 {CONFIG.APP_NAME}</h1>
                    <p>{CONFIG.APP_DESCRIPTION}</p>
                </div>

                {!connected ? (
                    <div>
                        <div className="counter-display">
                            <div className="counter-value">💌</div>
                            <div className="counter-label">Send Greetings</div>
                        </div>

                        <div className="button-container">
                            <button
                                onClick={connectWallet}
                                className="btn connect-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading"></span>
                                        Connecting...
                                    </>
                                ) : (
                                    '🔗 Connect Wallet'
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="user-info">
                            <div className="user-address">
                                {userAddress.slice(0, 10)}...{userAddress.slice(-8)}
                            </div>
                            <p>Wallet connected successfully!</p>
                            {!showEmailForm && (
                                <button
                                    onClick={() => setShowEmailForm(true)}
                                    className="btn connect-btn"
                                    style={{ marginTop: '10px' }}
                                >
                                    📧 Register Email
                                </button>
                            )}
                        </div>

                        {showEmailForm && (
                            <div className="user-info">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                                <div className="button-container">
                                    <button
                                        onClick={registerEmail}
                                        disabled={loading}
                                        className="btn increment-btn"
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                    <button
                                        onClick={() => setShowEmailForm(false)}
                                        className="btn connect-btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="counter-display">
                            <div className="counter-value">{greetings.length}</div>
                            <div className="counter-label">Greetings Sent</div>
                        </div>

                        <div className="user-info">
                            <input
                                type="text"
                                placeholder="Receiver address (ST...)"
                                value={receiverAddress}
                                onChange={(e) => setReceiverAddress(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd'
                                }}
                            />
                            <textarea
                                placeholder="Write your greeting message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    resize: 'vertical'
                                }}
                            />
                            <div className="button-container">
                                <button
                                    onClick={sendGreeting}
                                    className="btn increment-btn"
                                    disabled={loading || !newMessage || !receiverAddress}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        '💌 Send Greeting'
                                    )}
                                </button>

                                <button
                                    onClick={loadGreetings}
                                    className="btn connect-btn"
                                    disabled={loading}
                                >
                                    🔄 Refresh
                                </button>
                            </div>
                        </div>

                        {/* Display greetings */}
                        {greetings.length > 0 && (
                            <div className="user-info">
                                <h3 style={{ marginBottom: '15px' }}>📝 Sent Greetings:</h3>
                                {greetings.map((greeting, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            background: 'rgba(255,255,255,0.8)',
                                            padding: '15px',
                                            marginBottom: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd'
                                        }}
                                    >
                                        <p><strong>To:</strong> {greeting.receiver.slice(0, 10)}...</p>
                                        <p><strong>Message:</strong> {greeting.message}</p>
                                        <p><strong>Time:</strong> {new Date(greeting.timestamp * 1000).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {statusMessage && (
                    <div className={`status-message ${statusMessage.includes('successfully') ? 'status-success' :
                            statusMessage.includes('Error') ? 'status-error' : 'status-info'
                        }`}>
                        {statusMessage}
                    </div>
                )}

                <div className="instructions">
                    <p>💡 <strong>Instructions:</strong></p>
                    <ul>
                        <li>1. Connect your Leather Wallet</li>
                        <li>2. Register your email for notifications</li>
                        <li>3. Enter receiver address and greeting message</li>
                        <li>4. Send greeting and view results</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;