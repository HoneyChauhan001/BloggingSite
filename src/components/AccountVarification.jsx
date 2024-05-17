import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../appwrite/appWriteAuth';
import { Button } from './index';
import { useNavigate } from 'react-router-dom';

function AccountVerification() {
    //const { secret, userId } = useParams(); // Get secret and userId from URL params
    const [verificationStatus, setVerificationStatus] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const [error, setError] = useState(null)
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Perform verification when component mounts
    //     verifyAccount();
    // }, []);

    const verifyAccount = async () => {
        try {
            setError(null);
            setVerificationStatus('')
            console.log("varify account")
            await authService.updateVerification({ userId, secret });
            setVerificationStatus('success')
            navigate("/login")

        } catch (error) {
            console.error('Verification failed:', error);
            setVerificationStatus('Failed');
            setError(error)
        }
    };

    return (
        <div>
            <h1>Account Verification</h1>
            <p>Verifying account for User ID: {userId}</p>
            <p>Status: {verificationStatus}</p>
            <Button onClick={verifyAccount}>Verify Account</Button>
            {/* {error && <p>Error: {error}</p>} */}
        </div>
    );
}

export default AccountVerification;
