import React, { useState } from 'react';
import './style.css';

export default function App() {
  // بيانات وهمية للاعب للتجربة قبل ربطها بالباك إند بالكامل
  const [player, setPlayer] = useState({
    username: "Omega_Hero",
    level: 5,
    balance: 15000,
    gems: 120,
    energy: 85,
    vip: "Bronze VIP"
  });

  // دالة وهمية لشراء صندوق وتجربة خصم الين
  const buyBox = (price) => {
    if (player.balance >= price) {
      setPlayer({ ...player, balance: player.balance - price });
      alert("تم شراء الصندوق بنجاح! انتقل للمخزن لفتحه 📦");
    } else {
      alert("رصيد الين الخاص بك غير كافٍ! ￥");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* شريط معلومات اللاعب العلوي (Header) */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid var(--omega-blue)', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ color: 'var(--omega-blue)' }}>ANIME OMEGA BANK</h1>
          <p style={{ color: 'var(--omega-gold)', fontWeight: 'bold' }}>{player.username} <span style={{ color: '#fff' }}>[LVL {player.level}]</span> - {player.vip}</p>
        </div>
        
        {/* العملات والطاقة */}
        <div style={{ display: 'flex', gap: '20px', fontSize: '18px', fontWeight: 'bold' }}>
          <div style={{ color: 'var(--omega-gold)' }}>￥ {player.balance.toLocaleString()}</div>
          <div style={{ color: '#ff45b3' }}>💎 {player.gems}</div>
          <div style={{ color: 'var(--omega-blue)' }}>⚡ {player.energy}/100</div>
        </div>
      </header>

      {/* القسم الرئيسي للعمليات البنكية */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '15px', color: 'var(--omega-purple)' }}>🏦 العمليات البنكية السريعة</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="omega-card" style={{ flex: 1 }}>
            <h3>تحويل أموال</h3>
            <p style={{ color: 'var(--text-gray)', margin: '10px 0' }}>قم بتحويل الين أو الجواهر لأصدقائك داخل عالم أوميغا.</p>
            <button className="btn-omega">ابدأ التحويل</button>
          </div>
          <div className="omega-card" style={{ flex: 1 }}>
            <h3>البطاقات البنكية</h3>
            <p style={{ color: 'var(--text-gray)', margin: '10px 0' }}>ترقية بطاقتك لزيادة حدود السحب اليومي والمكافآت.</p>
            <button className="btn-omega" style={{ borderborderColor: 'var(--omega-gold)' }}>استعراض البطاقات</button>
          </div>
        </div>
      </section>

      {/* المتجر المصغر لشراء الصناديق */}
      <section>
        <h2 style={{ marginBottom: '15px', color: 'var(--omega-purple)' }}>📦 المتجر السريع (الصناديق والمفاتيح)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          
          {/* كارت الصندوق الخشبي */}
          <div className="omega-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '50px' }}>📦</div>
            <h3 style={{ margin: '10px 0' }}>صندوق خشبي</h3>
            <p style={{ color: 'var(--omega-gold)', marginBottom: '15px', fontWeight: 'bold' }}>السعر: ￥500</p>
            <button className="btn-omega" onClick={() => buyBox(500)}>شراء الآن</button>
          </div>

          {/* كارت الصندوق الذهبي */}
          <div className="omega-card" style={{ textAlign: 'center', borderColor: 'var(--omega-gold)' }}>
            <div style={{ fontSize: '50px' }}>👑</div>
            <h3 style={{ margin: '10px 0', color: 'var(--omega-gold)' }}>صندوق ذهبي</h3>
            <p style={{ color: 'var(--omega-gold)', marginBottom: '15px', fontWeight: 'bold' }}>السعر: ￥5,000</p>
            <button className="btn-omega" onClick={() => buyBox(5000)}>شراء الآن</button>
          </div>

          {/* كارت صندوق أوميغا الأسطوري */}
          <div className="omega-card" style={{ textAlign: 'center', borderColor: 'var(--omega-purple)' }}>
            <div style={{ fontSize: '50px' }}>🌌</div>
            <h3 style={{ margin: '10px 0', color: 'var(--omega-blue)' }}>صندوق أوميغا</h3>
            <p style={{ color: 'var(--omega-gold)', marginBottom: '15px', fontWeight: 'bold' }}>السعر: 💎 50 جوهرة</p>
            <button className="btn-omega">شراء بالجواهر</button>
          </div>

        </div>
      </section>

    </div>
  );
}
