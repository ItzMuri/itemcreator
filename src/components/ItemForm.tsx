import React from 'react';
import { ItemData } from '../types/ItemData';
import { Plus, Trash2 } from 'lucide-react';

interface ItemFormProps {
  itemData: ItemData;
  setItemData: (data: ItemData | ((prev: ItemData) => ItemData)) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ itemData, setItemData }) => {
  const updateField = (field: string, value: any) => {
    setItemData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setItemData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof ItemData] as any,
        [field]: value
      }
    }));
  };

  const addButton = () => {
    setItemData(prev => ({
      ...prev,
      buttons: [...prev.buttons, { label: '', action: '' }]
    }));
  };

  const removeButton = (index: number) => {
    setItemData(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const updateButton = (index: number, field: 'label' | 'action' | 'group', value: string) => {
    setItemData(prev => ({
      ...prev,
      buttons: prev.buttons.map((button, i) => 
        i === index ? { ...button, [field]: value } : button
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white border-b border-slate-600 pb-2">
          Basic Information
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              value={itemData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g., water_bottle"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Label *
            </label>
            <input
              type="text"
              value={itemData.label}
              onChange={(e) => updateField('label', e.target.value)}
              placeholder="e.g., Water Bottle"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Weight
            </label>
            <input
              type="number"
              value={itemData.weight}
              onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Type
            </label>
            <select
              value={itemData.type}
              onChange={(e) => updateField('type', e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="item">Item</option>
              <option value="weapon">Weapon</option>
              <option value="ammo">Ammo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Consume Amount (ox_inventory)
            </label>
            <input
              type="number"
              value={itemData.consume}
              onChange={(e) => updateField('consume', parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Weapon/Ammo specific fields */}
        {(itemData.type === 'weapon' || itemData.type === 'ammo') && (
          <div className="grid md:grid-cols-2 gap-4">
            {itemData.type === 'weapon' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ammo Name
                  </label>
                  <input
                    type="text"
                    value={itemData.ammoname || ''}
                    onChange={(e) => updateField('ammoname', e.target.value)}
                    placeholder="e.g., AMMO_PISTOL"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Damage Reason
                  </label>
                  <input
                    type="text"
                    value={itemData.damagereason || ''}
                    onChange={(e) => updateField('damagereason', e.target.value)}
                    placeholder="e.g., Pistol"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
            {itemData.type === 'ammo' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ammo Type
                </label>
                <input
                  type="text"
                  value={itemData.ammotype || ''}
                  onChange={(e) => updateField('ammotype', e.target.value)}
                  placeholder="e.g., AMMO_PISTOL"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image Path
          </label>
          <input
            type="text"
            value={itemData.image}
            onChange={(e) => updateField('image', e.target.value)}
            placeholder="e.g., water_bottle.png"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={itemData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Item description..."
            rows={3}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Item Properties */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white border-b border-slate-600 pb-2">
          Item Properties
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="useable"
              checked={itemData.useable}
              onChange={(e) => updateField('useable', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="useable" className="text-sm text-gray-300">
              Useable
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="unique"
              checked={itemData.unique}
              onChange={(e) => updateField('unique', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="unique" className="text-sm text-gray-300">
              Unique
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="shouldClose"
              checked={itemData.shouldClose}
              onChange={(e) => updateField('shouldClose', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="shouldClose" className="text-sm text-gray-300">
              Should Close (QB)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="stack"
              checked={itemData.stack}
              onChange={(e) => updateField('stack', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="stack" className="text-sm text-gray-300">
              Stackable (ox_inventory)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="close"
              checked={itemData.close}
              onChange={(e) => updateField('close', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="close" className="text-sm text-gray-300">
              Close Inventory (ox_inventory)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="durability"
              checked={itemData.durability || false}
              onChange={(e) => updateField('durability', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="durability" className="text-sm text-gray-300">
              Enable Durability (ox_inventory)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="decay"
              checked={itemData.decay || false}
              onChange={(e) => updateField('decay', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="decay" className="text-sm text-gray-300">
              Enable Decay (ox_inventory)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="delete"
              checked={itemData.delete}
              onChange={(e) => updateField('delete', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="delete" className="text-sm text-gray-300">
              Delete on Use (QB)
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {itemData.decay && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Degrade Time (minutes) - ox_inventory
              </label>
              <input
                type="number"
                value={itemData.degrade}
                onChange={(e) => updateField('degrade', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
          
          {itemData.decay && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Consume Amount - ox_inventory
              </label>
              <input
                type="number"
                value={itemData.consume}
                onChange={(e) => updateField('consume', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.1"
                placeholder="e.g., 0.2"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* QB-Core specific decay */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Decay Value (QB-Core)
            </label>
            <input
              type="number"
              value={itemData.qbDecay || ''}
              onChange={(e) => updateField('qbDecay', parseFloat(e.target.value) || undefined)}
              min="0"
              step="0.1"
              placeholder="e.g., 3.0"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Disable Controls (ox_inventory) */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white">Disable Controls (ox_inventory)</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="disableMove"
                checked={itemData.client.disable?.move || false}
                onChange={(e) => updateNestedField('client', 'disable', {
                  ...itemData.client.disable,
                  move: e.target.checked
                })}
                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="disableMove" className="text-sm text-gray-300">
                Disable Movement
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="disableCar"
                checked={itemData.client.disable?.car || false}
                onChange={(e) => updateNestedField('client', 'disable', {
                  ...itemData.client.disable,
                  car: e.target.checked
                })}
                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="disableCar" className="text-sm text-gray-300">
                Disable Car Controls
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="disableCombat"
                checked={itemData.client.disable?.combat || false}
                onChange={(e) => updateNestedField('client', 'disable', {
                  ...itemData.client.disable,
                  combat: e.target.checked
                })}
                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="disableCombat" className="text-sm text-gray-300">
                Disable Combat
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="disableMouse"
                checked={itemData.client.disable?.mouse || false}
                onChange={(e) => updateNestedField('client', 'disable', {
                  ...itemData.client.disable,
                  mouse: e.target.checked
                })}
                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="disableMouse" className="text-sm text-gray-300">
                Disable Mouse
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Export Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white border-b border-slate-600 pb-2">
          Export Configuration
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Client Export
            </label>
            <input
              type="text"
              value={itemData.client.export}
              onChange={(e) => updateNestedField('client', 'export', e.target.value)}
              placeholder="e.g., my-script.useItem"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Server Export
            </label>
            <input
              type="text"
              value={itemData.server.export}
              onChange={(e) => updateNestedField('server', 'export', e.target.value)}
              placeholder="e.g., my-script.useItem"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Animation (ox_inventory)
            </label>
            <input
              type="text"
              value={itemData.client.anim || ''}
              onChange={(e) => updateNestedField('client', 'anim', e.target.value)}
              placeholder="e.g., eating"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prop (ox_inventory)
            </label>
            <input
              type="text"
              value={itemData.client.prop || ''}
              onChange={(e) => updateNestedField('client', 'prop', e.target.value)}
              placeholder="e.g., burger"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Use Time (ms) (ox_inventory)
            </label>
            <input
              type="number"
              value={itemData.client.usetime || ''}
              onChange={(e) => updateNestedField('client', 'usetime', parseInt(e.target.value) || undefined)}
              placeholder="e.g., 2500"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Server Test Message (ox_inventory)
            </label>
            <input
              type="text"
              value={itemData.server.test || ''}
              onChange={(e) => updateNestedField('server', 'test', e.target.value)}
              placeholder="e.g., what an amazingly delicious burger"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-medium text-white">Status Effects (ox_inventory)</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hunger
              </label>
              <input
                type="number"
                value={itemData.client.status?.hunger || ''}
                onChange={(e) => updateNestedField('client', 'status', {
                  ...itemData.client.status,
                  hunger: parseInt(e.target.value) || undefined
                })}
                placeholder="e.g., 200000"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thirst
              </label>
              <input
                type="number"
                value={itemData.client.status?.thirst || ''}
                onChange={(e) => updateNestedField('client', 'status', {
                  ...itemData.client.status,
                  thirst: parseInt(e.target.value) || undefined
                })}
                placeholder="e.g., 150000"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stress
              </label>
              <input
                type="number"
                value={itemData.client.status?.stress || ''}
                onChange={(e) => updateNestedField('client', 'status', {
                  ...itemData.client.status,
                  stress: parseInt(e.target.value) || undefined
                })}
                placeholder="e.g., -50000"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Configuration (ox_inventory) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white border-b border-slate-600 pb-2">
            Custom Buttons (ox_inventory)
          </h3>
          <button
            onClick={addButton}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Button
          </button>
        </div>

        {itemData.buttons.map((button, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={button.label}
              onChange={(e) => updateButton(index, 'label', e.target.value)}
              placeholder="Button Label"
              className="flex-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              value={button.action}
              onChange={(e) => updateButton(index, 'action', e.target.value)}
              placeholder="Action Function"
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              value={button.group || ''}
              onChange={(e) => updateButton(index, 'group', e.target.value)}
              placeholder="Group (optional)"
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={() => removeButton(index)}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemForm;