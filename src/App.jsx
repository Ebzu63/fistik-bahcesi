import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://egclheuuvykmytgxevqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnY2xoZXV1dnlrbXl0Z3hldnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzE1MDAsImV4cCI6MjA1MjQ0NzUwMH0.SB_K3LTCF5MKhLsgPdSdvkFPqDPnRkHAqJXSNQWjL1M';
const supabase = createClient(supabaseUrl, supabaseKey);

const Sun = () => <span>☀️</span>;
const Cloud = () => <span>☁️</span>;
const CloudRain = () => <span>🌧️</span>;
const Snowflake = () => <span>❄️</span>;

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);

  const farm = { parsel: '434', location: 'Sanliurfa, Bozova, Bugluca', area: '12 donum', trees: 250, tree_age: '35-45 yas', farm_type: 'Sulu Tarim' };
  const soil = { ph: 7.70, organic_matter: 1.36, phosphorus: 11.70, potassium: 158.10, lime: 8.70, salinity: 0.08, analysis_date: '2025-12-03' };
  const weatherData = [
    { day: 'Pzt', date: '13', temp: 8, low: 2, icon: Sun },
    { day: 'Sal', date: '14', temp: 10, low: 3, icon: Cloud },
    { day: 'Car', date: '15', temp: 9, low: 1, icon: Cloud },
    { day: 'Per', date: '16', temp: 11, low: 4, icon: Sun },
    { day: 'Cum', date: '17', temp: 8, low: 2, icon: CloudRain },
    { day: 'Cmt', date: '18', temp: 7, low: 0, icon: CloudRain },
    { day: 'Paz', date: '19', temp: 6, low: -1, icon: Snowflake }
  ];
  const prices = { kabuklu: { min: 580, max: 610 }, kirmiziKavlak: { min: 660, max: 700 }, bozKavlak: { min: 780, max: 840 }, icFistik: { min: 1000, max: 1200 }, lastUpdate: '14 Ocak 2026' };
  
  const yearlyPlan = {
    1: { name: 'Ocak', tasks: ['Kis budamasi kontrolu', 'Govde koruma kontrolu', 'Don takibi'], critical: false },
    2: { name: 'Subat', tasks: ['Budama tamamlama', 'Toprak hazirligi', 'Gubre siparisi'], critical: false },
    3: { name: 'Mart', tasks: ['Taban gubresi uygula', 'Ilk ilaclama', 'Toprak isleme'], fertilizer: '15 kg/da 20-20-0+Zn', critical: true },
    4: { name: 'Nisan', tasks: ['Ciceklenme takibi', 'Tozlasma kontrolu', 'Yaprak gubresi 1'], irrigation: '80-100 lt/agac', critical: true },
    5: { name: 'Mayis', tasks: ['Meyve tutumu kontrolu', 'Ust gubre 1', 'Yaprak gubresi 2'], irrigation: '100-120 lt/agac', critical: true },
    6: { name: 'Haziran', tasks: ['Meyve gelisimi takibi', 'Ust gubre 2', 'Yaprak gubresi 3'], irrigation: '120-150 lt/agac', critical: true },
    7: { name: 'Temmuz', tasks: ['Ic dolum takibi', 'Yogun sulama', 'Sicaklik stresi izleme'], irrigation: '150-180 lt/agac', critical: true },
    8: { name: 'Agustos', tasks: ['Hasat oncesi hazirlik', 'Sulama azaltma', 'Hasat ekipmani kontrolu'], irrigation: '100-120 lt/agac', critical: true },
    9: { name: 'Eylul', tasks: ['HASAT DONEMI', 'Silkeleme', 'Kurutma', 'Depolama'], critical: true, harvest: true },
    10: { name: 'Ekim', tasks: ['Hasat tamamlama', 'Satis', 'Sonbahar gubrelemesi'], fertilizer: '2-3 ton/da organik', critical: false },
    11: { name: 'Kasim', tasks: ['Sonbahar budamasi', 'Yaprak dokumu takibi', 'Kis hazirligi'], critical: false },
    12: { name: 'Aralik', tasks: ['Kis budamasi', 'Govde koruma', 'Kukurt + gubre dokme'], critical: false, completed: ['Budama', 'Govde boyasi', 'Kukurt dokme'] }
  };

  const diseaseDatabase = [
    { id: 1, name: 'Psylla (Fistik Piresi)', season: 'Nisan-Mayis', symptoms: 'Yapraklarda kivrilma', treatment: 'Imidacloprid', severity: 'high' },
    { id: 2, name: 'Kabuk Kurdu', season: 'Haziran-Agustos', symptoms: 'Govdede delikler', treatment: 'Chlorpyrifos', severity: 'high' },
    { id: 3, name: 'Verticillium Solgunlugu', season: 'Yaz aylari', symptoms: 'Tek tarafli solgunluk', treatment: 'Hasta agaci sok', severity: 'critical' },
    { id: 4, name: 'Antracnose', season: 'Nemli donemler', symptoms: 'Kahverengi lekeler', treatment: 'Bakir preparatlari', severity: 'medium' },
    { id: 5, name: 'Kirmizi Orumcek', season: 'Sicak donemler', symptoms: 'Yapraklarda bronzlasma', treatment: 'Abamectin', severity: 'medium' }
  ];

  useEffect(() => { loadAllData(); }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const { data: n } = await supabase.from('notes').select('*').order('date', { ascending: false });
      if (n) setNotes(n);
      const { data: e } = await supabase.from('expenses').select('*').order('date', { ascending: false });
      if (e) setExpenses(e);
      const { data: i } = await supabase.from('incomes').select('*').order('date', { ascending: false });
      if (i) setIncomes(i);
      const { data: d } = await supabase.from('diseases').select('*').order('date', { ascending: false });
      if (d) setDiseases(d);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const addNote = async (data) => {
    setSaving(true);
    const { data: res, error } = await supabase.from('notes').insert([{ date: data.date, text: data.text, month: new Date(data.date).getMonth() + 1, year: new Date(data.date).getFullYear() }]).select();
    if (!error && res) setNotes([res[0], ...notes]);
    setSaving(false);
    setShowNoteModal(false);
  };

  const addExpense = async (data) => {
    setSaving(true);
    const { data: res, error } = await supabase.from('expenses').insert([data]).select();
    if (!error && res) setExpenses([res[0], ...expenses]);
    setSaving(false);
    setShowExpenseModal(false);
  };

  const addIncome = async (data) => {
    setSaving(true);
    const { data: res, error } = await supabase.from('incomes').insert([data]).select();
    if (!error && res) setIncomes([res[0], ...incomes]);
    setSaving(false);
    setShowIncomeModal(false);
  };

  const addDisease = async (data) => {
    setSaving(true);
    const { data: res, error } = await supabase.from('diseases').insert([data]).select();
    if (!error && res) setDiseases([res[0], ...diseases]);
    setSaving(false);
    setShowDiseaseModal(false);
  };

  const deleteItem = async (table, id, setter, items) => {
    if (!window.confirm('Silmek istediginize emin misiniz?')) return;
    await supabase.from(table).delete().eq('id', id);
    setter(items.filter(x => x.id !== id));
  };

  const totalExpenses = expenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0);
  const totalIncome = incomes.reduce((s, i) => s + parseFloat(i.amount || 0), 0);
  const estimatedYield = Math.round(farm.trees * 15 * 1.3);
  const avgPrice = (prices.kabuklu.min + prices.kabuklu.max) / 2;
  const estimatedRevenue = estimatedYield * avgPrice;
  const estimatedProfit = estimatedRevenue - totalExpenses;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌰</div>
          <p style={{ fontSize: '20px' }}>Yukleniyor...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', name: 'Ana Sayfa', icon: '🏠' },
    { id: 'calendar', name: 'Is Plani', icon: '📅' },
    { id: 'finance', name: 'Finans', icon: '💰' },
    { id: 'diseases', name: 'Hastalik', icon: '🐛' },
    { id: 'fertilizer', name: 'Gubre', icon: '🌱' },
    { id: 'notes', name: 'Notlar', icon: '📝' },
    { id: 'settings', name: 'Ayarlar', icon: '⚙️' }
  ];

  const cardStyle = { background: 'rgba(6, 78, 59, 0.3)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '16px' };
  const buttonStyle = { background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', border: 'none', borderRadius: '12px', padding: '12px 24px', color: 'white', cursor: 'pointer', fontWeight: '500' };
  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(6, 78, 59, 0.5)', color: 'white', marginBottom: '12px' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      {/* Mobile Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(6, 78, 59, 0.95)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>☰</button>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#6ee7b7' }}>🌰 Fistik Bahcesi</h1>
        <button onClick={loadAllData} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>🔄</button>
      </header>

      {/* Sidebar */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} />}
      <aside style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: '280px', background: 'rgba(6, 78, 59, 0.98)', borderRight: '1px solid rgba(16, 185, 129, 0.2)', transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s', zIndex: 45, paddingTop: '20px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '32px' }}>🌰</span>
          <div>
            <h2 style={{ fontWeight: 'bold', color: '#6ee7b7' }}>Fistik Bahcesi</h2>
            <p style={{ fontSize: '12px', color: '#34d399' }}>Yonetim Sistemi</p>
          </div>
        </div>
        <nav style={{ padding: '16px' }}>
          {menuItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', marginBottom: '8px', borderRadius: '12px', border: activeTab === item.id ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent', background: activeTab === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent', color: activeTab === item.id ? '#6ee7b7' : '#a7f3d0', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontWeight: '500' }}>{item.name}</span>
            </button>
          ))}
        </nav>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#6ee7b7' }}>{farm.trees}</p>
              <p style={{ fontSize: '12px', color: '#34d399' }}>Agac</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#6ee7b7' }}>{farm.area}</p>
              <p style={{ fontSize: '12px', color: '#34d399' }}>Alan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ paddingTop: '70px', padding: '70px 16px 16px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Farm Info */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#6ee7b7', borderRadius: '50%' }}></span>
                  Parsel: {farm.parsel}
                </span>
                <span style={{ color: '#34d399' }}>|</span>
                <span>{farm.location}</span>
                <span style={{ color: '#34d399' }}>|</span>
                <span style={{ color: '#6ee7b7', fontWeight: '500' }}>{farm.farm_type}</span>
              </div>
            </div>

            {/* Weather */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(14, 116, 144, 0.3) 0%, rgba(6, 95, 70, 0.3) 100%)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ color: '#67e8f9', fontWeight: '600' }}>🌡️ 7 Gunluk Hava Durumu</h3>
                <span style={{ fontSize: '12px', color: '#22d3ee' }}>Bozova</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {weatherData.map((d, i) => (
                  <div key={i} style={{ flexShrink: 0, width: '70px', padding: '12px 8px', borderRadius: '12px', textAlign: 'center', background: i === 0 ? 'rgba(34, 211, 238, 0.2)' : 'rgba(14, 116, 144, 0.2)', border: i === 0 ? '1px solid rgba(34, 211, 238, 0.4)' : 'none' }}>
                    <p style={{ fontSize: '12px', color: '#67e8f9' }}>{d.day}</p>
                    <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{d.date}</p>
                    <div style={{ fontSize: '24px', margin: '8px 0' }}><d.icon /></div>
                    <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{d.temp}°</p>
                    <p style={{ fontSize: '12px', color: '#22d3ee' }}>{d.low}°</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prices */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.3) 0%, rgba(120, 53, 15, 0.3) 100%)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ color: '#fcd34d', fontWeight: '600' }}>📈 Fistik Fiyatlari</h3>
                <span style={{ fontSize: '12px', color: '#fbbf24' }}>{prices.lastUpdate}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ background: 'rgba(180, 83, 9, 0.3)', borderRadius: '12px', padding: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#fcd34d' }}>Kabuklu</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fef3c7' }}>{prices.kabuklu.min}-{prices.kabuklu.max} TL</p>
                </div>
                <div style={{ background: 'rgba(180, 83, 9, 0.3)', borderRadius: '12px', padding: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#fcd34d' }}>Kirmizi Kavlak</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fef3c7' }}>{prices.kirmiziKavlak.min}-{prices.kirmiziKavlak.max} TL</p>
                </div>
                <div style={{ background: 'rgba(180, 83, 9, 0.3)', borderRadius: '12px', padding: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#fcd34d' }}>Boz Kavlak</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fef3c7' }}>{prices.bozKavlak.min}-{prices.bozKavlak.max} TL</p>
                </div>
                <div style={{ background: 'rgba(180, 83, 9, 0.3)', borderRadius: '12px', padding: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#fcd34d' }}>Ic Fistik</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fef3c7' }}>{prices.icFistik.min}-{prices.icFistik.max} TL</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.3) 0%, rgba(21, 128, 61, 0.3) 100%)' }}>
                <p style={{ fontSize: '12px', color: '#86efac' }}>🌱 Tahmini Verim</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{estimatedYield} kg</p>
              </div>
              <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(202, 138, 4, 0.3) 0%, rgba(161, 98, 7, 0.3) 100%)' }}>
                <p style={{ fontSize: '12px', color: '#fde047' }}>💰 Tahmini Gelir</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{(estimatedRevenue / 1000).toFixed(0)}K TL</p>
              </div>
              <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(185, 28, 28, 0.3) 100%)' }}>
                <p style={{ fontSize: '12px', color: '#fca5a5' }}>📉 Toplam Gider</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{(totalExpenses / 1000).toFixed(0)}K TL</p>
              </div>
              <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(126, 34, 206, 0.3) 100%)' }}>
                <p style={{ fontSize: '12px', color: '#d8b4fe' }}>📊 Tahmini Kar</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{(estimatedProfit / 1000).toFixed(0)}K TL</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <button onClick={() => setShowNoteModal(true)} style={{ ...buttonStyle, background: 'rgba(16, 185, 129, 0.3)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>➕ Not Ekle</button>
              <button onClick={() => setShowExpenseModal(true)} style={{ ...buttonStyle, background: 'rgba(220, 38, 38, 0.3)', border: '1px solid rgba(220, 38, 38, 0.4)' }}>➕ Gider Ekle</button>
              <button onClick={() => setShowIncomeModal(true)} style={{ ...buttonStyle, background: 'rgba(22, 163, 74, 0.3)', border: '1px solid rgba(22, 163, 74, 0.4)' }}>➕ Gelir Ekle</button>
              <button onClick={() => setShowDiseaseModal(true)} style={{ ...buttonStyle, background: 'rgba(234, 88, 12, 0.3)', border: '1px solid rgba(234, 88, 12, 0.4)' }}>➕ Hastalik</button>
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {activeTab === 'calendar' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6ee7b7' }}>📅 2026 Is Plani</h2>
            {Object.entries(yearlyPlan).map(([month, data]) => {
              const monthNotes = notes.filter(n => n.month === parseInt(month));
              const isCurrentMonth = new Date().getMonth() + 1 === parseInt(month);
              return (
                <div key={month} style={{ ...cardStyle, background: data.harvest ? 'linear-gradient(135deg, rgba(180, 83, 9, 0.3) 0%, rgba(120, 53, 15, 0.3) 100%)' : data.critical ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.15) 100%)' : isCurrentMonth ? 'linear-gradient(135deg, rgba(22, 163, 74, 0.3) 0%, rgba(21, 128, 61, 0.3) 100%)' : cardStyle.background, border: isCurrentMonth ? '2px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', background: isCurrentMonth ? '#22c55e' : 'rgba(16, 185, 129, 0.3)' }}>{month}</span>
                    <div>
                      <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{data.name}</h3>
                      {data.harvest && <span style={{ fontSize: '12px', color: '#fbbf24' }}>🎉 HASAT DONEMI</span>}
                      {data.critical && !data.harvest && <span style={{ fontSize: '12px', color: '#f87171' }}>⚠️ Kritik Donem</span>}
                    </div>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#6ee7b7', marginBottom: '4px' }}>Yapilacaklar:</p>
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                      {data.tasks.map((task, i) => <li key={i} style={{ fontSize: '14px', marginBottom: '4px' }}>{task}</li>)}
                    </ul>
                  </div>
                  {data.irrigation && <p style={{ fontSize: '14px', color: '#67e8f9' }}>💧 Sulama: {data.irrigation}</p>}
                  {data.fertilizer && <p style={{ fontSize: '14px', color: '#86efac' }}>🌱 Gubre: {data.fertilizer}</p>}
                  {monthNotes.length > 0 && (
                    <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(147, 51, 234, 0.2)', borderRadius: '8px' }}>
                      <p style={{ fontSize: '12px', color: '#c4b5fd', marginBottom: '8px' }}>📝 Notlar ({monthNotes.length}):</p>
                      {monthNotes.slice(0, 2).map((n, i) => <p key={i} style={{ fontSize: '13px', color: '#e9d5ff' }}>{n.text?.substring(0, 60)}...</p>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* FINANCE */}
        {activeTab === 'finance' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6ee7b7' }}>💰 Finans</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowExpenseModal(true)} style={{ ...buttonStyle, padding: '8px 16px', fontSize: '14px', background: 'rgba(220, 38, 38, 0.3)' }}>+ Gider</button>
                <button onClick={() => setShowIncomeModal(true)} style={{ ...buttonStyle, padding: '8px 16px', fontSize: '14px', background: 'rgba(22, 163, 74, 0.3)' }}>+ Gelir</button>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(185, 28, 28, 0.3) 100%)' }}>
                <p style={{ fontSize: '14px', color: '#fca5a5' }}>Toplam Gider</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalExpenses.toLocaleString()} TL</p>
              </div>
              <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.3) 0%, rgba(21, 128, 61, 0.3) 100%)' }}>
                <p style={{ fontSize: '14px', color: '#86efac' }}>Toplam Gelir</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalIncome.toLocaleString()} TL</p>
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f87171', marginBottom: '16px' }}>Giderler ({expenses.length})</h3>
              {expenses.length === 0 ? <p style={{ color: '#6ee7b7', textAlign: 'center', padding: '20px' }}>Henuz gider yok</p> : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {expenses.map(e => (
                    <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(220, 38, 38, 0.15)', borderRadius: '8px', marginBottom: '8px' }}>
                      <div>
                        <p style={{ fontWeight: '500' }}>{e.description}</p>
                        <p style={{ fontSize: '12px', color: '#6ee7b7' }}>{e.date} - {e.category}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 'bold', color: '#f87171' }}>-{parseFloat(e.amount).toLocaleString()} TL</span>
                        <button onClick={() => deleteItem('expenses', e.id, setExpenses, expenses)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#6ee7b7', marginBottom: '16px' }}>Gelirler ({incomes.length})</h3>
              {incomes.length === 0 ? <p style={{ color: '#6ee7b7', textAlign: 'center', padding: '20px' }}>Henuz gelir yok</p> : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {incomes.map(i => (
                    <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(22, 163, 74, 0.15)', borderRadius: '8px', marginBottom: '8px' }}>
                      <div>
                        <p style={{ fontWeight: '500' }}>{i.description}</p>
                        <p style={{ fontSize: '12px', color: '#6ee7b7' }}>{i.date} - {i.category}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 'bold', color: '#6ee7b7' }}>+{parseFloat(i.amount).toLocaleString()} TL</span>
                        <button onClick={() => deleteItem('incomes', i.id, setIncomes, incomes)} style={{ background: 'none', border: 'none', color: '#6ee7b7', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* DISEASES */}
        {activeTab === 'diseases' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6ee7b7' }}>🐛 Hastalik/Zararli</h2>
              <button onClick={() => setShowDiseaseModal(true)} style={{ ...buttonStyle, padding: '8px 16px', fontSize: '14px', background: 'rgba(234, 88, 12, 0.3)' }}>+ Kayit</button>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Hastalik Rehberi</h3>
              {diseaseDatabase.map(d => (
                <div key={d.id} style={{ padding: '12px', marginBottom: '12px', borderRadius: '12px', background: d.severity === 'critical' ? 'rgba(220, 38, 38, 0.2)' : d.severity === 'high' ? 'rgba(234, 88, 12, 0.2)' : 'rgba(202, 138, 4, 0.2)', border: `1px solid ${d.severity === 'critical' ? 'rgba(220, 38, 38, 0.3)' : d.severity === 'high' ? 'rgba(234, 88, 12, 0.3)' : 'rgba(202, 138, 4, 0.3)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{d.name}</span>
                    <span style={{ fontSize: '12px', color: '#6ee7b7' }}>{d.season}</span>
                  </div>
                  <p style={{ fontSize: '14px', marginBottom: '4px' }}><span style={{ color: '#fca5a5' }}>Belirtiler:</span> {d.symptoms}</p>
                  <p style={{ fontSize: '14px' }}><span style={{ color: '#86efac' }}>Tedavi:</span> {d.treatment}</p>
                </div>
              ))}
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fb923c', marginBottom: '16px' }}>Kayitlar ({diseases.length})</h3>
              {diseases.length === 0 ? <p style={{ color: '#6ee7b7', textAlign: 'center', padding: '20px' }}>Henuz kayit yok</p> : (
                <div>
                  {diseases.map(d => (
                    <div key={d.id} style={{ padding: '12px', background: 'rgba(234, 88, 12, 0.15)', borderRadius: '8px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold' }}>{d.name}</span>
                        <span style={{ fontSize: '12px', color: '#fb923c' }}>{d.date}</span>
                      </div>
                      <p style={{ fontSize: '14px', marginTop: '8px' }}>{d.notes}</p>
                      {d.treatment && <p style={{ fontSize: '14px', color: '#86efac', marginTop: '4px' }}>Tedavi: {d.treatment}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FERTILIZER */}
        {activeTab === 'fertilizer' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6ee7b7' }}>🌱 Gubre Yonetimi</h2>
            
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Toprak Analizi ({soil.analysis_date})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(22, 163, 74, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: '#6ee7b7' }}>pH</p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{soil.ph}</p>
                  <p style={{ fontSize: '11px', color: '#86efac' }}>✓ ideal</p>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(234, 88, 12, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: '#6ee7b7' }}>Organik Madde</p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{soil.organic_matter}%</p>
                  <p style={{ fontSize: '11px', color: '#fb923c' }}>⚠ dusuk</p>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(22, 163, 74, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: '#6ee7b7' }}>Fosfor</p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{soil.phosphorus}</p>
                  <p style={{ fontSize: '11px', color: '#86efac' }}>✓ yuksek</p>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(234, 88, 12, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: '#6ee7b7' }}>Potasyum</p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{soil.potassium}</p>
                  <p style={{ fontSize: '11px', color: '#fb923c' }}>⚠ cok yuksek</p>
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Gubre Programi</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Donem</th>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Gubre</th>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Miktar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <td style={{ padding: '12px' }}>Mart (Taban)</td>
                      <td style={{ padding: '12px' }}>20-20-0 + Zn</td>
                      <td style={{ padding: '12px' }}>15 kg/da</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <td style={{ padding: '12px' }}>Mayis (Ust)</td>
                      <td style={{ padding: '12px' }}>Amonyum Nitrat %26</td>
                      <td style={{ padding: '12px' }}>15 kg/da</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <td style={{ padding: '12px' }}>Haziran (Ust)</td>
                      <td style={{ padding: '12px' }}>Amonyum Nitrat %26</td>
                      <td style={{ padding: '12px' }}>15 kg/da</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px' }}>Ekim (Organik)</td>
                      <td style={{ padding: '12px' }}>Ahir Gubresi</td>
                      <td style={{ padding: '12px' }}>2-3 ton/da</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* NOTES */}
        {activeTab === 'notes' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6ee7b7' }}>📝 Notlar ({notes.length})</h2>
              <button onClick={() => setShowNoteModal(true)} style={{ ...buttonStyle, padding: '8px 16px', fontSize: '14px' }}>+ Not Ekle</button>
            </div>
            {notes.length === 0 ? (
              <div style={{ ...cardStyle, textAlign: 'center', padding: '40px' }}>
                <span style={{ fontSize: '48px' }}>📝</span>
                <p style={{ color: '#6ee7b7', marginTop: '16px' }}>Henuz not yok</p>
              </div>
            ) : (
              <div>
                {notes.map(n => (
                  <div key={n.id} style={{ ...cardStyle, background: 'rgba(147, 51, 234, 0.15)', border: '1px solid rgba(147, 51, 234, 0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#c4b5fd' }}>{n.date}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '12px', background: 'rgba(147, 51, 234, 0.3)', padding: '4px 8px', borderRadius: '12px', color: '#e9d5ff' }}>{yearlyPlan[n.month]?.name || 'Genel'}</span>
                        <button onClick={() => deleteItem('notes', n.id, setNotes, notes)} style={{ background: 'none', border: 'none', color: '#c4b5fd', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                      </div>
                    </div>
                    <p>{n.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6ee7b7' }}>⚙️ Ayarlar</h2>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Bahce Bilgileri</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Parsel No', farm.parsel],
                  ['Konum', farm.location],
                  ['Alan', farm.area],
                  ['Agac Sayisi', farm.trees],
                  ['Agac Yasi', farm.tree_age],
                  ['Tarim Tipi', farm.farm_type]
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
                    <span style={{ color: '#6ee7b7' }}>{label}</span>
                    <span style={{ fontWeight: '500' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>👥 Kullanicilar</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
                <div>
                  <p style={{ fontWeight: '500' }}>Siz (Sahip)</p>
                  <p style={{ fontSize: '12px', color: '#6ee7b7' }}>Tam yetki</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
                <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>B</div>
                <div>
                  <p style={{ fontWeight: '500' }}>Baba (Ortak)</p>
                  <p style={{ fontSize: '12px', color: '#6ee7b7' }}>Ayni linki paylasin</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      {showNoteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#065f46', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>Not Ekle</h3>
              <button onClick={() => setShowNoteModal(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); addNote({ date: fd.get('date'), text: fd.get('text') }); }} style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Tarih</label>
              <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} required />
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Not</label>
              <textarea name="text" rows={4} placeholder="Notunuzu yazin..." style={inputStyle} required />
              <button type="submit" disabled={saving} style={{ ...buttonStyle, width: '100%' }}>{saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            </form>
          </div>
        </div>
      )}

      {showExpenseModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#065f46', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>Gider Ekle</h3>
              <button onClick={() => setShowExpenseModal(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); addExpense({ date: fd.get('date'), category: fd.get('category'), description: fd.get('description'), amount: parseFloat(fd.get('amount')) }); }} style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Tarih</label>
              <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} required />
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Kategori</label>
              <select name="category" style={inputStyle} required>
                <option value="Gubre">Gubre</option>
                <option value="Ilaclama">Ilaclama</option>
                <option value="Iscilik">Iscilik</option>
                <option value="Sulama">Sulama</option>
                <option value="Ekipman">Ekipman</option>
                <option value="Diger">Diger</option>
              </select>
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Aciklama</label>
              <input type="text" name="description" placeholder="Ne icin?" style={inputStyle} required />
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Tutar (TL)</label>
              <input type="number" name="amount" placeholder="0" style={inputStyle} required />
              <button type="submit" disabled={saving} style={{ ...buttonStyle, width: '100%', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>{saving ? 'Kaydediliyor...' : 'Gider Kaydet'}</button>
            </form>
          </div>
        </div>
      )}

      {showIncomeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#065f46', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>Gelir Ekle</h3>
              <button onClick={() => setShowIncomeModal(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); addIncome({ date: fd.get('date'), category: fd.get('category'), description: fd.get('description'), amount: parseFloat(fd.get('amount')) }); }} style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Tarih</label>
              <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} required />
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Kategori</label>
              <select name="category" style={inputStyle} required>
                <option value="Hasat Satisi">Hasat Satisi</option>
                <option value="Destek/Hibe">Destek/Hibe</option>
                <option value="Diger">Diger</option>
              </select>
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Aciklama</label>
              <input type="text" name="description" placeholder="Gelir kaynagi?" style={inputStyle} required />
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Tutar (TL)</label>
              <input type="number" name="amount" placeholder="0" style={inputStyle} required />
              <button type="submit" disabled={saving} style={{ ...buttonStyle, width: '100%' }}>{saving ? 'Kaydediliyor...' : 'Gelir Kaydet'}</button>
            </form>
          </div>
        </div>
      )}

      {showDiseaseModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#065f46', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>Hastalik Kaydet</h3>
              <button onClick={() => setShowDiseaseModal(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); addDisease({ date: fd.get('date'), name: fd.get('name'), notes: fd.get('notes'), treatment: fd.get('treatment') }); }} style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Tarih</label>
              <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} required />
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Hastalik/Zararli</label>
              <select name="name" style={inputStyle} required>
                {diseaseDatabase.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                <option value="Diger">Diger</option>
              </select>
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Gozlemler</label>
              <textarea name="notes" rows={3} placeholder="Ne gordunuz?" style={inputStyle} required />
              <label style={{ display: 'block', fontSize: '14px', color: '#6ee7b7', marginBottom: '8px' }}>Tedavi (varsa)</label>
              <input type="text" name="treatment" placeholder="Hangi ilac?" style={inputStyle} />
              <button type="submit" disabled={saving} style={{ ...buttonStyle, width: '100%', background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' }}>{saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
