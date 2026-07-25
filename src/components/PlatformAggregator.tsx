import React, { useState } from 'react';
import { PlatformAccount, Transaction } from '../types';
import { getTranslation } from '../utils/i18n';
import { Smartphone, QrCode, Wallet, CreditCard, Tv, Building2, Plus, FileText, CheckCircle2, Search, ArrowUpRight, ArrowDownLeft, Sparkles, Clock, Tag , Upload } from 'lucide-react';

interface PlatformAggregatorProps {
  platforms: PlatformAccount[];
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onImportStatement: (payload: { statementText: string, fileData?: string, mimeType?: string }) => Promise<void>;
  onEditTransaction?: (transaction: Transaction) => void;
  language?: string;
}

export const PlatformAggregator: React.FC<PlatformAggregatorProps> = ({
  platforms,
  transactions,
  onAddTransaction,
  onImportStatement,
  onEditTransaction,
  language = 'Hinglish',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'essential' | 'discretionary' | 'subscription' | 'income'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showParserModal, setShowParserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [rawSmsText, setRawSmsText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // New Transaction Form State
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'expense' | 'income'>('expense');
  const [newPlatform, setNewPlatform] = useState('PhonePe');
  const [newCategory, setNewCategory] = useState<'Essential' | 'Discretionary' | 'Subscription' | 'Income' | 'BNPL / Debt'>('Essential');

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'QrCode': return <QrCode className="w-5 h-5 text-emerald-400" />;
      case 'Wallet': return <Wallet className="w-5 h-5 text-amber-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'Tv': return <Tv className="w-5 h-5 text-rose-400" />;
      case 'Building2': default: return <Building2 className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;
    onAddTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(newAmount),
      type: newType,
      description: newDesc,
      plainEnglishSummary: `${newType === 'income' ? 'Income received' : 'Expense incurred'} via ${newPlatform}`,
      platform: newPlatform,
      category: newCategory,
      status: 'completed',
      tags: [newPlatform, newCategory],
    });
    setNewDesc('');
    setNewAmount('');
    setShowAddModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleParseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawSmsText.trim() && !selectedFile) return;
    setIsParsing(true);
    
    let fileData = undefined;
    let mimeType = undefined;

    if (selectedFile) {
      mimeType = selectedFile.type;
      const buffer = await selectedFile.arrayBuffer();
      const base64Str = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      fileData = base64Str;
    }

    await onImportStatement({ statementText: rawSmsText, fileData, mimeType });
    setIsParsing(false);
    setRawSmsText('');
    setSelectedFile(null);
    setShowParserModal(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'essential' && t.category === 'Essential') ||
      (activeTab === 'discretionary' && t.category === 'Discretionary') ||
      (activeTab === 'subscription' && t.category === 'Subscription') ||
      (activeTab === 'income' && t.type === 'income');

    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.plainEnglishSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.platform.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalLiquidBalance = platforms.reduce((acc, p) => acc + (p.type !== 'subscription' ? p.balanceOrLimit : 0), 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0a0e17] border border-[#182030] rounded-2xl p-5 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h2 className="text-lg font-bold text-white">{getTranslation(language, 'connectedAccounts')}</h2>
            <span className="text-xs text-slate-400 bg-[#121927] px-2 py-0.5 rounded-full border border-[#1e293d]">
              {platforms.length} Sources
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            PhonePe, Google Pay, Paytm, CRED, BNPL Wallets & Bank accounts stream.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start lg:self-auto">
          <div className="bg-[#060910] px-4 py-2 rounded-xl border border-[#182030]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Liquid Balance</span>
            <span className="text-xl font-black text-emerald-400">₹{totalLiquidBalance.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={() => setShowParserModal(true)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:opacity-90 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-500/10"
          >
            <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>{getTranslation(language, 'uploadStatement')}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1 bg-[#141b2a] hover:bg-[#1c263b] text-slate-200 border border-[#212d45] font-semibold px-3.5 py-2.5 rounded-xl text-xs transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>{getTranslation(language, 'addTransaction')}</span>
          </button>
        </div>
      </div>

      {/* Grid of Connected Platforms */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition-all shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 group-hover:scale-105 transition-transform">
                  {getPlatformIcon(platform.icon)}
                </div>
                <span className="flex items-center text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1"></span>
                  Synced
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-200 truncate">{platform.provider}</h3>
              <p className="text-[10px] text-slate-400 truncate">{platform.category}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-500 block leading-tight">
                {platform.type === 'subscription' ? 'Monthly Auto-Debit' : 'Available Balance'}
              </span>
              <span className="text-sm font-extrabold text-slate-100">
                ₹{platform.balanceOrLimit.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Section Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">Plain-Language Expense Stream</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search scans, tea, rent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['all', 'essential', 'discretionary', 'subscription', 'income'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-slate-800 text-emerald-400 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-white/[0.08]">
          {filteredTransactions.length === 0 ? (
            <div className="py-12 text-center bg-[#06080e] rounded-xl border border-dashed border-white/10 space-y-3 my-4 p-6 max-w-lg mx-auto">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Build your Financial Passport</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  No transactions match your search or filter. Add your first entry or import an SMS statement to calculate live predictions.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3.5 py-1.5 bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-sm"
                >
                  Add Transaction
                </button>
                <button
                  onClick={() => setShowParserModal(true)}
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl text-xs"
                >
                  Import SMS Statement
                </button>
              </div>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-800/30 px-2 rounded-xl transition-colors relative">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      tx.type === 'income'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : tx.category === 'BNPL / Debt'
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {tx.type === 'income' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <button onClick={() => { setEditingTx(tx); setShowEditModal(true); }} className="absolute right-2 top-2 text-xs text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 px-2 py-1 rounded">Edit</button>

                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-slate-100 truncate">{tx.description}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 shrink-0">
                        {tx.platform}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{tx.plainEnglishSummary}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] text-slate-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {tx.date}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.2 rounded ${
                          tx.category === 'Essential'
                            ? 'text-blue-400 bg-blue-500/10'
                            : tx.category === 'Discretionary'
                            ? 'text-amber-400 bg-amber-500/10'
                            : tx.category === 'Subscription'
                            ? 'text-rose-400 bg-rose-500/10'
                            : tx.category === 'BNPL / Debt'
                            ? 'text-purple-400 bg-purple-500/10'
                            : 'text-emerald-400 bg-emerald-500/10'
                        }`}
                      >
                        {tx.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-sm font-extrabold ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-slate-100'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 block flex items-center justify-end mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-1" /> Verified
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal 1: Add Custom Transaction */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Add Unified Entry</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Description / Merchant</label>
                <input
                  type="text"
                  placeholder="e.g. Swiggy Lunch Order / Tapri Chai"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'expense' | 'income')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="expense">Expense (-)</option>
                    <option value="income">Income (+)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="PhonePe">PhonePe</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="Paytm">Paytm</option>
                    <option value="CRED">CRED</option>
                    <option value="Amazon Pay">Amazon Pay</option>
                    <option value="Simpl">Simpl BNPL</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="SBI Bank">SBI Bank</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Essential">Essential</option>
                    <option value="Discretionary">Discretionary</option>
                    <option value="Subscription">Subscription</option>
                    <option value="Income">Income</option>
                    <option value="BNPL / Debt">BNPL / Debt</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Auto Bank SMS / Statement Parser */}
      {showParserModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-100">Auto Bank SMS / Statement Parser</h3>
            </div>
            <p className="text-xs text-slate-400">
              Paste raw bank SMS alerts or copy-pasted UPI statements (e.g. "Debited Rs. 45.00 via PhonePe VPA tapri@ybl..."). The Smart Engine will extract amounts, merchants, and plain English descriptions automatically.
            </p>

            <form onSubmit={handleParseSubmit} className="space-y-4">
              
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2 cursor-pointer w-fit">
                  <Upload className="w-4 h-4" />
                  <span>Upload Statement (PDF / Image)</span>
                  <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleFileChange} />
                </label>
                {selectedFile && <span className="text-[10px] text-emerald-400">Selected: {selectedFile.name}</span>}
              </div>
              <div className="text-center text-xs text-slate-500 font-bold uppercase">OR</div>
              <textarea
                rows={5}
                placeholder="Paste SMS here... e.g.:&#10;1. A/C XX4921 Debited for Rs 120.00 on 24-07-26 by UPI/PhonePe/Swiggy.&#10;2. You have received Rs 1,450.00 from Zomato Partner payout."
                value={rawSmsText}
                onChange={(e) => setRawSmsText(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-500">Intelligent Parser Engine</span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowParserModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isParsing}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    {isParsing ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Parsing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Parse Statement</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Transaction */}
      {showEditModal && editingTx && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Edit Transaction</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (onEditTransaction) onEditTransaction(editingTx);
              setShowEditModal(false);
              setEditingTx(null);
            }} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Description</label>
                <input 
                  type="text" 
                  value={editingTx.description} 
                  onChange={(e) => setEditingTx({ ...editingTx, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white mt-1" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Amount</label>
                <input 
                  type="number" 
                  value={editingTx.amount} 
                  onChange={(e) => setEditingTx({ ...editingTx, amount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white mt-1" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Date (YYYY-MM-DD)</label>
                <input 
                  type="date" 
                  value={editingTx.date} 
                  onChange={(e) => setEditingTx({ ...editingTx, date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white mt-1" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Plain English Summary</label>
                <input 
                  type="text" 
                  value={editingTx.plainEnglishSummary} 
                  onChange={(e) => setEditingTx({ ...editingTx, plainEnglishSummary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white mt-1" 
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-800">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};