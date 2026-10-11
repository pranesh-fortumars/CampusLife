'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  Bookmark, 
  Tag, 
  MessageSquare, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft,
  X,
  Send,
  Sparkles,
  BookOpen,
  Cpu,
  Bike,
  FileSpreadsheet,
  GraduationCap
} from 'lucide-react';

interface MarketplaceItem {
  id: string;
  badge: string;
  badgeColor: string;
  categoryTag: string;
  category: 'textbooks' | 'electronics' | 'mobility';
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPct?: number;
  priceType?: 'fixed' | 'negotiable' | 'quick_pick';
  sellerName: string;
  sellerYear: string;
  sellerTag: string;
  sellerTagColor: string;
  sellerAvatar: string;
  location: string;
  isBookmarked?: boolean;
  imageBg: string;
  imageIcon: any;
}

export default function CampusMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'textbooks' | 'electronics' | 'mobility'>('all');
  const [activeFilterPill, setActiveFilterPill] = useState<string | null>(null);
  const [items, setItems] = useState<MarketplaceItem[]>([
    {
      id: 'item-1',
      badge: 'GOOD',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      categoryTag: 'ACADEMICS • SEM 4/5',
      category: 'textbooks',
      title: 'Operating Systems: Concepts 10th Ed...',
      price: 450,
      originalPrice: 999,
      discountPct: 55,
      sellerName: 'Ananya S.',
      sellerYear: '4th Yr ECE',
      sellerTag: 'DTU Verified',
      sellerTagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      sellerAvatar: 'A',
      location: 'Mech Canteen / Hostel 4',
      imageBg: 'bg-amber-50',
      imageIcon: BookOpen
    },
    {
      id: 'item-2',
      badge: 'LIKE NEW',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      categoryTag: 'HARDWARE & TECH',
      category: 'electronics',
      title: 'Arduino Uno R3 Starter Kit + Sensor Bundle',
      description: 'Lab tested for Microcontroller Lab',
      price: 850,
      priceType: 'fixed',
      sellerName: 'Tanmay G.',
      sellerYear: '3rd Yr ME',
      sellerTag: 'Fast Reply',
      sellerTagColor: 'bg-purple-50 text-purple-700 border-purple-100',
      sellerAvatar: 'T',
      location: 'Tech Block 2 Lab',
      imageBg: 'bg-blue-50',
      imageIcon: Cpu
    },
    {
      id: 'item-3',
      badge: 'FAIR CONDITION',
      badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
      categoryTag: 'MOBILITY • HOSTEL RIDE',
      category: 'mobility',
      title: 'Hero Sprint Pro Single Speed Bicycle',
      description: '🔧 Serviced last week + new brake pads',
      price: 2400,
      priceType: 'negotiable',
      sellerName: 'Kartik V.',
      sellerYear: 'Final Yr EE',
      sellerTag: 'Ready to Ride',
      sellerTagColor: 'bg-teal-50 text-teal-700 border-teal-100',
      sellerAvatar: 'K',
      location: 'Ramanujan Hostel Cycle Stand',
      imageBg: 'bg-emerald-50',
      imageIcon: Bike
    },
    {
      id: 'item-4',
      badge: 'HIGHLIGHTED',
      badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      categoryTag: 'EXAM PREP • VERIFIED',
      category: 'textbooks',
      title: 'DBMS & SQL Complete Exam Reference Spiral...',
      description: '100% matched with Mid-Term S...',
      price: 120,
      priceType: 'quick_pick',
      sellerName: 'Pranav K.',
      sellerYear: '3rd Yr IT',
      sellerTag: 'Available Now',
      sellerTagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      sellerAvatar: 'P',
      location: 'Central Library Reading Room',
      imageBg: 'bg-purple-50',
      imageIcon: FileSpreadsheet
    }
  ]);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [offerModalItem, setOfferModalItem] = useState<MarketplaceItem | null>(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [chatModalItem, setChatModalItem] = useState<MarketplaceItem | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSent, setChatSent] = useState(false);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<'textbooks' | 'electronics' | 'mobility'>('textbooks');
  const [newCondition, setNewCondition] = useState('LIKE NEW');
  const [newLocation, setNewLocation] = useState('Central Library');

  const handleToggleBookmark = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    ));
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    const newItem: MarketplaceItem = {
      id: `item-${Date.now()}`,
      badge: newCondition,
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      categoryTag: `${newCategory.toUpperCase()} • DTU LISTING`,
      category: newCategory,
      title: newTitle.trim(),
      price: parseInt(newPrice),
      sellerName: 'Rahul S.',
      sellerYear: '3rd Yr CSE',
      sellerTag: 'DTU Verified',
      sellerTagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      sellerAvatar: 'R',
      location: newLocation,
      imageBg: 'bg-indigo-50',
      imageIcon: newCategory === 'textbooks' ? BookOpen : newCategory === 'electronics' ? Cpu : Bike
    };

    setItems([newItem, ...items]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewPrice('');
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerModalItem || !offerAmount) return;
    alert(`Offer of ₹${offerAmount} sent to ${offerModalItem.sellerName}! They will respond on your CampusLife Chat.`);
    setOfferModalItem(null);
    setOfferAmount('');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatSent(true);
    setTimeout(() => {
      setChatSent(false);
      setChatModalItem(null);
      setChatMessage('');
    }, 1000);
  };

  // Filter items
  const filteredItems = items.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (activeFilterPill === 'under_500' && item.price >= 500) return false;
    if (activeFilterPill === 'cse' && !item.categoryTag.includes('SEM') && !item.title.toLowerCase().includes('sql') && !item.title.toLowerCase().includes('operating')) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.sellerName.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-4 space-y-4 pb-28">
      
      {/* Top DTU Verified Campus Trade Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-200/80 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-[11px] leading-tight text-slate-800">
          <span className="font-bold text-slate-900">DTU Verified Campus Trade:</span> Safe on-campus peer meetups only • Zero shipping scams
        </div>
      </div>

      {/* Search Input Bar with Filter Toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, calculators, hostel gear, cyc..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          />
        </div>
        <button
          onClick={() => setActiveFilterPill(activeFilterPill ? null : 'under_500')}
          className={`p-2.5 rounded-2xl border transition-colors ${
            activeFilterPill
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title="Toggle Filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveFilterPill(activeFilterPill === 'under_500' ? null : 'under_500')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            activeFilterPill === 'under_500'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          ₹ Under ₹500
        </button>

        <button
          onClick={() => setActiveFilterPill(activeFilterPill === 'cse' ? null : 'cse')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            activeFilterPill === 'cse'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          🎓 B.Tech CSE Sem 6
        </button>

        <button
          onClick={() => setActiveFilterPill(activeFilterPill === 'hostel' ? null : 'hostel')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            activeFilterPill === 'hostel'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          🏢 Hostel Blocks
        </button>
      </div>

      {/* Category Pills (All Listings, Textbooks & Notes, Electronics) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Listings' },
          { id: 'textbooks', label: 'Textbooks & Notes' },
          { id: 'electronics', label: 'Electronics' },
          { id: 'mobility', label: 'Mobility & Rides' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed Header with Live Count */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-extrabold text-slate-900">Campus Feed</h2>
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold">
            {filteredItems.length} LIVE
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
          <span>⇅</span>
          <span>Recent first</span>
        </div>
      </div>

      {/* Feed Cards List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const Icon = item.imageIcon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-[24px] border border-slate-200/90 shadow-subtle p-3.5 space-y-3 relative transition-all hover:border-slate-300"
            >
              {/* Product Header / Image Box Preview */}
              <div className="flex gap-3">
                
                {/* Visual Thumbnail with Condition Badge */}
                <div className={`w-28 h-28 rounded-2xl ${item.imageBg} border border-slate-200/80 flex flex-col items-center justify-center relative shrink-0 p-2 overflow-hidden shadow-xs`}>
                  {/* Condition Badge on Top-Left */}
                  <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider border ${item.badgeColor}`}>
                    {item.badge}
                  </span>

                  <Icon className="w-10 h-10 text-slate-700 opacity-80" />
                </div>

                {/* Right Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    {/* Top row: Category tag & Bookmark */}
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 truncate">
                        {item.categoryTag}
                      </span>
                      <button
                        onClick={() => handleToggleBookmark(item.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          item.isBookmarked ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-500'
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price Tag Row */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-slate-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                    {item.discountPct && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                        {item.discountPct}% OFF
                      </span>
                    )}
                    {item.priceType === 'fixed' && (
                      <span className="text-[10px] font-semibold text-slate-400">
                        Fixed Price
                      </span>
                    )}
                    {item.priceType === 'negotiable' && (
                      <span className="text-[10px] font-semibold text-slate-400">
                        Negotiable
                      </span>
                    )}
                    {item.priceType === 'quick_pick' && (
                      <span className="px-1.5 py-0.5 rounded bg-teal-50 text-[10px] font-bold text-teal-700">
                        QUICK PICK
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Seller Row */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {item.sellerAvatar}
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-800 leading-tight">
                      {item.sellerName} <span className="font-normal text-slate-400">• {item.sellerYear}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                      <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border ${item.sellerTagColor}`}>
                  {item.sellerTag}
                </span>
              </div>

              {/* Action Buttons: Offer Price & Chat Seller */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  onClick={() => {
                    setOfferModalItem(item);
                    setOfferAmount((item.price * 0.9).toFixed(0));
                  }}
                  className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  <span>Offer Price</span>
                </button>

                <button
                  onClick={() => {
                    setChatModalItem(item);
                    setChatMessage(`Hi ${item.sellerName}, is "${item.title}" still available to meet at ${item.location}?`);
                  }}
                  className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-300 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Seller</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Campus Safety Guidelines Card */}
      <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/70 space-y-1.5">
        <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Campus Safety Guidelines</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Always meet in well-lit public campus locations like Central Library, Mic-Mac Canteen, or Tech Block foyers. Never transfer advance funds through UPI without verifying the item in person.
        </p>
      </div>

      {/* Floating Sell Item Button */}
      <div className="sticky bottom-20 z-30 pt-2 flex justify-center">
        <button
          onClick={() => setShowCreateModal(true)}
          className="py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xl shadow-indigo-500/30 flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Sell an Item • Create Listing</span>
        </button>
      </div>

      {/* Modal: Create Listing */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create Campus Listing</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Computer Networks Kurose 8th Ed"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="450"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Condition</label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="LIKE NEW">Like New</option>
                    <option value="GOOD">Good</option>
                    <option value="FAIR">Fair Condition</option>
                    <option value="HIGHLIGHTED">Highlighted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['textbooks', 'electronics', 'mobility'] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`p-2 rounded-xl text-[11px] font-bold capitalize border transition-all ${
                        newCategory === cat
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {cat === 'textbooks' ? 'Books' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Campus Meetup Spot</label>
                <input
                  type="text"
                  placeholder="Central Library / Mech Canteen"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-transform active:scale-98"
                >
                  Publish Listing to Campus Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Make an Offer */}
      {offerModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Make an Offer</h3>
                <p className="text-[11px] text-slate-500">{offerModalItem.title}</p>
              </div>
              <button onClick={() => setOfferModalItem(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center text-xs">
                <span className="text-slate-500">Listing Price:</span>
                <span className="font-extrabold text-slate-900">₹{offerModalItem.price}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Counter Offer (₹)</label>
                <input
                  type="number"
                  required
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-base font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md transition-colors"
              >
                Send Offer to {offerModalItem.sellerName}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Chat Seller */}
      {chatModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Message {chatModalItem.sellerName}</h3>
                <p className="text-[11px] text-slate-500">{chatModalItem.location}</p>
              </div>
              <button onClick={() => setChatModalItem(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {chatSent ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900">Message Sent!</div>
                <div className="text-[11px] text-slate-500">{chatModalItem.sellerName} will receive a notification.</div>
              </div>
            ) : (
              <form onSubmit={handleSendChat} className="space-y-3">
                <textarea
                  rows={3}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
