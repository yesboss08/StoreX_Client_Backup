import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';

interface UserInfo {
  name: string;
  email: string;
  emailVarified: boolean;
  role: "user" | "admin" | "owner" | "manager";
  isSubscribed: boolean;
}

interface UserMenuProps {
  userInfo: UserInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  userInfo,
  isOpen,
  onLogout,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-5 rounded-xl shadow-xl w-72 flex flex-col gap-4 z-50">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{userInfo?.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
      </div>

      <Button
        variant={userInfo?.emailVarified ? "success" : "danger"}
        size="sm"
        className="w-full"
        onClick={() =>
          userInfo?.emailVarified ? null : navigate("/varifyEmali")
        }
      >
        {userInfo?.emailVarified ? "Email Verified" : "Verify Email"}
      </Button>

      {(userInfo?.role === "owner" || userInfo?.role === "admin") && (
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => navigate("/adminPage")}
        >
          Go to Admin Page
        </Button>
      )}

      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={() => navigate("/profile")}
      >
        Go to Profile
      </Button>

      <Button
        variant="danger"
        size="sm"
        className="w-full"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
};