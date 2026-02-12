import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const [editDialog, setEditDialog] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setProfile({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
    });
    setEditDialog(false);
    toast.success('Profile Updated', {
      description: 'Your profile has been updated successfully.',
    });
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#1B4B8C] to-[#2a5fa8] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-3">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-gray-600">Business Owner</p>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-medium text-gray-900">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <Mail className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <Phone className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">{profile.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{profile.location}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setEditDialog(true)}
          className="w-full mt-6 bg-[#1B4B8C] text-white py-3 rounded-xl font-semibold hover:bg-[#163a6f] transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={profile.name}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={profile.email}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={profile.phone}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={profile.location}
                required
                className="mt-1"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}