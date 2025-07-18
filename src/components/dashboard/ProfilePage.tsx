import React, { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { User, Mail, Shield, Edit3, Save, X } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user in the store
      setUser({
        ...user,
        name: editedName
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedName(user?.name || "");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6">

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-blue-200/50 shadow-lg overflow-hidden">
        <div className="bg-blue-700/90 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-2xl font-bold text-gray-800 bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Your name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving || !editedName.trim()}
                      className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors duration-200 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Account Type</h3>
                  <p className="text-sm text-gray-600">Premium User</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50/50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Security</h3>
                  <p className="text-sm text-gray-600">All secure</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Status</h3>
                  <p className="text-sm text-gray-600">Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Member Since</span>
                <span className="text-gray-800">January 2024</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Last Login</span>
                <span className="text-gray-800">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;