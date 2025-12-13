import React, { useState } from 'react';
import { Copy, Download, Package, Settings, Code } from 'lucide-react';
import ItemForm from './components/ItemForm';
import CodePreview from './components/CodePreview';
import { ItemData } from './types/ItemData';

function App() {
  const [itemData, setItemData] = useState<ItemData>({
    name: '',
    label: '',
    weight: 0,
    type: 'item',
    image: '',
    unique: false,
    useable: false,
    shouldClose: true,
    combinable: null,
    description: '',
    client: {
      image: '',
      export: '',
      status: {},
      anim: undefined,
      prop: undefined,
      usetime: undefined,
      disable: {},
      notification: undefined
    },
    server: {
      export: '',
      test: ''
    },
    buttons: [],
    stack: true,
    close: true,
    consume: 0,
    decay: false,
    degrade: 0,
    delete: false,
    qbDecay: undefined
  });

  const [activeTab, setActiveTab] = useState<'ox' | 'qb'>('ox');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">FiveM Item Creator</h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg px-4">
            Generate item configurations for ox_inventory and qb-inventory systems
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Form Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Item Configuration</h2>
            </div>
            <ItemForm itemData={itemData} setItemData={setItemData} />
          </div>

          {/* Preview Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Generated Code</h2>
              </div>
              
              {/* Tab Switcher */}
              <div className="flex bg-slate-700 rounded-lg p-1 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('ox')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    activeTab === 'ox'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  ox_inventory
                </button>
                <button
                  onClick={() => setActiveTab('qb')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    activeTab === 'qb'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  qb-inventory
                </button>
              </div>
            </div>
            
            <CodePreview itemData={itemData} activeTab={activeTab} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 text-gray-400 text-xs sm:text-sm">
          <p>Created for FiveM developers • Supports both ox_inventory and qb-inventory</p>
        </div>
      </div>
    </div>
  );
}

export default App;