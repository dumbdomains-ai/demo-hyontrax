import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => (
  <div className="flex min-h-screen bg-app-bg">
    <Sidebar />
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden max-h-screen">
      <Topbar />
      <main className="flex-1 px-8 py-7 overflow-y-auto bg-app-bg">
        <div className="animate-fade">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
);

export default Layout;
