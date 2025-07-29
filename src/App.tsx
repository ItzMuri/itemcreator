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
      anim: '',
      prop: '',
      usetime: undefined
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
    delete: false
  });

  const [activeTab, setActiveTab] = useState<'ox' | 'qb'>('ox');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">FiveM Item Creator</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Generate item configurations for ox_inventory and qb-inventory systems
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Item Configuration</h2>
            </div>
            <ItemForm itemData={itemData} setItemData={setItemData} />
          </div>

          {/* Preview Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Generated Code</h2>
              </div>
              
              {/* Tab Switcher */}
              <div className="flex bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('ox')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'ox'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  ox_inventory
                </button>
                <button
                  onClick={() => setActiveTab('qb')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
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
        <div className="text-center mt-12 text-gray-400">
          <p>Created for FiveM developers • Supports both ox_inventory and qb-inventory</p>
        </div>
      </div>
    </div>
  );
}

export default App;