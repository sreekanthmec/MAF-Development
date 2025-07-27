import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, Phone, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrainerPaymentInfo = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: "CHASE",
      accountNumber: "12345667789",
      code: "8",
      branchName: "Branch Name",
      isDefault: true
    },
    {
      id: 2,
      bankName: "CHASE",
      accountNumber: "12345667789",
      code: "8",
      branchName: "Branch Name",
      isDefault: false
    }
  ]);
  const currentAccount = accounts.find(account => account.isDefault) || accounts[0];
  const handleMakeDefault = (accountId: number) => {
    setAccounts(accounts.map(account => ({
      ...account,
      isDefault: account.id === accountId
    })));
  };
  const handleDeleteAccount = (accountId: number) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
  };
  return (
    <div className="bg-[#f7f7f7] flex flex-row justify-center w-full">
      <div className="bg-[#2d3748] overflow-hidden w-[360px] min-h-screen">
        <div className="relative w-[360px] min-h-screen">
          {/* Dark Header Section */}
          <div className="bg-[#2d3748] text-white px-5 py-6">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" className="p-0 text-white hover:text-gray-300" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-white text-xl font-bold">Payment Info</h1>
              <Button className="bg-black text-white px-3 py-2 rounded border border-white flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">Support</span>
              </Button>
            </div>
            {/* Current Bank Account Card */}
            <Card className="bg-white border border-gray-200 mb-4">
              <CardContent className="p-4">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-black font-bold text-base">{currentAccount.bankName}</h2>
                    <p className="text-gray-500 text-sm">22, Female</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Account Number</p>
                    <p className="text-black font-medium">*****124234234</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Code</p>
                    <p className="text-black font-medium">{currentAccount.code}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Branch Name</p>
                    <p className="text-black font-medium">{currentAccount.branchName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Payout Message */}
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm">
                Your earnings will be sent to your bank account within 7 days.
              </p>
            </div>
            {/* Add New Account Button */}
            <Button className="w-full bg-white text-black border border-black p-4 rounded-lg flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                <span className="font-bold">ADD NEW ACCOUNT</span>
              </div>
            </Button>
          </div>
          {/* Light Content Section */}
          <div className="bg-gray-100 flex-1 px-5 py-6">
            {/* Section Header */}
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// ACCOUNTS</p>
            {/* Accounts List */}
            <div className="space-y-3">
              {accounts.map((account) => (
                <Card key={account.id} className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-black font-bold text-base mb-1">{account.bankName}</h3>
                      <p className="text-gray-500 text-sm">
                        Account Number: <span className="text-black">{account.accountNumber}</span>
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        className="flex-1 text-gray-500 hover:text-black border border-gray-300 p-2"
                        onClick={() => handleMakeDefault(account.id)}
                        disabled={account.isDefault}
                      >
                        <span className="text-sm font-medium">
                          {account.isDefault ? 'DEFAULT' : 'MAKE DEFAULT'}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1 text-red-500 hover:text-red-600 border border-red-300 p-2"
                        onClick={() => handleDeleteAccount(account.id)}
                        disabled={account.isDefault}
                      >
                        <span className="text-sm font-medium">DELETE</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Empty State */}
            {accounts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏦</span>
                </div>
                <h3 className="font-medium text-gray-900 text-base mb-2">No bank accounts</h3>
                <p className="text-gray-500 text-sm">
                  Add a bank account to receive your earnings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerPaymentInfo; 