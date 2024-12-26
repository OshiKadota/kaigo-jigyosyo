"use client";

import React from "react";

const SideBar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <span className="text-2xl font-bold">メニュー</span>
      </div>
      <ul className="p-4 space-y-4">
        <li>
          <a href="/" className="hover:text-gray-400">
            ホーム
          </a>
        </li>
        <li>
          <a href="/view" className="hover:text-gray-400">
            登録した施設
          </a>
        </li>
        <li>
          <a href="/map" className="hover:text-gray-400">
            マップ
          </a>
        </li>
        <li>
          <a href="/list" className="hover:text-gray-400">
            リスト
          </a>
        </li>
        <li>
          <a href="/add-facility" className="hover:text-gray-400">
            施設追加
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
