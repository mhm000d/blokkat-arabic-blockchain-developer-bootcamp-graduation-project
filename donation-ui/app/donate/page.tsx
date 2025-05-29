"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther, formatEther } from "viem";
import { donationABI, DONATION_CONTRACT_ADDRESS } from "@/lib/contracts";

export default function Donate() {
    const { address, isConnected } = useAccount();
    const [donationAmount, setDonationAmount] = useState("0.01");
    const [selectedCase, setSelectedCase] = useState("");
    const [customCase, setCustomCase] = useState("");
    const [donationMessage, setDonationMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);

    const cases = [
        { id: "climate", label: "🌱 Climate Change" },
        { id: "education", label: "📚 Education" },
        { id: "healthcare", label: "🏥 Healthcare" },
        { id: "poverty", label: "🤝 Poverty Alleviation" }
    ];

    const { data: hasVoted, refetch } = useReadContract({
        address: DONATION_CONTRACT_ADDRESS,
        abi: donationABI,
        functionName: "hasVotedFor",
        args: [address || "0x0", selectedCase || customCase],
        query: { enabled: !!address && (!!selectedCase || !!customCase) }
    });

    const { writeContract, isPending, error } = useWriteContract({
        mutation: {
            onSuccess: () => {
                setIsSuccess(true);
                refetch();
                setTimeout(() => {
                    setIsSuccess(false);
                    setSelectedCase("");
                    setCustomCase("");
                    setShowCustomInput(false);
                }, 5000);
            }
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected || (!selectedCase && !customCase)) return;

        const finalCase = (selectedCase || customCase).toUpperCase();

        writeContract({
            address: DONATION_CONTRACT_ADDRESS,
            abi: donationABI,
            functionName: "vote",
            args: [finalCase, donationMessage],
            value: parseEther(donationAmount)
        });
    };

    return (
        <main className="min-h-screen /*bg-gray-50*/">
            {/* Navigation Bar */}
            <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-b border-blue-500">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex space-x-8">
                        <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/donate" className="font-semibold text-white"> {/*text-blue-100 hover:text-white transition-colors*/}
                            Donate
                        </Link>
                        <Link href="/profile" className="text-blue-100 hover:text-white transition-colors"> {/*font-semibold text-white*/}
                            My Profile
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <w3m-button />
                        <w3m-network-button />
                    </div>
                </div>
            </nav>

            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Support a Cause</h1>

                    {!isConnected ? (
                        <div className="text-center py-8">
                            <p className="mb-4 text-gray-600">Connect your wallet to make a donation</p>
                            <w3m-button />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Case Selection */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-3">
                                    Select or Create a Cause
                                </label>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    {cases.map((caseItem) => (
                                        <button
                                            key={caseItem.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCase(caseItem.id);
                                                setShowCustomInput(false);
                                            }}
                                            className={`p-3 border rounded-lg text-left transition-colors ${
                                                selectedCase === caseItem.id && !showCustomInput
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            {caseItem.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Case Option */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCustomInput(true);
                                        setSelectedCase("");
                                    }}
                                    className={`w-full p-3 border rounded-lg text-left transition-colors ${
                                        showCustomInput
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    ✨ Create Custom Cause
                                </button>

                                {showCustomInput && (
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            value={customCase}
                                            onChange={(e) => setCustomCase(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your cause name"
                                            required
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Minimum 3 characters, no special symbols
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/*  */}
                            <div className="mb-6">
                                <label className="block text-base font-semibold text-gray-900 mb-3">
                                    Donation Amount (ETH)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={donationAmount}
                                        onChange={(e) => setDonationAmount(e.target.value)}
                                        className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0.01"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">ETH</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    You'll receive: <span className="font-medium">{(parseFloat(donationAmount) * 100).toFixed(0)} CRED</span>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Optional Message
                                </label>
                                <textarea
                                    rows={3}
                                    value={donationMessage}
                                    onChange={(e) => setDonationMessage(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Share why you're supporting this cause..."
                                />
                            </div>

                            {/* Status Messages */}
                            {error && (
                                <div className="p-3 text-red-700 bg-red-50 rounded-lg">
                                    Error: {error.message}
                                </div>
                            )}
                            {isSuccess && (
                                <div className="p-3 text-green-700 bg-green-50 rounded-lg">
                                    Donation successful! Thank you for your support.
                                </div>
                            )}
                            {hasVoted && (
                                <div className="p-3 text-yellow-700 bg-yellow-50 rounded-lg">
                                    You've already voted for this cause. Thank you!
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={
                                    isPending ||
                                    hasVoted ||
                                    !isConnected ||
                                    (!selectedCase && (!customCase || customCase.length < 3))
                                }
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                                    isPending
                                        ? "bg-blue-400"
                                        : hasVoted
                                            ? "bg-gray-400"
                                            : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {isPending
                                    ? "Processing..."
                                    : hasVoted
                                        ? "Already Donated"
                                        : "Donate & Vote"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
