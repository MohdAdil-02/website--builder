import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck, FiCode, FiEye } from 'react-icons/fi';

const LivePreview = ({ code }) => {
  const cleanCode = code
    .replace(/```jsx?/g, '')
    .replace(/```/g, '')
    .trim();

  const componentMatch = cleanCode.match(/function\s+(\w+)\s*\(/);
  const componentName = componentMatch ? componentMatch[1] : 'App';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 24px;
          background: #ffffff;
          color: #1a1a1a;
        }
        #error-message {
          display: none;
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
          margin: 16px;
          font-family: monospace;
          font-size: 14px;
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <div id="error-message"></div>
      
      <script type="text/babel">
        window.onerror = function(msg, url, line, col, error) {
          var errorDiv = document.getElementById('error-message');
          errorDiv.style.display = 'block';
          errorDiv.textContent = 'Error: ' + msg + '\\nAt line: ' + line;
          return true;
        };

        try {
          var useState = React.useState;
          var useEffect = React.useEffect;
          var useRef = React.useRef;
          var useContext = React.useContext;
          var useReducer = React.useReducer;
          var useCallback = React.useCallback;
          var useMemo = React.useMemo;
          
          ${cleanCode}
          
          var ComponentToRender = typeof ${componentName} !== 'undefined' 
            ? ${componentName} 
            : null;
          
          if (ComponentToRender) {
            var root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(ComponentToRender));
          } else {
            var allKeys = Object.keys(window);
            var found = null;
            for (var i = 0; i < allKeys.length; i++) {
              var k = allKeys[i];
              if (k[0] === k[0].toUpperCase() && typeof window[k] === 'function' && k !== 'Function' && k !== 'Object') {
                found = window[k];
                break;
              }
            }
            if (found) {
              var root2 = ReactDOM.createRoot(document.getElementById('root'));
              root2.render(React.createElement(found));
            } else {
              var errorDiv2 = document.getElementById('error-message');
              errorDiv2.style.display = 'block';
              errorDiv2.textContent = 'No component found. Make sure your code defines a function component.';
            }
          }
        } catch (error) {
          var errorDiv3 = document.getElementById('error-message');
          errorDiv3.style.display = 'block';
          errorDiv3.textContent = 'Error: ' + error.message;
        }
      </script>
    </body>
    </html>
  `;

  return (
    <iframe
      srcDoc={htmlContent}
      className="w-full h-[600px] bg-white border-0"
      sandbox="allow-scripts"
      title="Live Preview"
    />
  );
};

const CodeDisplay = ({ code, type }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('code');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguage = () => {
    switch (type) {
      case 'frontend': return 'jsx';
      case 'backend': return 'javascript';
      case 'fullstack': return 'javascript';
      case 'api': return 'javascript';
      default: return 'javascript';
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-2">
          {type === 'frontend' && (
            <div className="flex bg-gray-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                  ${viewMode === 'code' 
                    ? 'bg-gray-700 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-gray-300'}`}
              >
                <FiCode className="text-sm" />
                Code
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                  ${viewMode === 'preview' 
                    ? 'bg-gray-700 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-gray-300'}`}
              >
                <FiEye className="text-sm" />
                Preview
              </button>
            </div>
          )}
          <span className="text-xs text-gray-500 font-mono">
            {type?.toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
                     text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 
                     rounded-lg transition-all"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy />
              Copy Code
            </>
          )}
        </button>
      </div>

      {type === 'frontend' && viewMode === 'preview' ? (
        <LivePreview code={code} />
      ) : (
        <div className="overflow-auto max-h-[600px]">
          <SyntaxHighlighter
            language={getLanguage()}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
            showLineNumbers
            lineNumberStyle={{
              color: '#4B5563',
              minWidth: '2.5em',
              paddingRight: '1em',
              textAlign: 'right',
              userSelect: 'none',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;