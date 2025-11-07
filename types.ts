
export interface Drug {
  id: string;
  name: string;
  type: 'ยาตามใบสั่งแพทย์' | 'ยาทั่วไป' | 'สมุนไพร';
  price: number;
  description: string;
}

export interface Prescription {
  id: string;
  date: Date;
  drugs: Drug[];
  doctor: string;
}

export interface Appointment {
  id: string;
  date: Date;
  department: string;
  doctor: string;
  reason: string;
  status: 'Completed' | 'Scheduled' | 'Cancelled';
}

export interface Payment {
  id:string;
  date: Date;
  amount: number;
  details: string;
  status: 'Paid' | 'Unpaid';
}

export interface LabResult {
  id: string;
  date: Date;
  testName: string;
  result: string;
  referenceRange: string;
}

export interface MedicalCertificate {
  id: string;
  date: Date;
  doctor: string;
  details: string;
}

export interface Patient {
  id: string;
  hn: string;
  name: string;
  nationalId: string;
  treatmentRights: 'สิทธิประกันสังคม' | 'สิทธิบัตรทอง (สปสช.)' | 'สิทธิข้าราชการ' | 'ชำระเงินเอง';
  appointments: Appointment[];
  prescriptions: Prescription[];
  payments: Payment[];
  labResults: LabResult[];
  medicalCertificates: MedicalCertificate[];
}

export interface QueueTicket {
    id: string;
    patientName: string;
    hn: string;
    queueNumber: string;
    department: string;
    room: string;
    timestamp: Date;
}
