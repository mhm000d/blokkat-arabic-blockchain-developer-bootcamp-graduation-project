"use client";

import Link from "next/link";
import { useAccount, useReadContract, useConnect } from "wagmi";
import { formatEther } from "viem";
import { donationABI, DONATION_CONTRACT_ADDRESS, DonationRecord } from "@/lib/contracts";

export default function Home() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    // Fetch total donors count
    const { data: allDonations = [] } = useReadContract({
        address: DONATION_CONTRACT_ADDRESS,
        abi: donationABI,
        functionName: "showDonors",
    });

    // Calculate total ETH donated
    const totalDonatedEth = (allDonations as DonationRecord[])?.reduce(
        (sum, donation) => sum + donation.amount,
        BigInt(0)
    ) || BigInt(0);

    // Helper function to format ETH amounts
    const formatDonationAmount = (amount: bigint) => {
        return parseFloat(formatEther(amount)).toFixed(4);
    };

    // Calculate impact progress percentage (for demo)
    const impactPercentage = Math.min(
        Array.isArray(allDonations) ? (allDonations.length / 100) * 100 : 0, 
        100
    );

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                {/* Navigation Bar */}
                <nav className="border-b border-blue-500 bg-opacity-90">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                        <div className="flex space-x-8">
                            <Link href="/" className="font-semibold text-white">
                                Home
                            </Link>
                            <Link href="/donate" className="text-blue-100 hover:text-white transition-colors">
                                Donate
                            </Link>
                            <Link href="/profile" className="text-blue-100 hover:text-white transition-colors">
                                My Profile
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <w3m-button />
                            <w3m-network-button />
                        </div>
                    </div>
                </nav>
                
                {/* Hero Content */}
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference with Blockchain</h1>
                        <p className="text-xl mb-8 text-blue-100">Your crypto donations directly support causes that matter. 100% transparent, 100% impactful.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/donate" className="btn-primary pulse-button">
                                Donate Now
                            </Link>
                            <Link href="/profile" className="btn-secondary">
                                View Your Impact
                            </Link>
                        </div>
                        
                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            <span className="trust-badge">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Secure
                            </span>
                            <span className="trust-badge">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                Transparent
                            </span>
                            <span className="trust-badge">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                                Community-Driven
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Impact Visualization */}
                <div className="mb-12">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Collective Impact</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Track our progress in real-time as we work together to make a difference.
                        </p>
                    </div>
                    
                    <div className="impact-meter mt-4 mb-2">
                        <div className="impact-meter-fill" style={{ width: `${impactPercentage}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Donors</span>
                        <span>Goal: 100 Donors</span>
                    </div>
                </div>
                
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="stats-card">
                        <div className="flex items-center mb-2">
                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium">Total Donors</h3>
                        </div>
                        <p className="text-3xl font-bold">
                            {Array.isArray(allDonations) ? allDonations.length : "0"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            People supporting our mission
                        </p>
                    </div>
                    <div className="stats-card">
                        <div className="flex items-center mb-2">
                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium">Total ETH Donated</h3>
                        </div>
                        <p className="text-3xl font-bold">
                            {totalDonatedEth > 0 ? parseFloat(formatEther(totalDonatedEth)).toFixed(2) : "0"} <span className="text-blue-600 dark:text-blue-400">ETH</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Transparent on the blockchain
                        </p>
                    </div>
                    <div className="stats-card">
                        <div className="flex items-center mb-2">
                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mr-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium">CRED Tokens Distributed</h3>
                        </div>
                        <p className="text-3xl font-bold">
                            {totalDonatedEth > 0 ? (parseFloat(formatEther(totalDonatedEth)) * 100).toFixed(0) : "0"} <span className="text-purple-600 dark:text-purple-400">CRED</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Rewarding our generous donors
                        </p>
                    </div>
                </div>

                {/* Donation History Table */}
                <div className="card mb-12">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Recent Donations</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">100% Verified on Blockchain</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Donor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Case
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Message
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Amount
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {Array.isArray(allDonations) && allDonations.slice(0, 10).map((donation, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">
                                        {typeof donation.donor === 'string' && 
                                          `${donation.donor.slice(0, 6)}...${donation.donor.slice(-4)}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                            {donation.theCase}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                        {donation.message || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                                        {formatDonationAmount(donation.amount)} ETH
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {(!Array.isArray(allDonations) || allDonations.length === 0) && (
                        <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="mb-2">No donations yet.</p>
                            <p>Be the first to make an impact!</p>
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="text-center py-8 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                    <p className="max-w-2xl mx-auto mb-6 text-blue-100">
                        Your donation today can change someone's tomorrow. Join our community of donors and help create lasting impact.
                    </p>
                    <Link
                        href="/donate"
                        className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md shadow-lg text-blue-700 bg-white hover:bg-gray-100 transition-colors"
                    >
                        Donate Now
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </main>
    );
}