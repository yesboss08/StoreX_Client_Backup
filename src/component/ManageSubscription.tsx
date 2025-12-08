// import React from "react"; // Unused import


type Invoice = { id: string; date: string; amount: number };

type DemoData = {
  planName: string;
  price: number;
  billingPeriod: string;
  nextBilling: string;
  daysRemaining: number;
  storageUsedPercent: number; // 0-100
  storageTotal: string;
  bandwidth: string;
  devices: number;
  paymentBrand: string;
  paymentLast4: string;
  paymentExpiry: string;
  invoices: Invoice[];
};

const demo: DemoData = {
  planName: "PREMIUM CLOUD 5TB",
  price: 9.99,
  billingPeriod: "$9.99 / MONTH",
  nextBilling: "October 26, 2023",
  daysRemaining: 25,
  storageUsedPercent: 90,
  storageTotal: "5 TB",
  bandwidth: "UNLIMITED",
  devices: 5,
  paymentBrand: "VISA",
  paymentLast4: "1234",
  paymentExpiry: "1/25",
  invoices: [
    { id: "#12345", date: "September 26, 2023", amount: 9.99 },
    { id: "#12344", date: "August 26, 2023", amount: 9.99 },
    { id: "#12343", date: "July 26, 2023", amount: 9.99 },
  ],
};

export default function ManageSubscription() {
  const d = demo;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            {/* subtle cloud icon — removed any branding */}
            <svg
              className="w-10 h-10 text-gray-100/90"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 17.58A4.42 4.42 0 0 0 15.58 13H15a4 4 0 0 0-7.9 0 3.5 3.5 0 0 0 .1 6.999H20z"
                stroke="currentColor"
                strokeWidth={0.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.95}
              />
            </svg>
            <h1 className="text-3xl md:text-4xl font-semibold">Manage Subscription</h1>
          </div>
        </header>

        {/* Top hero card + small profile circle on the right */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <div className="rounded-xl p-6 bg-gradient-to-b from-neutral-800/60 to-neutral-900/40 ring-2 ring-blue-400/20 shadow-[0_10px_40px_rgba(10,90,255,0.06)]">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-xs text-gray-300 mb-1">YOUR CURRENT PLAN</div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-blue-300 tracking-tight">
                      {d.planName}
                    </h2>

                    <div className="flex items-baseline gap-3 mt-3">
                      <div className="text-lg font-medium">${d.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-400">/ MONTH</div>
                      <div className="ml-4 text-sm text-gray-400">
                        NEXT BILLING DATE: <span className="text-green-400">{d.nextBilling}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {/* progress */}
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          style={{ width: `${d.storageUsedPercent}%` }}
                          className="h-2 rounded-full bg-green-400"
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-2">{d.daysRemaining} Days Remaining</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {/* cloud icon large */}
                    <div className="w-12 h-12 rounded-full bg-neutral-800/40 flex items-center justify-center ring-1 ring-white/6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.2}
                          d="M3 15a4 4 0 014-4h1.26A6 6 0 1120 13.96"
                        />
                      </svg>
                    </div>

                    <div className="text-sm text-gray-400">Usage</div>
                  </div>
                </div>
              </div>
            </div>

            {/* profile bubble — hidden on small screens */}
            <div className="lg:col-span-4 hidden lg:flex justify-end items-start">
              <div className="w-14 h-14 rounded-full bg-neutral-800/40 flex items-center justify-center ring-1 ring-white/6">
                <span className="sr-only">profile</span>
                <svg className="w-7 h-7 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth={1.2} />
                  <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth={1.2} />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column card (Plan Details) */}
          <div className="rounded-xl p-6 bg-neutral-800/50 border border-white/4">
            <h3 className="font-semibold mb-4">PLAN DETAILS</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">STORAGE</div>
                  <div className="font-medium">{d.storageTotal} ({d.storageUsedPercent}% USED)</div>
                </div>
                <div className="text-amber-500 text-xl">●</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">BANDWIDTH</div>
                <div className="font-medium">{d.bandwidth}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">DEVICES</div>
                <div className="font-medium">UP TO {d.devices}</div>
              </div>

              <div className="mt-4">
                <button className="px-6 py-2 rounded-md bg-blue-400 text-neutral-900 font-semibold shadow-md hover:scale-[1.01] transition">
                  UPGRADE PLAN
                </button>
              </div>
            </div>
          </div>

          {/* Right column card (Billing History) */}
          <div className="rounded-xl p-6 bg-neutral-800/50 border border-white/4">
            <h3 className="font-semibold mb-4">BILLING HISTORY</h3>
            <div className="space-y-3">
              {d.invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between bg-neutral-900/20 p-3 rounded-md">
                  <div className="text-sm">
                    <div className="font-medium">INVOICE {inv.id}</div>
                    <div className="text-xs text-gray-400">{inv.date} - ${inv.amount.toFixed(2)}</div>
                  </div>
                  <button className="px-3 py-1 border border-white/10 rounded-md text-sm">View Invoice</button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl p-6 bg-neutral-800/50 border border-white/4">
            <h3 className="font-semibold mb-4">PAYMENT METHOD</h3>
            <div className="text-sm text-gray-300 space-y-4">
              <div className="flex items-center gap-4">
                <div className="px-3 py-2 bg-neutral-900/30 rounded-md">{d.paymentBrand}</div>
                <div>
                  <div className="text-xs text-gray-400">{d.paymentBrand} ENDING IN ***** {d.paymentLast4}</div>
                  <div className="text-xs text-gray-400">EXPIRES {d.paymentExpiry}</div>
                </div>
              </div>

              <div>
                <button className="px-4 py-2 rounded-md text-sm text-blue-300 font-medium">UPDATE PAYMENT METHOD</button>
              </div>

              <div>
                <button className="text-xs text-gray-400">DOWNLOAD ALL INVOICES</button>
              </div>
            </div>
          </div>

          {/* Subscription Options */}
          <div className="rounded-xl p-6 bg-neutral-800/50 border border-white/4">
            <h3 className="font-semibold mb-4">SUBSCRIPTION OPTIONS</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 rounded-md bg-gradient-to-b from-blue-400 to-blue-500 text-neutral-900 font-semibold shadow-[0_6px_18px_rgba(59,130,246,0.18)]">
                CHANGE PLAN
              </button>

              <button className="w-full py-3 rounded-md bg-gradient-to-b from-orange-400 to-orange-500 text-neutral-900 font-semibold shadow-[0_6px_18px_rgba(249,115,22,0.14)]">
                PAUSE SUBSCRIPTION
              </button>

              <button className="w-full py-3 rounded-md bg-gradient-to-b from-red-500 to-red-600 text-white font-semibold shadow-md">
                CANCEL SUBSCRIPTION
              </button>
            </div>
          </div>
        </div>

        {/* Footer small note */}
        <div className="mt-8 text-xs text-gray-500 text-center">Demo data — replace with your API response when ready.</div>
      </div>
    </div>
  );
}
