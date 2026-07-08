import { useCodeGeneration } from './hooks/useCodeGeneration';
import PromptForm from './components/PromptForm';
import CodeDisplay from './components/CodeDisplay';

function App() {
  const { code, loading, error, generationType, generate, reset } = useCodeGeneration();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                         bg-clip-text text-transparent">
            ⚡ AI Code Generator
          </h1>
          <span className="text-xs text-gray-500">Powered by Groq</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Prompt Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <PromptForm 
              onSubmit={generate} 
              loading={loading} 
              onReset={reset} 
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 mb-6">
              ⚠️ {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 mb-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 
                              rounded-full animate-spin" />
                <p className="text-gray-400">Generating your code...</p>
              </div>
            </div>
          )}

          {/* Code Display */}
          {code && !loading && (
            <div className="mb-6">
              <CodeDisplay code={code} type={generationType} />
            </div>
          )}

          {/* Empty State */}
          {!code && !loading && !error && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Start Building
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Describe what you want to create above, select a code type, 
                and let AI generate it for you.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;