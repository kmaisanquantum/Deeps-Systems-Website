import React, { useState } from 'react';
import { UserPlus, Trash2, Shield, User } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  hourlyRate: string;
  status: 'active' | 'inactive';
  isAdmin?: boolean;
}

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'kmaisan@dspng.tech',
      role: 'ADMIN',
      hourlyRate: '',
      status: 'active',
      isAdmin: true,
    },
    {
      id: '2',
      name: 'Edward Sasingian',
      email: 'edward@dspng.tech',
      role: 'PARTNER',
      hourlyRate: 'K 450.00/hr',
      status: 'active',
    },
    {
      id: '3',
      name: 'Flora Sasingian',
      email: 'flora@dspng.tech',
      role: 'PARTNER',
      hourlyRate: 'K 450.00/hr',
      status: 'active',
    },
    {
      id: '4',
      name: 'Flora Sasingian',
      email: 'flora@dspng.tech',
      role: 'PARTNER',
      hourlyRate: 'K 450.00/hr',
      status: 'active',
    },
  ]);

  const handleDelete = (id: string) => {
    setStaff(prev => prev.filter(member => member.id !== id));
  };

  return (
    <section id="staff-hr" className="py-24 bg-[#FDFBF3]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="reveal-on-scroll">
            <h2 className="text-5xl md:text-6xl font-montserrat font-extrabold text-[#1A1A1A] mb-4 leading-tight">
              Staff <br /> / HR
            </h2>
            <p className="text-[#8E8E8E] text-xl max-w-xs leading-relaxed">
              Team members and access management
            </p>
          </div>

          <button className="flex items-center gap-3 bg-[#FFB800] border-2 border-[#1A1A1A] px-8 py-6 shadow-[4px_4px_0px_#1A1A1A] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
            <UserPlus className="w-5 h-5 text-[#1A1A1A]" />
            <span className="font-montserrat font-extrabold text-[#1A1A1A] tracking-wider text-sm">ADD STAFF</span>
          </button>
        </div>

        <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] overflow-hidden reveal-on-scroll">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#1A1A1A]/10">
                  <th className="px-6 py-6 text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest">Name Email</th>
                  <th className="px-6 py-6 text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest text-center">Role</th>
                  <th className="px-6 py-6 text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest text-center">Hourly Rate</th>
                  <th className="px-6 py-6 text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-6 text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y border-[#1A1A1A]/5">
                {staff.map((member) => (
                  <tr key={member.id} className="hover:bg-[#FDFBF3]/50 transition-colors">
                    <td className="px-6 py-8">
                      <div className="flex flex-col">
                        <span className="font-montserrat font-bold text-[#1A1A1A] text-lg">
                          {member.name}
                          {member.isAdmin && <span className="text-[#FFB800] ml-2 text-sm">(You)</span>}
                        </span>
                        <span className="text-[#8E8E8E] text-sm truncate max-w-[150px]">{member.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-8 text-center">
                      <div className={`inline-flex items-center px-4 py-2 border-2 border-[#1A1A1A] font-extrabold text-[10px] tracking-widest relative ${
                        member.isAdmin ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {member.role}
                        <div className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-teal-400 border-2 border-[#1A1A1A] rounded-full"></div>
                      </div>
                    </td>
                    <td className="px-6 py-8 text-center">
                      <span className="font-montserrat font-bold text-[#1A1A1A] text-lg">
                        {member.hourlyRate || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-8 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                        <span className="text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-8 text-right">
                      {!member.isAdmin && (
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-3 text-[#8E8E8E] hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffManagement;
