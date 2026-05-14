import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Globe, Mail, Phone, MapPin, Type, FileText, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { SiteSettings } from '@/types';

const defaultSettings: SiteSettings = {
  siteName: 'EduCMS Academy',
  siteDescription: 'A modern educational institution committed to excellence',
  contactEmail: 'info@educms.edu',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Education Street, Knowledge City, ST 12345',
  heroTitle: 'Empowering Minds, Shaping Futures',
  heroSubtitle: 'Join our community of learners and unlock your potential with world-class education.',
  logo: '',
};

export default function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'homepage' | 'contact'>('general');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully!');
    }, 800);
  };

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  const tabs = [
    { id: 'general' as const, label: 'General', icon: Settings },
    { id: 'homepage' as const, label: 'Homepage', icon: Globe },
    { id: 'contact' as const, label: 'Contact', icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your website settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        className="bg-white rounded-xl border border-gray-200 p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTab === 'general' && (
          <div className="space-y-5 max-w-2xl">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Type className="w-4 h-4" /> Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => updateField('siteName', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <FileText className="w-4 h-4" /> Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => updateField('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Image className="w-4 h-4" /> Logo URL (optional)
              </label>
              <input
                type="url"
                value={settings.logo || ''}
                onChange={(e) => updateField('logo', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
        )}

        {activeTab === 'homepage' && (
          <div className="space-y-5 max-w-2xl">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Type className="w-4 h-4" /> Hero Title
              </label>
              <input
                type="text"
                value={settings.heroTitle || ''}
                onChange={(e) => updateField('heroTitle', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <FileText className="w-4 h-4" /> Hero Subtitle
              </label>
              <textarea
                value={settings.heroSubtitle || ''}
                onChange={(e) => updateField('heroSubtitle', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl">
              <p className="text-sm font-medium text-indigo-700 mb-2">Preview</p>
              <p className="text-lg font-bold text-gray-900">{settings.heroTitle}</p>
              <p className="text-sm text-gray-500 mt-1">{settings.heroSubtitle}</p>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-5 max-w-2xl">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Mail className="w-4 h-4" /> Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Phone className="w-4 h-4" /> Contact Phone
              </label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <MapPin className="w-4 h-4" /> Address
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => updateField('address', e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
