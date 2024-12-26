"use client";

const Header = () => {
  return (
    <header className="h-16 bg-white shadow-md">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        {/* 左端に配置するアイコンとロゴ */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <a href="/" className="text-gray-800">
              介護事業所検索 {/* ロゴ */}
            </a>
          </div>
        </div>

        {/* ナビゲーションメニュー */}
        <nav aria-label="Main Navigation">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-gray-700 hover:text-gray-900">
                ホーム
              </a>
            </li>
            <li>
              <a href="/view" className="text-gray-700 hover:text-gray-900">
                登録した施設
              </a>
            </li>
            <li>
              <a href="/map" className="text-gray-700 hover:text-gray-900">
                マップ
              </a>
            </li>
            <li>
              <a href="/list" className="text-gray-700 hover:text-gray-900">
                リスト
              </a>
            </li>
            <li>
              <a
                href="/add-facility"
                className="text-gray-700 hover:text-gray-900"
              >
                施設追加
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
