import React, { useState, useRef, CSSProperties } from 'react';
import Tesseract from 'tesseract.js';

interface Results {
  extractedText: string;
  explanation: string;
  keyPoints: string;
}

interface Languages {
  [key: string]: string;
}

const SaralSimplifier: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [language, setLanguage] = useState<string>('hindi');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages: Languages = {
    hindi: 'Hindi (हिंदी)',
    english: 'English',
    marathi: 'Marathi (मराठी)',
    tamil: 'Tamil (தமிழ்)',
    telugu: 'Telugu (తెలుగు)',
    bengali: 'Bengali (বাংলা)',
    gujarati: 'Gujarati (ગુજરાતી)',
    kannada: 'Kannada (ಕನ್ನಡ)',
    malayalam: 'Malayalam (മലയാളം)',
    punjabi: 'Punjabi (ਪੰਜਾਬੀ)'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please upload an image file');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const processDocument = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Claude API key first');
      return;
    }

    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Step 1: OCR extraction
      const { data: { text } } = await Tesseract.recognize(
        uploadedImage,
        'eng+hin+mar+tam+tel+ben+guj+kan+mal+pan',
        {
          logger: (m) => console.log(m)
        }
      );

      // Step 2: Simplify with Claude
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: `You are a legal document simplifier. Analyze this legal/official document and provide:

1. A simple explanation in ${languages[language]} that a common person can understand
2. Key points they should know

Document text:
${text}

Respond in this format:
EXPLANATION:
[Your simple explanation here]

KEY POINTS:
[Bullet points of important things to know]`
          }]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed: ' + response.statusText);
      }

      const data = await response.json();
      const content = data.content[0].text;

      const explanationMatch = content.match(/EXPLANATION:([\s\S]*?)KEY POINTS:/);
      const keyPointsMatch = content.match(/KEY POINTS:([\s\S]*)/);

      setResults({
        extractedText: text,
        explanation: explanationMatch ? explanationMatch[1].trim() : content,
        keyPoints: keyPointsMatch ? keyPointsMatch[1].trim() : 'See explanation above'
      });
    } catch (err) {
      setError('Error processing document: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📄 Saral</h1>
        <p style={styles.subtitle}>सरल - Complex Documents Made Simple</p>
      </div>

      <div style={styles.content}>
        {/* API Key Section */}
        <div style={styles.apiKeySection}>
          <h3>🔑 API Configuration</h3>
          <p>Enter your Claude API key:</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-api03-..."
            style={styles.input}
          />
          <div style={styles.infoBox}>
            <strong>How to get free API key:</strong>
            <ol style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>Visit <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a></li>
              <li>Sign up for free ($5 credits included)</li>
              <li>Go to API Keys section</li>
              <li>Create and copy your key</li>
            </ol>
          </div>
        </div>

        {/* Upload Section */}
        <div
          style={styles.uploadSection}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={styles.uploadIcon}>📤</div>
          <h2>Upload Document Image</h2>
          <p>Drag and drop or click to select</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Preview */}
        {previewUrl && (
          <div style={styles.previewSection}>
            <h3>Uploaded Document:</h3>
            <img src={previewUrl} alt="Preview" style={styles.previewImage} />
          </div>
        )}

        {/* Language Selector */}
        <div style={styles.languageSelector}>
          <label><strong>Explain in:</strong></label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.select}
          >
            {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Process Button */}
        <button
          onClick={processDocument}
          disabled={loading || !uploadedImage}
          style={{
            ...styles.button,
            opacity: loading || !uploadedImage ? 0.6 : 1,
            cursor: loading || !uploadedImage ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Processing...' : '🔍 Simplify Document'}
        </button>

        {/* Error */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Loading Spinner */}
        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Processing your document... This may take a minute.</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div style={styles.resultsSection}>
            <div style={styles.resultBox}>
              <h3 style={styles.resultTitle}>📝 Extracted Text</h3>
              <p style={styles.resultText}>{results.extractedText}</p>
            </div>

            <div style={styles.resultBox}>
              <h3 style={styles.resultTitle}>💡 Simple Explanation</h3>
              <p style={styles.resultText}>{results.explanation}</p>
            </div>

            <div style={styles.resultBox}>
              <h3 style={styles.resultTitle}>🔑 Key Points</h3>
              <p style={styles.resultText}>{results.keyPoints}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '1000px',
    margin: '20px auto',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '30px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '10px',
    margin: 0
  },
  subtitle: {
    opacity: 0.9,
    fontSize: '1.1em',
    margin: 0
  },
  content: {
    padding: '40px'
  },
  apiKeySection: {
    background: '#fff9e6',
    border: '2px solid #ffd700',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px'
  },
  infoBox: {
    background: '#e8f4f8',
    borderLeft: '4px solid #3498db',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '15px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1em',
    marginTop: '10px',
    boxSizing: 'border-box'
  },
  uploadSection: {
    border: '3px dashed #667eea',
    borderRadius: '15px',
    padding: '40px',
    textAlign: 'center',
    background: '#f8f9ff',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  uploadIcon: {
    fontSize: '4em',
    marginBottom: '20px'
  },
  previewSection: {
    marginTop: '30px'
  },
  previewImage: {
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    marginTop: '10px'
  },
  languageSelector: {
    margin: '20px 0',
    textAlign: 'center'
  },
  select: {
    padding: '12px 20px',
    fontSize: '1em',
    border: '2px solid #667eea',
    borderRadius: '10px',
    background: 'white',
    marginLeft: '10px',
    cursor: 'pointer'
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    fontSize: '1.1em',
    borderRadius: '30px',
    display: 'block',
    margin: '20px auto',
    transition: 'transform 0.2s'
  },
  loading: {
    textAlign: 'center',
    margin: '30px 0'
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  error: {
    background: '#fee',
    border: '2px solid #e74c3c',
    borderRadius: '8px',
    padding: '15px',
    color: '#c0392b',
    marginTop: '20px'
  },
  resultsSection: {
    marginTop: '30px'
  },
  resultBox: {
    background: '#f8f9ff',
    borderLeft: '4px solid #667eea',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  resultTitle: {
    color: '#667eea',
    marginBottom: '15px',
    fontSize: '1.3em',
    margin: '0 0 15px 0'
  },
  resultText: {
    lineHeight: '1.8',
    color: '#333',
    whiteSpace: 'pre-wrap',
    margin: 0
  }
};

export default SaralSimplifier;
