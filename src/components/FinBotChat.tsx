import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PersonaType } from '../types';
import { PERSONA_PROFILES, PersonaProfile } from '../data/mockData';
import { Sparkles, Send, Bot, User, Volume2, VolumeX, X } from 'lucide-react';

interface FinBotChatProps {
  currentPersona: PersonaType;
  customProfile: PersonaProfile | null;
  isOpen: boolean;
  onClose: () => void;
  language: string;
  onSendChatMessage: (text: string) => Promise<string>;
  initialQuery?: string;
}

export const FinBotChat: React.FC<FinBotChatProps> = ({
  currentPersona,
  customProfile,
  isOpen,
  onClose,
  language,
  onSendChatMessage,
  initialQuery,
}) => {
  const activeProfile = (currentPersona === 'custom_user' && customProfile) ? customProfile : PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;

  const presetQuestions = language.includes('Hindi') ? [
    `मेरा रेडीनेस स्कोर 85 तक कैसे पहुंचेगा?`,
    `क्या मेरी मौजूदा आय में ईएमआई (EMI) सही रहेगी?`,
    `मेरे प्रोफाइल के लिए कौन सी सरकारी योजना उपलब्ध है?`,
    `पे-लेटर (BNPL) और सब्सक्रिप्शन का खर्च कैसे घटाएं?`,
  ] : [
    `How can I improve my Health Score to 85?`,
    `Can I afford an EMI with my current income?`,
    `Which government schemes match my profile?`,
    `Analyze my uploaded bank statement.`,
    `Can you generate a mock cash flow report?`,
    `How to reduce BNPL and subscription drag?`,
  ];

  const welcomeText = language.includes('Hindi') 
    ? `नमस्ते ${activeProfile.name.split(' ')[0]}! मैं आपका MapMyMoney एआई वित्तीय सलाहकार हूं। आपके प्रोफाइल (${activeProfile.role}, ₹${activeProfile.monthlyAverageIncome.toLocaleString('en-IN')}/माह) के आधार पर, मैं आपके कैश फ्लो, रेडीनेस स्कोर और सरकारी योजनाओं में मदद के लिए तैयार हूं!`
    : `Namaste ${activeProfile.name.split(' ')[0]}! I am your MapMyMoney AI Financial Coach. Based on your profile (${activeProfile.role}, ₹${activeProfile.monthlyAverageIncome.toLocaleString('en-IN')}/mo in ${activeProfile.location}), I'm ready to help you optimize cash flow, boost your Health Score, and claim government benefits!`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialQuerySent = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && initialQuery && !initialQuerySent.current) {
      initialQuerySent.current = true;
      handleSendMessage(initialQuery);
    }
    if (!isOpen) {
      initialQuerySent.current = false;
    }
  }, [isOpen, initialQuery]);

  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language.includes('Hindi') ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const replyText = await onSendChatMessage(text);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      speakText(replyText);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'I ran into a connection issue while analyzing your profile. Please try asking again!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-end sm:p-4">
      <div className="bg-[#0f1420] border-l sm:border border-[#222d42] w-full sm:max-w-md h-full sm:h-[620px] sm:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in text-slate-100">
        {/* Chat Header */}
        <div className="bg-[#0b0e17] p-4 border-b border-[#1d2638] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center text-black font-extrabold shadow-md">
              <Sparkles className="w-4 h-4 fill-black" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Smart Advisor
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20 font-normal">
                  {language}
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">Context: {activeProfile.name} ({activeProfile.role})</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-1.5 rounded-lg border transition-colors ${
                speechEnabled
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-[#182030] border-[#25324a] text-slate-400'
              }`}
              title={speechEnabled ? 'Voice Enabled' : 'Voice Muted'}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a2233]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-[#0f1420]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start space-x-2 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-500/20 text-emerald-400 font-bold'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                    : 'bg-[#141b2b] border border-[#232d42] text-slate-200 rounded-tl-none space-y-1'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span className="text-[9px] text-slate-400 block text-right mt-0.5 opacity-75">{m.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
              <span>Smart Advisor is analyzing your cash flow...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Pills */}
        <div className="p-2.5 bg-[#0a0d14] border-t border-[#1d2638] overflow-x-auto whitespace-nowrap flex space-x-2">
          {presetQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="text-[10px] bg-[#141b2b] hover:bg-[#1d273e] text-slate-300 border border-[#232d42] px-2.5 py-1 rounded-full shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0a0d14] border-t border-[#1d2638]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask Smart Advisor..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#141b2b] border border-[#232d42] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
