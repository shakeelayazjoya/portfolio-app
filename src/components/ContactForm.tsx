import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, ShieldCheck, Mail, User, BookOpen, MessageSquare, Loader2 } from "lucide-react";

interface ContactFormProps {
  accent: {
    from: string;
    to: string;
    text: string;
    glow: string;
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({ accent }) => {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setSubmitting(true);
    
    // Simulate secure network deliverable
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setReceiptId(`TX_SECURE_RECV_${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  const handleReset = () => {
    setFormState({ name: "", email: "", subject: "", message: "" });
    setSubmitted(false);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Form Headers */}
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className={`w-5 h-5 ${accent.text}`} />
              <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                End-to-End Encrypted Message Portal
              </span>
            </div>

            {/* Inputs with styled icon containers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  Your Identifier (Name)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Wade Wilson"
                    className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/80 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  Reply-to Address (Email)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="wade@deadpool.com"
                    className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/80 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="relative">
              <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                Subject
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Opportunity description"
                  className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/80 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                />
              </div>
            </div>

            {/* Message Area */}
            <div className="relative">
              <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                Secure Payload (Message)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="State your business or collaboration parameters here..."
                  className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/80 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-sans resize-none"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full relative overflow-hidden group flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-md ${
                submitting
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border dark:border-slate-700 cursor-not-allowed"
                  : `bg-gradient-to-r ${accent.from} ${accent.to} text-slate-950 hover:opacity-90 font-bold ${accent.glow}`
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span className="font-mono">Encrypting Payload...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transcribe & Submit Message</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            className="text-center p-6 sm:p-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={`h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-5 ${accent.glow}`}>
              <CheckCircle2 className={`w-8 h-8 ${accent.text}`} />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-2">
              Transmission Confirmed!
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              Your message was encrypted and transmitted securely. The recipient will be notified along with your trace receipt.
            </p>

            {/* Cryptographic Trace Ticket detail */}
            <div className="w-full max-w-sm bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 text-left font-mono mb-6">
              <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800 pb-2 mb-3 text-[10px] text-slate-400">
                <span>RECEIPT IDENTIFIER</span>
                <span>SECURE_SHA_256</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">RECEIPT_ID:</span>
                  <span className="font-semibold text-slate-800 dark:text-white truncate max-w-[200px]">{receiptId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SENDER:</span>
                  <span className="truncate max-w-[200px]">{formState.name} ({formState.email})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TIMESTAMP:</span>
                  <span>{new Date().toISOString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Deliver Another Packet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
