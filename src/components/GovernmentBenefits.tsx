import React, { useState } from 'react';
import { GovernmentScheme, PersonaType } from '../types';
import { PERSONA_PROFILES } from '../data/mockData';
import { getTranslation } from '../utils/i18n';
import { Landmark, Sparkles, CheckCircle2, ExternalLink, ShieldAlert, Search, FileCheck, Award, ArrowUpRight } from 'lucide-react';

interface GovernmentBenefitsProps {
  currentPersona: PersonaType;
  schemes: GovernmentScheme[];
  onFindAiSchemes: (query: string) => Promise<void>;
  language?: string;
}

export const GovernmentBenefits: React.FC<GovernmentBenefitsProps> = ({
  currentPersona,
  schemes,
  onFindAiSchemes,
  language = 'Hinglish',
}) => {
  const profile = PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customSearch, setCustomSearch] = useState('');
  const [isSearchingAi, setIsSearchingAi] = useState(false);
  const [appliedSchemes, setAppliedSchemes] = useState<Record<string, boolean>>({});

  const handleApplyToggle = (schemeId: string) => {
    setAppliedSchemes((prev) => ({ ...prev, [schemeId]: !prev[schemeId] }));
  };

  const handleAiSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearch.trim()) return;
    setIsSearchingAi(true);
    await onFindAiSchemes(customSearch);
    setIsSearchingAi(false);
    setCustomSearch('');
  };

  const filteredSchemes = (schemes || []).filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plainEnglishExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0a0e17] border border-[#182030] rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">{getTranslation(language, 'benefitsTitle')}</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              India Public Welfare
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {getTranslation(language, 'benefitsSubtitle')}
          </p>
        </div>

        {/* AI Scheme Finder Form */}
        <form onSubmit={handleAiSearchSubmit} className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="e.g. Electric scooter subsidy, Laptop grant..."
            value={customSearch}
            onChange={(e) => setCustomSearch(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 w-full md:w-64 placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={isSearchingAi}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1 shrink-0 transition-colors disabled:opacity-50"
          >
            {isSearchingAi ? (
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Scan</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Categories & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Scholarship', 'Insurance', 'Micro-Credit', 'Pension', 'Healthcare'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchemes.map((scheme) => {
          const isApplied = appliedSchemes[scheme.id];
          return (
            <div
              key={scheme.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                isApplied ? 'border-emerald-500/60 bg-emerald-950/10' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {scheme.category}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center">
                    <Award className="w-3.5 h-3.5 mr-1" /> {scheme.matchScore}% Match
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 leading-snug">{scheme.name}</h3>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Benefit Value</span>
                  <span className="text-sm font-black text-amber-300">{scheme.benefitAmount}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{scheme.plainEnglishExplanation}</p>

                {/* Eligibility & Documents Checklist */}
                <div className="pt-2 border-t border-slate-800 space-y-2 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-400 block mb-1">Key Eligibility:</span>
                    <ul className="space-y-0.5 text-slate-300">
                      {scheme.eligibilityCriteria.map((c, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-1.5 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-400 block mb-1">Documents Needed:</span>
                    <div className="flex flex-wrap gap-1">
                      {scheme.documentsRequired.map((doc, i) => (
                        <span key={i} className="text-[10px] bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleApplyToggle(scheme.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                    isApplied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{isApplied ? 'Marked Applied' : 'Mark Interested'}</span>
                </button>

                <a
                  href={scheme.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center space-x-1 transition-all shadow-xs"
                >
                  <span>Gov Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
