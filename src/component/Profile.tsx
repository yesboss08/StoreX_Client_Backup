import { useState } from 'react';


const Profile = () => {
  const [profile] = useState({
    name: "SANAT KUMAR",
    email: "sanat@example.com",
    connectedAccount: "GitHub",
    connectedEmail: "sanat@example.com",
  });

 

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center border-b border-gray-700 pb-4">⚙️ Profile Settings</h1>

        {/* Profile Info */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg space-y-6">
          <div className="flex items-center gap-6">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-violet-600"
            />
            <div className="flex-1 space-y-2">
              <button className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg" >
                Upload New Picture
              </button>
              <p className="text-sm text-gray-400">JPG, PNG, Max size 2MB</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
              type="text"
              placeholder="Full Name"
              value={profile.name}
              readOnly
            />
            <input
              className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
              type="email"
              placeholder="Email Address"
              value={profile.email}
              readOnly
            />
          </div>
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg w-max">
            Update Profile
          </button>
        </div>
        {/* Storage Info */}
<div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
  <div className="relative w-32 h-32">
    <svg className="transform -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#FFA500"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#8b5cf6"
        strokeWidth="10"
        strokeDasharray="282.6"
        strokeDashoffset={(1 - 5 / 16) * 282.6} 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold">
      <span className="text-white">5 GB</span>
      <span className="text-xs text-gray-400">of 16 GB</span>
    </div>
  </div>

  <div className="flex flex-col items-center md:items-start gap-2">
    <p className="text-white font-semibold text-center md:text-left">
      Storage Usage
    </p>
    <p className="text-sm text-gray-400 text-center md:text-left">
      You have used 5 GB of your 16 GB free plan.
    </p>
    <button className="mt-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg">
      Upgrade Storage
    </button>
  </div>
</div>


        {/* Connected Account */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-lg font-semibold">🔗 Connected Account</h2>
          <div className="bg-[#121212] p-4 rounded-lg border border-gray-700 flex justify-between items-center">
            <div>
              <p className="text-sm">{profile.connectedAccount}</p>
              <p className="text-xs text-gray-400">{profile.connectedEmail}</p>
            </div>
            <span className="text-green-500 text-xs font-semibold">Connected</span>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-lg font-semibold">🔒 Change Password</h2>
          <div className="space-y-3">
            <input className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2" type="password" placeholder="Current Password" />
            <input className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2" type="password" placeholder="New Password" />
            <input className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2" type="password" placeholder="Confirm New Password" />
          </div>
          <button className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg">
            Change Password
          </button>
        </div>

        {/* Logout Options */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-lg font-semibold">🚪 Logout Options</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-orange-600 hover:bg-orange-700 flex-1 px-4 py-2 rounded-lg">
              Logout (This Device)
            </button>
            <button className="bg-red-600 hover:bg-red-700 flex-1 px-4 py-2 rounded-lg">
              Logout All Devices
            </button>
          </div>
        </div>

        {/* Disable Account */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg space-y-2 border border-yellow-500">
          <h2 className="text-lg font-semibold text-yellow-400">⚠️ Disable My Account</h2>
          <p className="text-sm text-yellow-200">
            Disabling your account will hide your profile and stop all email notifications. You can enable it later.
          </p>
          <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg">
            Disable Account
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg space-y-2 border border-red-500">
          <h2 className="text-lg font-semibold text-red-400">🗑️ Delete My Account</h2>
          <p className="text-sm text-red-300">
            This action is <strong>permanent</strong> and will delete all your data including files and settings.
          </p>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
            Delete Account Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
