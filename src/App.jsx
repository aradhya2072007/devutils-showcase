import React, { useState } from 'react';
import devutils from '@aradhya2072007/devutils-npm';
import {
  Sparkles,
  Terminal,
  Copy,
  Check,
  Play,
  RotateCcw,
  ExternalLink,
  Layers,
  Code2,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const {
  capitalize,
  reverseString,
  slugify,
  truncate,
  countWords,
  isPalindrome,
  chunkArray,
  flattenArray,
  removeDuplicates,
  findMax,
  findMin,
  shuffleArray,
  isValidEmail,
  isValidPhone,
  isStrongPassword,
  isEmpty,
  isValidURL,
  deepClone,
  pick,
  omit,
  isEmptyObject,
  mergeObjects,
  clamp,
  roundTo,
  randomNumber,
  isEven,
  isOdd,
  isValidDate,
  formatDate,
  timeAgo,
  getDaysBetween
} = devutils;

const DEMO_ITEMS = [
  // Strings
  {
    category: 'strings',
    name: 'capitalize',
    signature: 'capitalize(str)',
    defaultInput: 'hello world from devutils npm',
    run: (input) => capitalize(input)
  },
  {
    category: 'strings',
    name: 'slugify',
    signature: 'slugify(str)',
    defaultInput: 'DevUtils NPM Package Showcase 🚀',
    run: (input) => slugify(input)
  },
  {
    category: 'strings',
    name: 'reverseString',
    signature: 'reverseString(str)',
    defaultInput: 'FullStack Developer 2026',
    run: (input) => reverseString(input)
  },
  {
    category: 'strings',
    name: 'countWords',
    signature: 'countWords(str)',
    defaultInput: 'The quick brown fox jumps over the lazy dog',
    run: (input) => countWords(input)
  },
  // Arrays
  {
    category: 'arrays',
    name: 'chunkArray',
    signature: 'chunkArray(arr, size)',
    defaultInput: '[1, 2, 3, 4, 5, 6, 7, 8]',
    run: (input) => chunkArray(JSON.parse(input), 2)
  },
  {
    category: 'arrays',
    name: 'removeDuplicates',
    signature: 'removeDuplicates(arr)',
    defaultInput: '[1, 2, 2, 3, 4, 4, 5, 1]',
    run: (input) => removeDuplicates(JSON.parse(input))
  },
  {
    category: 'arrays',
    name: 'flattenArray',
    signature: 'flattenArray(arr)',
    defaultInput: '[1, [2, [3, [4, 5]]]]',
    run: (input) => flattenArray(JSON.parse(input))
  },
  {
    category: 'arrays',
    name: 'findMax',
    signature: 'findMax(arr)',
    defaultInput: '[14, 82, 3, 99, 45, 12]',
    run: (input) => findMax(JSON.parse(input))
  },
  // Objects
  {
    category: 'objects',
    name: 'deepClone',
    signature: 'deepClone(obj)',
    defaultInput: '{"user": "Aradhya", "role": "Developer", "verified": true}',
    run: (input) => deepClone(JSON.parse(input))
  },
  {
    category: 'objects',
    name: 'pick',
    signature: 'pick(obj, ["user", "role"])',
    defaultInput: '{"user": "Aradhya", "role": "Developer", "secret": "12345"}',
    run: (input) => pick(JSON.parse(input), ['user', 'role'])
  },
  {
    category: 'objects',
    name: 'omit',
    signature: 'omit(obj, ["secret"])',
    defaultInput: '{"user": "Aradhya", "role": "Developer", "secret": "12345"}',
    run: (input) => omit(JSON.parse(input), ['secret'])
  },
  // Validation
  {
    category: 'validation',
    name: 'isValidEmail',
    signature: 'isValidEmail(email)',
    defaultInput: 'aradhya@example.com',
    run: (input) => isValidEmail(input)
  },
  {
    category: 'validation',
    name: 'isStrongPassword',
    signature: 'isStrongPassword(password)',
    defaultInput: 'P@ssw0rd2026!Secure',
    run: (input) => isStrongPassword(input)
  },
  {
    category: 'validation',
    name: 'isValidURL',
    signature: 'isValidURL(url)',
    defaultInput: 'https://www.npmjs.com/package/@aradhya2072007/devutils-npm',
    run: (input) => isValidURL(input)
  },
  // Numbers
  {
    category: 'numbers',
    name: 'clamp',
    signature: 'clamp(num, min, max)',
    defaultInput: '150',
    run: (input) => clamp(Number(input), 0, 100)
  },
  {
    category: 'numbers',
    name: 'roundTo',
    signature: 'roundTo(num, decimals)',
    defaultInput: '3.1415926535',
    run: (input) => roundTo(Number(input), 2)
  },
  {
    category: 'numbers',
    name: 'isEven',
    signature: 'isEven(num)',
    defaultInput: '42',
    run: (input) => isEven(Number(input))
  },
  // Dates
  {
    category: 'dates',
    name: 'formatDate',
    signature: 'formatDate(date, "YYYY-MM-DD")',
    defaultInput: '2026-11-22T23:55:00Z',
    run: (input) => formatDate(input, 'YYYY-MM-DD')
  },
  {
    category: 'dates',
    name: 'timeAgo',
    signature: 'timeAgo(date)',
    defaultInput: new Date(Date.now() - 3600000 * 4).toISOString(),
    run: (input) => timeAgo(input)
  },
  {
    category: 'dates',
    name: 'isValidDate',
    signature: 'isValidDate(date)',
    defaultInput: '2026-11-22',
    run: (input) => isValidDate(input)
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Examples' },
  { id: 'strings', name: 'Strings' },
  { id: 'arrays', name: 'Arrays' },
  { id: 'objects', name: 'Objects' },
  { id: 'validation', name: 'Validation' },
  { id: 'numbers', name: 'Numbers' },
  { id: 'dates', name: 'Dates' }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [inputs, setInputs] = useState(() => {
    const map = {};
    DEMO_ITEMS.forEach(item => {
      map[item.name] = item.defaultInput;
    });
    return map;
  });
  const [outputs, setOutputs] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  const filteredItems = DEMO_ITEMS.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleRun = (item) => {
    const val = inputs[item.name];
    try {
      const start = performance.now();
      const res = item.run(val);
      const time = (performance.now() - start).toFixed(2);
      setOutputs(prev => ({ ...prev, [item.name]: { val: res, time, error: null } }));
    } catch (err) {
      setOutputs(prev => ({ ...prev, [item.name]: { val: null, time: null, error: err.message } }));
    }
  };

  const handleCopy = (name, text) => {
    navigator.clipboard.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : String(text));
    setCopiedKey(name);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className="header">
        <div className="header-brand">
          <div className="logo-badge">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="logo-title">DevUtils Showcase</h1>
            <p className="logo-subtitle">Live Demo for @aradhya2072007/devutils-npm</p>
          </div>
        </div>
        <div className="header-links">
          <a
            href="https://www.npmjs.com/package/@aradhya2072007/devutils-npm"
            target="_blank"
            rel="noreferrer"
            className="btn-header"
          >
            <Terminal className="w-4 h-4" />
            <span>NPM Package</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <a
            href="https://github.com/aradhya2072007/devutils-showcase"
            target="_blank"
            rel="noreferrer"
            className="btn-header"
          >
            <Code2 className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-pill">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Interactive Consumer Project • Zero Dependencies</span>
        </div>
        <h2 className="hero-heading">
          Explore <span className="gradient-text">@aradhya2072007/devutils-npm</span> Live
        </h2>
        <p className="hero-desc">
          This project installs and executes pure JavaScript utility functions directly from the public NPM registry.
        </p>
        <div className="install-box">
          <span className="dollar">$</span>
          <code>npm install @aradhya2072007/devutils-npm</code>
          <button
            onClick={() => handleCopy('install', 'npm install @aradhya2072007/devutils-npm')}
            className="btn-copy"
          >
            {copiedKey === 'install' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey === 'install' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="filter-bar">
        <div className="tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Filter functions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Grid */}
      <main className="grid">
        {filteredItems.map(item => {
          const out = outputs[item.name];
          return (
            <div key={item.name} className="card">
              <div className="card-top">
                <span className="card-name">{item.name}</span>
                <span className="category-pill">{item.category}</span>
              </div>
              <code className="card-sig">{item.signature}</code>
              <div className="input-group">
                <label>Input Parameter:</label>
                <input
                  type="text"
                  value={inputs[item.name] || ''}
                  onChange={e => setInputs({ ...inputs, [item.name]: e.target.value })}
                  className="card-input"
                />
              </div>
              <div className="card-actions">
                <button onClick={() => handleRun(item)} className="btn-run">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Function</span>
                </button>
                <button
                  onClick={() => {
                    setInputs({ ...inputs, [item.name]: item.defaultInput });
                    setOutputs({ ...outputs, [item.name]: null });
                  }}
                  className="btn-reset"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Output Display */}
              <div className="output-box">
                <div className="output-header">
                  <span>Output</span>
                  {out && out.time && (
                    <span className="time-badge">
                      <Clock className="w-3 h-3" />
                      {out.time}ms
                    </span>
                  )}
                  {out && (
                    <button
                      onClick={() => handleCopy(item.name, out.val || out.error)}
                      className="btn-copy-sm"
                    >
                      {copiedKey === item.name ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
                <div className="output-content">
                  {out ? (
                    out.error ? (
                      <span className="text-red">{out.error}</span>
                    ) : (
                      <pre className="output-pre">
                        {typeof out.val === 'object' ? JSON.stringify(out.val, null, 2) : String(out.val)}
                      </pre>
                    )
                  ) : (
                    <span className="placeholder">Click "Run Function" to test output</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Aradhya Tiwari • Built with React 19 & Vite 8 • Powered by @aradhya2072007/devutils-npm</p>
      </footer>
    </div>
  );
}
