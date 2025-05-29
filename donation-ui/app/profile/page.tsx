"use client";

import React from "react";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { creditsABI, CREDITS_CONTRACT_ADDRESS, donationABI, DONATION_CONTRACT_ADDRESS } from "@/lib/contracts";

export default function Profile() {
    const { address, isConnected } = useAccount();

    const { data: credBalance } = useReadContract({
        address: CREDITS_CONTRACT_ADDRESS,
        abi: creditsABI,
        functionName: "balanceOf",
        args: [address || "0x0"]
        // enabled: !!address
    });

    const { data: donations = [] } = useReadContract({
        address: DONATION_CONTRACT_ADDRESS,
        abi: donationABI,
        functionName: "showDonors"
        // enabled: !!address
    });

    const userDonations = Array.isArray(donations) 
        ? donations.filter(d => 
            address && 
            typeof d.donor === 'string' && 
            d.donor.toLowerCase() === address.toLowerCase()
          )
        : [];

    // Safe formatting function with type checking
    const formatAmount = (amount: unknown): string => {
        if (typeof amount === 'bigint') {
            return parseFloat(formatEther(amount)).toFixed(4);
        }
        return "0.0000";
    };

    // Convert credBalance to BigInt safely
    const credBalanceAsBigInt = (): bigint => {
        if (typeof credBalance === 'bigint') {
            return credBalance;
        }
        return BigInt(0);
    };

    // Calculate total contribution safely
    const calculateTotalContribution = (): string => {
        if (!Array.isArray(userDonations) || userDonations.length === 0) {
            return "0.0000";
        }

        const total = userDonations.reduce((sum, donation) => {
            if (typeof donation.amount === 'bigint') {
                return sum + donation.amount;
            }
            return sum;
        }, BigInt(0));

        return formatAmount(total);
    };

    const causes = {
        "climate": { icon: "🌱", label: "Climate Change" },
        "education": { icon: "📚", label: "Education" },
        "healthcare": { icon: "🏥", label: "Healthcare" },
        "poverty": { icon: "🤝", label: "Poverty Alleviation" }
    };

    // Calculate impact level for UI display
    const impactLevel = userDonations?.length > 5 ? "Champion" : 
                        userDonations?.length > 2 ? "Advocate" : 
                        userDonations?.length > 0 ? "Supporter" : "New Member";

    return (
        <main className="min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-b border-blue-500">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex space-x-8">
                        <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/donate" className="text-blue-100 hover:text-white transition-colors">
                            Donate
                        </Link>
                        <Link href="/profile" className="font-semibold text-white">
                            My Profile
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <w3m-button />
                        <w3m-network-button />
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 py-12">
                {!isConnected ? (
                    <div className="card p-12 text-center">
                        <svg className="w-20 h-20 mx-auto mb-6 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Please connect your wallet to view your donor profile and impact history.
                        </p>
                        <div className="flex justify-center">
                            <w3m-button />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Donor Profile Card */}
                        <div className="card">
                            <div className="card-header">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold">Your Donor Profile</h1>
                                        <p className="opacity-90 mt-1 flex items-center">
                                            <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs mr-2">
                                                {impactLevel}
                                            </span>
                                            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <Link href="/donate" className="btn-secondary">
                                            Make Another Donation
                                        </Link>
                                    </div>
                                </div>
                            </div>
            
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg border border-blue-100 dark:border-blue-800 flex items-start">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 mr-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">CRED Balance</p>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                            {formatAmount(credBalanceAsBigInt())} <span className="text-blue-600 dark:text-blue-400">CRED</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reward tokens for your generosity</p>
                                    </div>
                                </div>
                                <div className="bg-green-50 dark:bg-gray-900 p-4 rounded-lg border border-green-100 dark:border-green-800 flex items-start">
                                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg text-green-600 dark:text-green-400 mr-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Donations</p>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                            {userDonations?.length || 0}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Times you've made an impact</p>
                                    </div>
                                </div>
                                <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded-lg border border-purple-100 dark:border-purple-800 flex items-start">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-400 mr-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Total Contributed</p>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                            {calculateTotalContribution()} <span className="text-purple-600 dark:text-purple-400">ETH</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your generous contributions</p>
                                    </div>
                                </div>
                            </div>
            
                            {/* Donation History */}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Your Donation History</h2>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {userDonations?.length || 0} total donations
                                    </span>
                                </div>
            
                                {userDonations?.length > 0 ? (
                                    <div className="space-y-4">
                                        {userDonations.map((donation, index) => {
                                            const cause = causes[donation.theCase as keyof typeof causes] || { icon: "💰", label: donation.theCase };
                                            return (
                                                <div key={index} className="donation-item group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 -mx-4 transition-colors">
                                                    <div className="flex justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-lg mr-3">
                                                                {cause.icon}
                                                            </div>
                                                            <h3 className="font-medium capitalize text-gray-800 dark:text-gray-300">
                                                                {cause.label}
                                                            </h3>
                                                        </div>
                                                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                                                            {formatAmount(donation.amount)} ETH
                                                        </p>
                                                    </div>
                                                    {donation.message && (
                                                        <div className="mt-2 ml-13 pl-1 border-l-2 border-gray-200 dark:border-gray-700">
                                                            <p className="text-gray-600 dark:text-gray-400 pl-3 italic">
                                                                "{donation.message}"
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-center mt-3 text-sm text-gray-500 dark:text-gray-500">
                                                        <p>
                                                            {new Date().toLocaleDateString()}
                                                        </p>
                                                        <p className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                            </svg>
                                                            Earned <span className="font-medium text-purple-600 dark:text-purple-400 ml-1">
                                                                {typeof donation.amount === 'bigint' 
                                                                    ? (parseFloat(formatEther(donation.amount)) * 100).toFixed(0) 
                                                                    : "0"} CRED
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            You haven't made any donations yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
