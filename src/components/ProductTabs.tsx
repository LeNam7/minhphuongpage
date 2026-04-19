"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("seafood");

  const tabs = [
    { id: "seafood", label: "Shrimp & Seafood" },
    { id: "frozen", label: "Frozen Fruits" },
    { id: "fresh", label: "Fresh & Dried Fruits" },
    { id: "coffee", label: "Golden Robusta Coffee" },
  ];

  return (
    <div className="w-full mt-12">
      <div className="flex flex-row overflow-x-auto snap-x md:justify-center gap-2 md:gap-4 mb-10 border-b border-slate-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`snap-start whitespace-nowrap px-4 md:px-6 py-4 text-base md:text-lg font-heading font-semibold transition-colors border-b-4 ${
              activeTab === tab.id
                ? "text-forest border-forest"
                : "text-slate-500 border-transparent hover:text-forest"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-ice-gray rounded-xl overflow-hidden shadow-sm">
        {activeTab === "seafood" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/shrimp.png" alt="Premium Frozen Shrimp" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">Seafood Mastery</h3>
              <p className="text-slate-600 mb-6">Cung cấp đầy đủ các dòng tôm nguyên liệu đến chế biến sâu tỉ mỉ.</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Sơ chế:</strong>&nbsp;Tôm tươi nguyên liệu, Nobashi, Butterfly, Easy-peel.</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Chế biến:</strong>&nbsp;Tôm chín, Sushi Ebi, Tôm vòng tròn.</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>GTGT:</strong>&nbsp;Tôm Tempura, Popcorn, Ebi Fry, Cuộn Filo, Chả tôm.</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Hương vị:</strong>&nbsp;Tôm tẩm ướp (Tỏi, BBQ, Cam, Ngò tây, Ớt ngọt).</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === "frozen" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/frozen_fruits.png" alt="IQF Frozen Tropical Fruits" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">BQF / IQF Frozen Fruits</h3>
              <p className="text-slate-600 mb-6">Bảo lưu hoàn hảo phẩm chất với dây chuyền cấp đông nhanh hiện đại.</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Xoài:</strong>&nbsp;Cấp đông nguyên miếng, Xoài dice hạt lựu 20x20.</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Nhiệt đới:</strong>&nbsp;Thơm (Dứa), Chanh dây, Mít, Khoai môn, Đu đủ.</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Khác:</strong>&nbsp;Bắp nếp cấp đông, Sả cây.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "fresh" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/fresh_fruits.png" alt="Fresh Orchards Produce" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">Fresh & Dried Selections</h3>
              <p className="text-slate-600 mb-6">Tuyển chọn khắt khe trái cây chuẩn quốc tế tại vùng nguyên liệu trải dài các tỉnh.</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Trái Cây Tươi Cao Cấp:</strong>&nbsp;Xoài R2E2, Dứa MD2, Mít Thái, Thanh Long ruột đỏ, Chanh dây...</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Trái Cây Sấy:</strong>&nbsp;Sấy khô & Sấy dẻo tiêu chuẩn Âu - Mỹ, lưu giữ độ dẻo và dưỡng chất hoàn hảo.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "coffee" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/coffee.png" alt="Golden Robusta Coffee Beans" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">Golden Robusta Export</h3>
              <p className="text-slate-600 mb-6">Kiệt tác cà phê cao nguyên B'Lao độ cao 1.000m. Hương vị đậm đà, đóng gói xuất khẩu ưu việt.</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Green Bean (Clean):</strong>&nbsp;Kích cỡ 13, 16, 18, 20. Độ ẩm thấp.</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Green Bean (Wet):</strong>&nbsp;Dòng chế biến ướt cao cấp, tạp chất siêu thấp.</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>Pea Berry (Culi):</strong>&nbsp;Hạt tròn đặc biệt, định vị cao cấp.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      

    </div>
  );
}
