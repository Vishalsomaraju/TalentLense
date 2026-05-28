import type React from "react";

export default function Dashboard(): React.JSX.Element {
  return (
    <div className="flex">
      {/* Sidebar will go here */}
      <main className="main-content flex-1 p-6 mt-12 ml-[200px]">
        <h1 className="text-xl">Analytical Dashboard</h1>
      </main>
    </div>
  );
}
