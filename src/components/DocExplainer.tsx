import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageIcon, X, AlertCircle, Loader2 } from 'lucide-react';

// ✅ SECURE: Load API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("⚠️ VITE_GEMINI_API_KEY is not set in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export default function DocExplainer() {
  const [inputText, setInputText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToGenerativePart = async (file: File) => {
    const base64Promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    const base64Data = (await base64Promise) as string;
    return {
      inlineData: { data: base64Data.split(',')[1], mimeType: file.type },
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorMsg("");
      const reader = new FileReader();
      reader.onloadend = () => setImageFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSimplify = async () => {
    if (!inputText && !imageFile) {
      setErrorMsg("Please provide text or an image.");
      return;
    }
    
    setLoading(true);
    setExplanation("");
    setErrorMsg("");

    try {
      // ✅ FIXED: Use correct model name
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash" 
      });
      
      const prompt = "Explain this legal text in simple, common-man bullet points. Be concise.";

      let result;
      if (imageFile && fileInputRef.current?.files?.[0]) {
        const imagePart = await fileToGenerativePart(fileInputRef.current.files[0]);
        result = await model.generateContent([prompt, imagePart, inputText]);
      } else {
        result = await model.generateContent([prompt, inputText]);
      }

      const response = await result.response;
      setExplanation(response.text());
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Connection failed. Check your internet or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800">Legal Simplifier</h3>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="text-indigo-600 font-semibold text-sm hover:underline flex items-center gap-1"
        >
          <ImageIcon size={16} /> {imageFile ? "Change Image" : "Upload Document Photo"}
        </button>
        <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
      </div>

      {imageFile && (
        <div className="relative mb-4 w-fit">
          <img src={imageFile} alt="Preview" className="h-24 rounded-lg border" />
          <button onClick={() => setImageFile(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X size={12}/></button>
        </div>
      )}

      <textarea 
        className="w-full h-32 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-900"
        placeholder="Paste legal text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      {errorMsg && (
        <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button 
        onClick={handleSimplify}
        disabled={loading}
        className="w-full mt-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 className="animate-spin" /> Processing...</> : "Simplify for Me"}
      </button>

      {explanation && (
        <div className="mt-6 p-5 bg-indigo-50 rounded-xl border border-indigo-100 text-slate-800">
          <div className="font-bold text-indigo-900 mb-2">Simplified Meaning:</div>
          <p className="whitespace-pre-wrap leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
