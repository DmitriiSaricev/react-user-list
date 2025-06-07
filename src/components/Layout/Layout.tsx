import React from "react";
import { Props } from "./Layout.types";

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-10 max-w-[1250px] mx-auto px-4">
      <div className="w-full max-w-4xl px-4 h-full">
        <header className="py-8">
          <h1 className="text-4xl font-bold text-center">User Directory</h1>
        </header>

        <main className="py-12">{children}</main>

        <footer className="text-center text-sm text-gray-400 py-6">
          © 2025 – React Test Project
        </footer>
      </div>
    </div>
  );
};

export default Layout;
