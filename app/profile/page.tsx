'use client';

import Link from "next/link";
import ArrowLeft from "lucide-react/ArrowLeft"; // Import ArrowLeft

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, Mail, Phone, MapPin, BookOpen, Award, 
  Briefcase, Users, Edit2, Save, X, Calendar, 
  Shield, Building, Clock, CheckCircle, AlertCircle,
  FileText, CreditCard, DollarSign, CalendarCheck, Download, Eye,
  IndianRupee, Wallet
} from 'lucide-react';

interface TeacherProfile {
  // Basic Info (from teachers_master)
  fullName: string;
  teacherCode: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  employmentType: string;
  joiningDate: string;
  bloodGroup: string;
  spouseName?: string;
  
  // Contact (from teacher_contact_information)
  email: string;
  mobile: string;
  alternateMobile?: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  
  // Address (from teacher_addresses)
  currentAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  permanentAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  
  // Professional (from school_teacher_roles)
  assignedClasses: Array<{
    className: string;
    section?: string;
    role: string;
    subjects: string[];
  }>;
  
  // Qualifications (from teacher_qualification_details)
  qualifications: Array<{
    qualification: string;
    specialization: string;
    instituteName: string;
    passingYear: string;
    fileUrl?: string;
  }>;
  
  // Experience (from teacher_experience)
  experience: Array<{
    organizationName: string;
    role: string;
    fromDate: string;
    toDate?: string;
    isCurrent: boolean;
  }>;
  
  // Emergency Contact (from teacher_emergency_contacts)
  emergencyContact: {
    name: string;
    relation: string;
    mobile: string;
  };
  
  // Identity Documents (from teacher_identity_documents)
  documents: Array<{
    documentType: 'pan_card' | 'address_card' | 'photo';
    documentNumber: string;
    maskedNumber: string;
    verificationStatus: 'pending' | 'approved' | 'rejected';
    fileUrl: string;
    rejectionReason?: string;
  }>;
  
  // Bank Details (from teacher_bank_details)
  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    maskedAccountNumber: string;
    ifscCode: string;
    upiId?: string;
    isPrimary: boolean;
  };
  
  // Salary Structure (from teacher_salary_structure)
  salaryStructure: {
    salaryType: string;
    payFrequency: string;
    basicSalary: number;
    hra: number;
    da: number;
    conveyanceAllowance: number;
    medicalAllowance: number;
    grossSalary: number;
    pfApplicable: boolean;
    pfPercentage?: number;
    tdsApplicable: boolean;
    tdsPercentage?: number;
    netSalary: number;
    effectiveFrom: string;
    status: string;
  };
  
  // Recent Salary Transactions (from teacher_salary_transactions)
  salaryTransactions: Array<{
    amount: number;
    paymentMonth: string;
    paymentDate: string;
    paymentMode: string;
    referenceId: string;
    status: 'pending' | 'paid' | 'failed';
  }>;
  
  // Attendance Records (from teacher_attendance)
  attendanceRecords: Array<{
    date: string;
    status: 'present' | 'absent' | 'half_day' | 'leave';
    checkInTime?: string;
    checkOutTime?: string;
    remarks?: string;
  }>;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Partial<TeacherProfile>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    const teacherData = localStorage.getItem('teacher');
    if (!teacherData) {
      router.push('/login');
      return;
    }

    // Mock profile data based on schema - In production, fetch from API
    const mockProfile: TeacherProfile = {
      fullName: 'Mr. Rajesh Kumar Sharma',
      teacherCode: 'VK-2024-001',
      gender: 'male',
      dateOfBirth: '1985-06-15',
      maritalStatus: 'married',
      employmentType: 'full_time',
      joiningDate: '2018-07-01',
      bloodGroup: 'O+',
      spouseName: 'Mrs. Priya Sharma',
      
      email: 'rajesh.kumar@brightfuture.com',
      mobile: '9876543210',
      alternateMobile: '9123456789',
      emailVerified: true,
      mobileVerified: true,
      
      currentAddress: {
        address: '123, Green Park Society, Andheri West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400058'
      },
      permanentAddress: {
        address: '456, Old Town Road, Shivaji Nagar',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411005'
      },
      
      assignedClasses: [
        {
          className: 'Class 10',
          section: 'A',
          role: 'class_teacher',
          subjects: ['Mathematics', 'Physics']
        },
        {
          className: 'Class 10',
          section: 'B',
          role: 'subject_teacher',
          subjects: ['Mathematics']
        },
        {
          className: 'Class 12',
          section: 'A',
          role: 'subject_teacher',
          subjects: ['Advanced Mathematics']
        }
      ],
      
      qualifications: [
        {
          qualification: 'M.Sc. Mathematics',
          specialization: 'Pure Mathematics',
          instituteName: 'University of Mumbai',
          passingYear: '2008'
        },
        {
          qualification: 'B.Ed.',
          specialization: 'Secondary Education',
          instituteName: 'SNDT Women\'s University',
          passingYear: '2010'
        }
      ],
      
      experience: [
        {
          organizationName: 'St. Xavier\'s High School',
          role: 'Mathematics Teacher',
          fromDate: '2010-07-01',
          toDate: '2018-06-30',
          isCurrent: false
        },
        {
          organizationName: 'Bright Future School',
          role: 'Senior Mathematics Teacher',
          fromDate: '2018-07-01',
          isCurrent: true
        }
      ],
      
      emergencyContact: {
        name: 'Mrs. Priya Sharma',
        relation: 'Spouse',
        mobile: '9988776655'
      },
      
      // Documents
      documents: [
        {
          documentType: 'pan_card',
          documentNumber: 'ABCDE1234F',
          maskedNumber: 'XXXXX1234F',
          verificationStatus: 'approved',
          fileUrl: '/documents/pan-card.pdf'
        },
        {
          documentType: 'address_card',
          documentNumber: '1234-5678-9012',
          maskedNumber: 'XXXX-XXXX-9012',
          verificationStatus: 'approved',
          fileUrl: '/documents/aadhar-card.pdf'
        },
        {
          documentType: 'photo',
          documentNumber: 'PHOTO-001',
          maskedNumber: 'PHOTO-001',
          verificationStatus: 'approved',
          fileUrl: '/documents/photo.jpg'
        }
      ],
      
      // Bank Details
      bankDetails: {
        accountHolderName: 'Rajesh Kumar Sharma',
        bankName: 'State Bank of India',
        accountNumber: '12345678901234',
        maskedAccountNumber: 'XXXXXX1234',
        ifscCode: 'SBIN0001234',
        upiId: 'rajesh@sbi',
        isPrimary: true
      },
      
      // Salary Structure
      salaryStructure: {
        salaryType: 'fixed_monthly',
        payFrequency: 'monthly',
        basicSalary: 35000,
        hra: 14000,
        da: 7000,
        conveyanceAllowance: 2000,
        medicalAllowance: 2000,
        grossSalary: 60000,
        pfApplicable: true,
        pfPercentage: 12,
        tdsApplicable: true,
        tdsPercentage: 10,
        netSalary: 47200,
        effectiveFrom: '2024-04-01',
        status: 'active'
      },
      
      // Salary Transactions
      salaryTransactions: [
        {
          amount: 47200,
          paymentMonth: '2024-01',
          paymentDate: '2024-02-01',
          paymentMode: 'bank_transfer',
          referenceId: 'SAL-2024-01-001',
          status: 'paid'
        },
        {
          amount: 47200,
          paymentMonth: '2023-12',
          paymentDate: '2024-01-01',
          paymentMode: 'bank_transfer',
          referenceId: 'SAL-2023-12-001',
          status: 'paid'
        },
        {
          amount: 47200,
          paymentMonth: '2023-11',
          paymentDate: '2023-12-01',
          paymentMode: 'bank_transfer',
          referenceId: 'SAL-2023-11-001',
          status: 'paid'
        }
      ],
      
      // Attendance Records
      attendanceRecords: [
        {
          date: '2024-02-15',
          status: 'present',
          checkInTime: '08:15 AM',
          checkOutTime: '03:45 PM'
        },
        {
          date: '2024-02-14',
          status: 'present',
          checkInTime: '08:10 AM',
          checkOutTime: '03:30 PM'
        },
        {
          date: '2024-02-13',
          status: 'leave',
          remarks: 'Casual Leave'
        },
        {
          date: '2024-02-12',
          status: 'present',
          checkInTime: '08:20 AM',
          checkOutTime: '03:35 PM'
        },
        {
          date: '2024-02-09',
          status: 'half_day',
          checkInTime: '08:15 AM',
          checkOutTime: '12:30 PM',
          remarks: 'Personal work'
        }
      ]
    };

    setProfile(mockProfile);
    setIsLoading(false);
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({});
    setSaveStatus('idle');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update profile with edited fields
    if (profile && Object.keys(editedProfile).length > 0) {
      const updatedProfile = { ...profile };
      
      // Update top-level fields
      Object.keys(editedProfile).forEach(key => {
        if (key !== 'currentAddress' && key !== 'emergencyContact') {
          updatedProfile[key as keyof TeacherProfile] = editedProfile[key as keyof TeacherProfile] as any;
        }
      });
      
      // Update nested objects
      if (editedProfile.currentAddress) {
        updatedProfile.currentAddress = { ...profile.currentAddress, ...editedProfile.currentAddress };
      }
      if (editedProfile.emergencyContact) {
        updatedProfile.emergencyContact = { ...profile.emergencyContact, ...editedProfile.emergencyContact };
      }
      
      setProfile(updatedProfile);
      setSaveStatus('success');
      
      setTimeout(() => {
        setIsEditing(false);
        setEditedProfile({});
        setSaveStatus('idle');
      }, 1500);
    }
  };

  const updateField = (field: keyof TeacherProfile, value: any) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: 'currentAddress' | 'emergencyContact', field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || profile?.[parent]),
        [field]: value
      }
    }));
  };

  const getDisplayValue = (field: keyof TeacherProfile) => {
    return editedProfile[field] !== undefined ? editedProfile[field] : profile?.[field];
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#E5E7EB] border-t-[#1897C6] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#535359] font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const teacher = profile || {}; // Declare teacher variable

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
      <Header />

      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
        {/* Page Header - Sticky */}
        <div className="sticky top-16 z-40 bg-[#F8F9FA] pb-4 mb-4 -mx-4 md:-mx-8 px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-1">My Profile</h1>
              <p className="text-sm text-[#6B7280]">View and manage your personal information</p>
            </div>
            
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white text-sm"
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-[#E5E7EB] bg-transparent text-sm"
                    disabled={saveStatus === 'saving'}
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white text-sm"
                    disabled={saveStatus === 'saving'}
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : saveStatus === 'success' ? (
                      <>
                        <CheckCircle size={16} className="mr-2" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Summary - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-36 space-y-6">
            {/* Profile Card */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1897C6] to-[#D87331] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {profile.fullName.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-[#535359] mb-1">{profile.fullName}</h2>
                <p className="text-sm text-[#6B7280] mb-1">{profile.teacherCode}</p>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#1897C6]/10 text-[#1897C6] rounded-full text-xs font-semibold mt-2">
                  <CheckCircle size={12} />
                  {profile.employmentType.replace('_', ' ').toUpperCase()}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Building size={16} className="text-[#6B7280]" />
                  <span className="text-[#535359]">Bright Future School</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-[#6B7280]" />
                  <span className="text-[#535359]">Joined {new Date(profile.joiningDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={16} className="text-[#6B7280]" />
                  <span className="text-[#535359]">Blood: {profile.bloodGroup}</span>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <h3 className="text-sm font-bold text-[#535359] mb-4 uppercase tracking-wide">Teaching Load</h3>
              <div className="space-y-4">
                {profile.assignedClasses.filter(c => c.role === 'class_teacher').length > 0 && (
                  <div className="pb-4 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-[#1897C6]" />
                      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Class Teacher</p>
                    </div>
                    <p className="text-2xl font-bold text-[#1897C6]">
                      {profile.assignedClasses.filter(c => c.role === 'class_teacher')[0].className} - {profile.assignedClasses.filter(c => c.role === 'class_teacher')[0].section}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-2xl font-bold text-[#1897C6]">{profile.assignedClasses.length}</p>
                  <p className="text-xs text-[#6B7280]">Total Classes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#F1AF37]">{new Set(profile.assignedClasses.flatMap(c => c.subjects)).size}</p>
                  <p className="text-xs text-[#6B7280]">Subjects Teaching</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#D87331]">{profile.qualifications.length}</p>
                  <p className="text-xs text-[#6B7280]">Qualifications</p>
                </div>
              </div>
            </Card>
            </div>
          </div>

          {/* Right Column - Detailed Information - Scrollable */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <User size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1 block">Full Name</label>
                  <p className="text-sm text-[#535359] font-medium">{profile.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1 block">Gender</label>
                  <p className="text-sm text-[#535359] font-medium capitalize">{profile.gender}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1 block">Date of Birth</label>
                  <p className="text-sm text-[#535359] font-medium">{new Date(profile.dateOfBirth).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1 block">Marital Status</label>
                  <p className="text-sm text-[#535359] font-medium capitalize">{profile.maritalStatus}</p>
                </div>
                {profile.spouseName && (
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1 block">Spouse Name</label>
                    <p className="text-sm text-[#535359] font-medium">{profile.spouseName}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Contact Information - Editable */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Phone size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Contact Information</h3>
                {!isEditing && (
                  <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                    <Edit2 size={12} />
                    Editable
                  </span>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Email Address</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={getDisplayValue('email') as string}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="h-10 border-[#E5E7EB]"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-[#6B7280]" />
                      <p className="text-sm text-[#535359] font-medium">{profile.email}</p>
                      {profile.emailVerified && <CheckCircle size={14} className="text-green-500" />}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Mobile Number</label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={getDisplayValue('mobile') as string}
                      onChange={(e) => updateField('mobile', e.target.value)}
                      className="h-10 border-[#E5E7EB]"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#6B7280]" />
                      <p className="text-sm text-[#535359] font-medium">{profile.mobile}</p>
                      {profile.mobileVerified && <CheckCircle size={14} className="text-green-500" />}
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Alternate Mobile</label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={getDisplayValue('alternateMobile') as string || ''}
                      onChange={(e) => updateField('alternateMobile', e.target.value)}
                      className="h-10 border-[#E5E7EB]"
                      placeholder="Optional"
                    />
                  ) : (
                    <p className="text-sm text-[#535359] font-medium">{profile.alternateMobile || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Address Information - Editable */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Address Information</h3>
                {!isEditing && (
                  <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                    <Edit2 size={12} />
                    Editable
                  </span>
                )}
              </div>
              
              <div className="space-y-6">
                {/* Current Address */}
                <div>
                  <h4 className="text-sm font-bold text-[#535359] mb-3">Current Address</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Street Address</label>
                      {isEditing ? (
                        <Input
                          value={(editedProfile.currentAddress?.address ?? profile.currentAddress.address)}
                          onChange={(e) => updateNestedField('currentAddress', 'address', e.target.value)}
                          className="h-10 border-[#E5E7EB]"
                        />
                      ) : (
                        <p className="text-sm text-[#535359]">{profile.currentAddress.address}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">City</label>
                      {isEditing ? (
                        <Input
                          value={(editedProfile.currentAddress?.city ?? profile.currentAddress.city)}
                          onChange={(e) => updateNestedField('currentAddress', 'city', e.target.value)}
                          className="h-10 border-[#E5E7EB]"
                        />
                      ) : (
                        <p className="text-sm text-[#535359]">{profile.currentAddress.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">State</label>
                      {isEditing ? (
                        <Input
                          value={(editedProfile.currentAddress?.state ?? profile.currentAddress.state)}
                          onChange={(e) => updateNestedField('currentAddress', 'state', e.target.value)}
                          className="h-10 border-[#E5E7EB]"
                        />
                      ) : (
                        <p className="text-sm text-[#535359]">{profile.currentAddress.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Pincode</label>
                      {isEditing ? (
                        <Input
                          value={(editedProfile.currentAddress?.pincode ?? profile.currentAddress.pincode)}
                          onChange={(e) => updateNestedField('currentAddress', 'pincode', e.target.value)}
                          className="h-10 border-[#E5E7EB]"
                        />
                      ) : (
                        <p className="text-sm text-[#535359]">{profile.currentAddress.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-6">
                  <h4 className="text-sm font-bold text-[#535359] mb-3">Permanent Address</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Street Address</label>
                      <p className="text-sm text-[#535359]">{profile.permanentAddress.address}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">City</label>
                      <p className="text-sm text-[#535359]">{profile.permanentAddress.city}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">State</label>
                      <p className="text-sm text-[#535359]">{profile.permanentAddress.state}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Pincode</label>
                      <p className="text-sm text-[#535359]">{profile.permanentAddress.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Class Teacher Assignment - Only if teacher is a class teacher */}
            {profile.assignedClasses.filter(c => c.role === 'class_teacher').length > 0 && (
              <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 bg-gradient-to-br from-[#1897C6]/5 to-white">
                <div className="flex items-center gap-2 mb-6">
                  <Users size={20} className="text-[#1897C6]" />
                  <h3 className="text-lg font-bold text-[#535359]">Class Teacher</h3>
                  <span className="ml-auto px-3 py-1 bg-[#1897C6] text-white rounded-full text-xs font-semibold">
                    Primary Role
                  </span>
                </div>
                
                <div className="space-y-4">
                  {profile.assignedClasses.filter(c => c.role === 'class_teacher').map((classInfo, index) => (
                    <div key={index} className="border-l-4 border-[#1897C6] bg-white rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-[#535359]">
                            {classInfo.className} {classInfo.section && `- Section ${classInfo.section}`}
                          </h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock size={14} className="text-[#6B7280]" />
                            <p className="text-sm text-[#6B7280]">08:00 AM - 02:30 PM</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Teaching Subjects</p>
                        <div className="flex flex-wrap gap-2">
                          {classInfo.subjects.map((subject, idx) => (
                            <span key={idx} className="px-3 py-1 bg-[#F1AF37]/10 text-[#D88931] rounded-full text-xs font-medium">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* All Teaching Assignments - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">All Teaching Assignments</h3>
                <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                  <Shield size={12} />
                  Managed by Admin
                </span>
              </div>
              
              <div className="space-y-4">
                {profile.assignedClasses.map((classInfo, index) => (
                  <div key={index} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#1897C6]/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-[#535359]">
                          {classInfo.className} {classInfo.section && `- Section ${classInfo.section}`}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            classInfo.role === 'class_teacher' 
                              ? 'bg-[#1897C6]/10 text-[#1897C6]' 
                              : 'bg-[#6B7280]/10 text-[#6B7280]'
                          }`}>
                            {classInfo.role.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-[#F1AF37]/10 text-[#D88931] rounded text-xs font-semibold">
                        {classInfo.subjects.length} {classInfo.subjects.length === 1 ? 'Subject' : 'Subjects'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {classInfo.subjects.map((subject, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#F8F9FA] text-[#535359] rounded-full text-xs font-medium border border-[#E5E7EB]">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Qualifications - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Educational Qualifications</h3>
                <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                  <Shield size={12} />
                  Managed by Admin
                </span>
              </div>
              
              <div className="space-y-4">
                {profile.qualifications.map((qual, index) => (
                  <div key={index} className="border-l-4 border-[#1897C6] pl-4 py-2">
                    <h4 className="font-bold text-[#535359]">{qual.qualification}</h4>
                    <p className="text-sm text-[#6B7280] mt-1">{qual.specialization}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#9CA3AF]">
                      <span>{qual.instituteName}</span>
                      <span>•</span>
                      <span>{qual.passingYear}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Experience - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Work Experience</h3>
                <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                  <Shield size={12} />
                  Managed by Admin
                </span>
              </div>
              
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-[#D87331] pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-[#535359]">{exp.role}</h4>
                        <p className="text-sm text-[#6B7280] mt-1">{exp.organizationName}</p>
                      </div>
                      {exp.isCurrent && (
                        <span className="px-2 py-1 bg-[#1897C6]/10 text-[#1897C6] rounded text-xs font-semibold">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#9CA3AF]">
                      <Clock size={12} />
                      <span>
                        {new Date(exp.fromDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} - {exp.isCurrent ? 'Present' : new Date(exp.toDate!).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Identity Documents - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Identity Documents</h3>
                <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                  <Shield size={12} />
                  Managed by Admin
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {profile.documents.map((doc, index) => (
                  <div key={index} className="border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#535359] text-sm capitalize mb-1">
                          {doc.documentType.replace('_', ' ')}
                        </h4>
                        <p className="text-xs text-[#6B7280] font-mono">{doc.maskedNumber}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        doc.verificationStatus === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : doc.verificationStatus === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {doc.verificationStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => window.open(doc.fileUrl, '_blank')}
                        variant="outline"
                        className="flex-1 h-8 text-xs bg-transparent border-[#E5E7EB]"
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => {}}
                        variant="outline"
                        className="flex-1 h-8 text-xs bg-transparent border-[#E5E7EB]"
                      >
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                    </div>
                    {doc.rejectionReason && (
                      <p className="text-xs text-red-600 mt-2">{doc.rejectionReason}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Bank Details - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Bank Account Details</h3>
                <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                  <Shield size={12} />
                  Managed by Admin
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Account Holder Name</label>
                  <p className="text-sm text-[#535359] font-medium">{profile.bankDetails.accountHolderName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Bank Name</label>
                  <p className="text-sm text-[#535359] font-medium">{profile.bankDetails.bankName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Account Number</label>
                  <p className="text-sm text-[#535359] font-mono">{profile.bankDetails.maskedAccountNumber}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">IFSC Code</label>
                  <p className="text-sm text-[#535359] font-mono">{profile.bankDetails.ifscCode}</p>
                </div>
                {profile.bankDetails.upiId && (
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">UPI ID</label>
                    <p className="text-sm text-[#535359] font-mono">{profile.bankDetails.upiId}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Salary Structure - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Wallet size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Salary Structure</h3>
                <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {profile.salaryStructure.status.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Salary Type</label>
                    <p className="text-sm text-[#535359] capitalize">{profile.salaryStructure.salaryType.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Pay Frequency</label>
                    <p className="text-sm text-[#535359] capitalize">{profile.salaryStructure.payFrequency}</p>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4">
                  <h4 className="text-sm font-bold text-[#535359] mb-3">Earnings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Basic Salary</span>
                      <span className="text-sm font-semibold text-[#535359]">₹{profile.salaryStructure.basicSalary.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">HRA</span>
                      <span className="text-sm font-semibold text-[#535359]">₹{profile.salaryStructure.hra.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">DA</span>
                      <span className="text-sm font-semibold text-[#535359]">₹{profile.salaryStructure.da.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Conveyance Allowance</span>
                      <span className="text-sm font-semibold text-[#535359]">₹{profile.salaryStructure.conveyanceAllowance.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Medical Allowance</span>
                      <span className="text-sm font-semibold text-[#535359]">₹{profile.salaryStructure.medicalAllowance.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#E5E7EB]">
                      <span className="text-sm font-bold text-[#535359]">Gross Salary</span>
                      <span className="text-sm font-bold text-[#1897C6]">₹{profile.salaryStructure.grossSalary.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4">
                  <h4 className="text-sm font-bold text-[#535359] mb-3">Deductions</h4>
                  <div className="space-y-2">
                    {profile.salaryStructure.pfApplicable && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6B7280]">PF ({profile.salaryStructure.pfPercentage}%)</span>
                        <span className="text-sm font-semibold text-red-600">- ₹{((profile.salaryStructure.basicSalary * (profile.salaryStructure.pfPercentage || 0)) / 100).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {profile.salaryStructure.tdsApplicable && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6B7280]">TDS ({profile.salaryStructure.tdsPercentage}%)</span>
                        <span className="text-sm font-semibold text-red-600">- ₹{((profile.salaryStructure.grossSalary * (profile.salaryStructure.tdsPercentage || 0)) / 100).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#1897C6]/5 border border-[#1897C6]/20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-[#535359]">Net Salary</span>
                    <span className="text-2xl font-bold text-[#1897C6]">₹{profile.salaryStructure.netSalary.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-2">Effective from: {new Date(profile.salaryStructure.effectiveFrom).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </Card>

            {/* Salary Transactions - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <IndianRupee size={20} className="text-[#1897C6]" />
                  <h3 className="text-lg font-bold text-[#535359]">Salary Transactions</h3>
                </div>
                <Link 
                  href="/salary-history"
                  className="text-sm font-semibold text-[#1897C6] hover:text-[#1897C6]/80 transition-colors flex items-center gap-1"
                >
                  View All
                  <span className="text-lg">→</span>
                </Link>
              </div>
              
              <div className="space-y-3">
                {profile.salaryTransactions.map((transaction, index) => (
                  <div key={index} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#1897C6]/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-[#535359]">₹{transaction.amount.toLocaleString('en-IN')}</p>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            transaction.status === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : transaction.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transaction.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B7280]">
                          {new Date(transaction.paymentMonth + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-[#6B7280]">Paid on: {new Date(transaction.paymentDate).toLocaleDateString('en-IN')}</p>
                        <p className="text-xs text-[#6B7280] capitalize">Mode: {transaction.paymentMode.replace('_', ' ')}</p>
                        <p className="text-xs text-[#6B7280] font-mono">Ref: {transaction.referenceId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Attendance Records - Read Only */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CalendarCheck size={20} className="text-[#1897C6]" />
                  <h3 className="text-lg font-bold text-[#535359]">Recent Attendance</h3>
                </div>
                <Link 
                  href="/my-attendance"
                  className="text-sm font-semibold text-[#1897C6] hover:text-[#1897C6]/80 transition-colors flex items-center gap-1"
                >
                  View All
                  <span className="text-lg">→</span>
                </Link>
              </div>
              
              <div className="space-y-2">
                {profile.attendanceRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg hover:border-[#1897C6]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-sm font-bold text-[#535359]">{new Date(record.date).getDate()}</p>
                        <p className="text-xs text-[#6B7280]">{new Date(record.date).toLocaleDateString('en-IN', { month: 'short' })}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            record.status === 'present' 
                              ? 'bg-green-100 text-green-700' 
                              : record.status === 'absent'
                              ? 'bg-red-100 text-red-700'
                              : record.status === 'half_day'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {record.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        {record.checkInTime && record.checkOutTime && (
                          <p className="text-xs text-[#6B7280]">
                            {record.checkInTime} - {record.checkOutTime}
                          </p>
                        )}
                        {record.remarks && (
                          <p className="text-xs text-[#6B7280]">{record.remarks}</p>
                        )}
                      </div>
                    </div>
                    <CheckCircle size={18} className={record.status === 'present' || record.status === 'half_day' ? 'text-green-500' : 'text-gray-300'} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Emergency Contact - Editable */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Emergency Contact</h3>
                {!isEditing && (
                  <span className="ml-auto text-xs text-[#6B7280] flex items-center gap-1">
                    <Edit2 size={12} />
                    Editable
                  </span>
                )}
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Contact Name</label>
                  {isEditing ? (
                    <Input
                      value={(editedProfile.emergencyContact?.name ?? profile.emergencyContact.name)}
                      onChange={(e) => updateNestedField('emergencyContact', 'name', e.target.value)}
                      className="h-10 border-[#E5E7EB]"
                    />
                  ) : (
                    <p className="text-sm text-[#535359] font-medium">{profile.emergencyContact.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Relation</label>
                  {isEditing ? (
                    <Input
                      value={(editedProfile.emergencyContact?.relation ?? profile.emergencyContact.relation)}
                      onChange={(e) => updateNestedField('emergencyContact', 'relation', e.target.value)}
                      className="h-10 border-[#E5E7EB]"
                    />
                  ) : (
                    <p className="text-sm text-[#535359] font-medium">{profile.emergencyContact.relation}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2 block">Mobile Number</label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={(editedProfile.emergencyContact?.mobile ?? profile.emergencyContact.mobile)}
                      onChange={(e) => updateNestedField('emergencyContact', 'mobile', e.target.value)}
                      className="h-10 border-[#E5E7EB]"
                    />
                  ) : (
                    <p className="text-sm text-[#535359] font-medium">{profile.emergencyContact.mobile}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer - Outside container */}
      <div className="border-t border-[#E5E7EB] bg-white mt-10">
        <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#6B7280]">
            Powered by <span className="font-semibold text-[#D87331]">Vidhya Kendra</span>
          </p>
          <p className="text-xs text-[#9CA3AF] mt-2 tracking-widest">LEARN &bull; GROW &bull; SUCCEED</p>
        </div>
      </div>
    </div>
  );
}
