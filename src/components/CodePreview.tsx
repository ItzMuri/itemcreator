import React, { useState } from 'react';
import { ItemData } from '../types/ItemData';
import { Copy, Download, Check } from 'lucide-react';

interface CodePreviewProps {
  itemData: ItemData;
  activeTab: 'ox' | 'qb';
}

const CodePreview: React.FC<CodePreviewProps> = ({ itemData, activeTab }) => {
  const [copied, setCopied] = useState(false);

  const generateOxInventoryCode = () => {
    let code = `\t['${itemData.name}'] = {\n`;
    code += `\t\tlabel = '${itemData.label}',\n`;
    code += `\t\tweight = ${itemData.weight},\n`;
    
    // Add stack if false
    if (!itemData.stack) {
      code += `\t\tstack = false,\n`;
    }
    
    // Add close if false
    if (!itemData.close) {
      code += `\t\tclose = false,\n`;
    }
    
    // Add durability if enabled
    if (itemData.durability) {
      code += `\t\tdurability = true,\n`;
    }
    
    // Add weapon/ammo specific fields
    if (itemData.type === 'weapon') {
      if (itemData.ammoname) {
        code += `\t\tammoname = '${itemData.ammoname}',\n`;
      }
      if (itemData.damagereason) {
        code += `\t\tdamagereason = '${itemData.damagereason}',\n`;
      }
    }
    
    if (itemData.type === 'ammo' && itemData.ammotype) {
      code += `\t\tammotype = '${itemData.ammotype}',\n`;
    }
    
    // Add degrade if set
    if (itemData.decay && itemData.degrade > 0) {
      code += `\t\tdegrade = ${itemData.degrade},\n`;
    }
    
    // Add consume if set
    if (itemData.decay && itemData.consume > 0) {
      code += `\t\tconsume = ${itemData.consume}, -- amount to consume per use\n`;
    }
    
    // Add decay if enabled
    if (itemData.decay) {
      code += `\t\tdecay = true,\n`;
    }
    
    // Client section
    const hasStatus = itemData.client.status?.hunger || itemData.client.status?.thirst || itemData.client.status?.stress;
    const hasDisable = itemData.client.disable?.move || itemData.client.disable?.car || itemData.client.disable?.combat || itemData.client.disable?.mouse;
    const hasClientData = itemData.image || itemData.client.export || hasStatus || 
                         itemData.client.anim || itemData.client.prop || itemData.client.usetime || hasDisable;
    
    if (hasClientData) {
      code += `\t\tclient = {\n`;
      
      if (itemData.image) {
        code += `\t\t\timage = '${itemData.image}',\n`;
      }
      
      // Status effects
      if (hasStatus) {
        code += `\t\t\tstatus = {`;
        const statusParts = [];
        if (itemData.client.status?.hunger) statusParts.push(` hunger = ${itemData.client.status.hunger}`);
        if (itemData.client.status?.thirst) statusParts.push(` thirst = ${itemData.client.status.thirst}`);
        if (itemData.client.status?.stress) statusParts.push(` stress = ${itemData.client.status.stress}`);
        code += statusParts.join(',') + ' },\n';
      }
      
      if (itemData.client.anim) {
        if (typeof itemData.client.anim === 'string') {
          code += `\t\t\tanim = '${itemData.client.anim}',\n`;
        } else {
          code += `\t\t\tanim = { dict = "${itemData.client.anim.dict}", clip = "${itemData.client.anim.clip}" },\n`;
        }
      }
      
      if (itemData.client.prop) {
        if (typeof itemData.client.prop === 'string') {
          code += `\t\t\tprop = '${itemData.client.prop}',\n`;
        } else {
          code += `\t\t\tprop = {\n`;
          code += `\t\t\t\tmodel = '${itemData.client.prop.model}',\n`;
          code += `\t\t\t\tbone = ${itemData.client.prop.bone},\n`;
          code += `\t\t\t\tpos = vec3(${itemData.client.prop.pos.x}, ${itemData.client.prop.pos.y}, ${itemData.client.prop.pos.z}),\n`;
          code += `\t\t\t\trot = vec3(${itemData.client.prop.rot.x}, ${itemData.client.prop.rot.y}, ${itemData.client.prop.rot.z})\n`;
          code += `\t\t\t},\n`;
        }
      }
      
      if (itemData.client.usetime) {
        code += `\t\t\tusetime = ${itemData.client.usetime},\n`;
      }
      
      // Disable controls
      if (hasDisable) {
        code += `\t\t\tdisable = {`;
        const disableParts = [];
        if (itemData.client.disable?.move) disableParts.push(' move = true');
        if (itemData.client.disable?.car) disableParts.push(' car = true');
        if (itemData.client.disable?.combat) disableParts.push(' combat = true');
        if (itemData.client.disable?.mouse) disableParts.push(' mouse = true');
        code += disableParts.join(',') + ' },\n';
      }
      
      if (itemData.client.export) {
        code += `\t\t\texport = '${itemData.client.export}'\n`;
      }
      
      code += `\t\t},\n`;
    }
    
    // Server section
    if (itemData.server.export || itemData.server.test) {
      code += `\t\tserver = {\n`;
      
      if (itemData.server.export) {
        code += `\t\t\texport = '${itemData.server.export}'`;
        if (itemData.server.test) code += ',';
        code += '\n';
      }
      
      if (itemData.server.test) {
        code += `\t\t\ttest = '${itemData.server.test}'\n`;
      }
      
      code += `\t\t},\n`;
    }
    
    // Buttons section
    const validButtons = itemData.buttons.filter(btn => btn.label && btn.action);
    if (validButtons.length > 0) {
      code += `\t\tbuttons = {\n`;
      
      validButtons.forEach((button, index) => {
        code += `\t\t\t{\n`;
        code += `\t\t\t\tlabel = '${button.label}',\n`;
        if (button.group) {
          code += `\t\t\t\tgroup = '${button.group}',\n`;
        }
        code += `\t\t\t\taction = function(slot)\n`;
        code += `\t\t\t\t\tprint('${button.action}')\n`;
        code += `\t\t\t\tend\n`;
        code += `\t\t\t}`;
        if (index < validButtons.length - 1) code += ',';
        code += '\n';
      });
      
      code += `\t\t},\n`;
    }
    
    // Consume
    if (itemData.consume > 0) {
      code += `\t\tconsume = ${itemData.consume}\n`;
    }
    
    code += `\t},`;
    
    return `-- Add this to ox_inventory/data/items.lua\n\n${code}`;
  };

  const generateQBInventoryCode = () => {
    // Format weight as integer if it's a whole number, otherwise as decimal
    const weightValue = itemData.weight % 1 === 0 ? Math.floor(itemData.weight) : itemData.weight;
    
    let qbItem = `${itemData.name.padEnd(30)} = { name = '${itemData.name}', label = '${itemData.label}', weight = ${weightValue}, type = '${itemData.type}', image = '${itemData.image}', unique = ${itemData.unique ? 'true' : 'false'}, useable = ${itemData.useable ? 'true' : 'false'}, shouldClose = ${itemData.shouldClose ? 'true' : 'false'}`;
    
    if (itemData.description) {
      qbItem += `, description = '${itemData.description}'`;
    }
    
    if (itemData.qbDecay && itemData.qbDecay > 0) {
      qbItem += `, "decay" = ${itemData.qbDecay}`;
    }
    
    if (itemData.delete) {
      qbItem += `, "delete" = true`;
    }
    
    qbItem += ' },';

    return `-- Add this to qb-core/shared/items.lua\n\nQBShared.Items = {\n    -- ... your existing items ...\n    \n    ${qbItem}\n    \n    -- ... rest of your items ...\n}`;
  };

  const generateCode = () => {
    return activeTab === 'ox' ? generateOxInventoryCode() : generateQBInventoryCode();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadFile = () => {
    const code = generateCode();
    const filename = activeTab === 'ox' ? `${itemData.name}_ox_inventory.lua` : `${itemData.name}_qb_inventory.lua`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const code = generateCode();

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          disabled={!itemData.name || !itemData.label}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
        
        <button
          onClick={downloadFile}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          disabled={!itemData.name || !itemData.label}
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      {/* Code Display */}
      <div className="relative">
        <pre className="bg-slate-900 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm border border-slate-700 max-h-96 overflow-y-auto">
          <code>{code}</code>
        </pre>
        
        {(!itemData.name || !itemData.label) && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-lg font-medium">Fill in required fields</p>
              <p className="text-sm">Item Name and Display Label are required</p>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="font-medium text-white mb-2">
          {activeTab === 'ox' ? 'ox_inventory' : 'qb-inventory'} Instructions:
        </h4>
        <div className="text-sm text-gray-300 space-y-1">
          {activeTab === 'ox' ? (
            <>
              <p>1. Copy the generated code above</p>
              <p>2. Open <code className="bg-slate-800 px-1 rounded">ox_inventory/data/items.lua</code></p>
              <p>3. Add the item configuration to the items table</p>
              <p>4. Restart ox_inventory or refresh the resource</p>
              <p>5. If using custom exports, make sure your resource handles the functions</p>
            </>
          ) : (
            <>
              <p>1. Copy the generated code above</p>
              <p>2. Open <code className="bg-slate-800 px-1 rounded">qb-core/shared/items.lua</code></p>
              <p>3. Add the item to the QBShared.Items table</p>
              <p>4. Place the item image in <code className="bg-slate-800 px-1 rounded">qb-inventory/html/images/</code></p>
              <p>5. Restart qb-core and qb-inventory</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodePreview;