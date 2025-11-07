import { Patient, Drug, Appointment, Prescription, Payment, LabResult, MedicalCertificate } from '../types';

const firstNames = ['จริงใจ', 'สมชาย', 'สมหญิง', 'ประเสริฐ', 'กนกวรรณ', 'อารี', 'วิชัย', 'มานี', 'ปิติ', 'ชูใจ'];
const lastNames = ['สบายดี', 'รักไทย', 'มุ่งมั่น', 'เจริญสุข', 'พัฒนา', 'ศรีเจริญ', 'ทองดี', 'มีทรัพย์', 'ใจงาม', 'รุ่งเรือง'];
const departments = ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'สูติ-นรีเวชกรรม', 'ออร์โธปิดิกส์', 'โรคหัวใจ'];
const doctors = ['นพ. สมเกียรติ', 'พญ. จินตนา', 'นพ. วิโรจน์', 'พญ. สุดาพร', 'นพ. ชาญชัย'];
const reasons = ['ตรวจสุขภาพประจำปี', 'ปวดศีรษะ', 'ปวดท้อง', 'ติดตามอาการเบาหวาน', 'แผลผ่าตัด', 'ไอเรื้อรัง'];
const labTests = ['CBC', 'Fasting Blood Sugar', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test'];

export let DRUG_DATABASE: Drug[] = [
    { id: 'd01', name: 'Paracetamol', type: 'ยาทั่วไป', price: 10, description: 'บรรเทาปวด ลดไข้' },
    { id: 'd02', name: 'Amoxicillin', type: 'ยาตามใบสั่งแพทย์', price: 120, description: 'ยาปฏิชีวนะ' },
    { id: 'd03', name: 'Ibuprofen', type: 'ยาทั่วไป', price: 50, description: 'ลดการอักเสบ บรรเทาปวด' },
    { id: 'd04', name: 'Loratadine', type: 'ยาทั่วไป', price: 80, description: 'ยาแก้แพ้ ลดน้ำมูก' },
    { id: 'd05', name: 'Metformin', type: 'ยาตามใบสั่งแพทย์', price: 90, description: 'ยารักษาเบาหวาน' },
    { id: 'd06', name: 'Amlodipine', type: 'ยาตามใบสั่งแพทย์', price: 150, description: 'ยาลดความดันโลหิต' },
    { id: 'd07', name: 'Simvastatin', type: 'ยาตามใบสั่งแพทย์', price: 180, description: 'ยาลดไขมันในเลือด' },
    { id: 'd08', name: 'Omeprazole', type: 'ยาตามใบสั่งแพทย์', price: 200, description: 'ยาลดกรดในกระเพาะ' },
    { id: 'd09', name: 'Aspirin', type: 'ยาทั่วไป', price: 30, description: 'ป้องกันการแข็งตัวของเลือด' },
    { id: 'd10', name: 'Warfarin', type: 'ยาตามใบสั่งแพทย์', price: 250, description: 'ยาต้านการแข็งตัวของเลือด' },
    { id: 'd11', name: 'Fah Talai Jone', type: 'สมุนไพร', price: 60, description: 'ฟ้าทะลายโจร บรรเทาอาการหวัด' },
    { id: 'd12', name: 'Turmeric Capsule', type: 'สมุนไพร', price: 75, description: 'ขมิ้นชัน บรรเทาอาการท้องอืด' },
    { id: 'd13', name: 'Clopidogrel', type: 'ยาตามใบสั่งแพทย์', price: 300, description: 'ยาต้านเกล็ดเลือด' },
    { id: 'd14', name: 'Salbutamol Inhaler', type: 'ยาตามใบสั่งแพทย์', price: 220, description: 'ยาพ่นขยายหลอดลม' },
    { id: 'd15', name: 'Prednisolone', type: 'ยาตามใบสั่งแพทย์', price: 110, description: 'สเตียรอยด์ ลดการอักเสบ' },
    { id: 'd16', name: 'Cetirizine', type: 'ยาทั่วไป', price: 45, description: 'ยาแก้แพ้' },
    { id: 'd17', name: 'Glibenclamide', type: 'ยาตามใบสั่งแพทย์', price: 55, description: 'ยารักษาเบาหวาน' },
    { id: 'd18', name: 'Enalapril', type: 'ยาตามใบสั่งแพทย์', price: 65, description: 'ยาลดความดันโลหิต' },
    { id: 'd19', name: 'Furosemide', type: 'ยาตามใบสั่งแพทย์', price: 35, description: 'ยาขับปัสสาวะ' },
    { id: 'd20', name: 'Diazepam', type: 'ยาตามใบสั่งแพทย์', price: 95, description: 'ยาคลายกังวล' },
    { id: 'd21', name: 'Tramadol', type: 'ยาตามใบสั่งแพทย์', price: 130, description: 'ยาแก้ปวด' },
    { id: 'd22', name: 'Gaviscon', type: 'ยาทั่วไป', price: 150, description: 'ยาลดกรดไหลย้อน' },
    { id: 'd23', name: 'Bisacodyl', type: 'ยาทั่วไป', price: 40, description: 'ยาระบาย' },
    { id: 'd24', name: 'Dextromethorphan', type: 'ยาทั่วไป', price: 60, description: 'ยาแก้ไอ' },
    { id: 'd25', name: 'Carbocysteine', type: 'ยาทั่วไป', price: 70, description: 'ยาละลายเสมหะ' },
    { id: 'd26', name: 'Naproxen', type: 'ยาตามใบสั่งแพทย์', price: 140, description: 'ยาแก้ปวด ลดอักเสบ' },
    { id: 'd27', name: 'Ciprofloxacin', type: 'ยาตามใบสั่งแพทย์', price: 180, description: 'ยาปฏิชีวนะ' },
    { id: 'd28', name: 'Metronidazole', type: 'ยาตามใบสั่งแพทย์', price: 90, description: 'ยาฆ่าเชื้อ' },
    { id: 'd29', name: 'Domperidone', type: 'ยาตามใบสั่งแพทย์', price: 50, description: 'ยาแก้อาเจียน' },
    { id: 'd30', name: 'Hyoscine', type: 'ยาตามใบสั่งแพทย์', price: 80, description: 'ยาแก้ปวดเกร็งในท้อง' },
    { id: 'd31', name: 'Atorvastatin', type: 'ยาตามใบสั่งแพทย์', price: 280, description: 'ยาลดไขมันในเลือดกลุ่มสแตติน' },
    { id: 'd32', name: 'Levothyroxine', type: 'ยาตามใบสั่งแพทย์', price: 70, description: 'ฮอร์โมนไทรอยด์สังเคราะห์' },
    { id: 'd33', name: 'Lisinopril', type: 'ยาตามใบสั่งแพทย์', price: 85, description: 'ยาลดความดันโลหิตกลุ่ม ACE inhibitor' },
    { id: 'd34', name: 'Gabapentin', type: 'ยาตามใบสั่งแพทย์', price: 190, description: 'ยารักษาอาการปวดจากเส้นประสาทและชัก' },
    { id: 'd35', name: 'Albuterol Inhaler', type: 'ยาตามใบสั่งแพทย์', price: 250, description: 'ยาพ่นขยายหลอดลม (เหมือน Salbutamol)' },
    { id: 'd36', name: 'Hydrochlorothiazide', type: 'ยาตามใบสั่งแพทย์', price: 40, description: 'ยาขับปัสสาวะ ลดความดัน' },
    { id: 'd37', name: 'Sertraline', type: 'ยาตามใบสั่งแพทย์', price: 220, description: 'ยารักษาโรคซึมเศร้ากลุ่ม SSRI' },
    { id: 'd38', name: 'Montelukast', type: 'ยาตามใบสั่งแพทย์', price: 260, description: 'ยารักษาโรคหอบหืดและภูมิแพ้' },
    { id: 'd39', name: 'Tamsulosin', type: 'ยาตามใบสั่งแพทย์', price: 310, description: 'ยารักษาต่อมลูกหมากโต' },
    { id: 'd40', name: 'Azithromycin', type: 'ยาตามใบสั่งแพทย์', price: 150, description: 'ยาปฏิชีวนะ' },
    { id: 'd41', name: 'Losartan', type: 'ยาตามใบสั่งแพทย์', price: 160, description: 'ยาลดความดันโลหิตกลุ่ม ARB' },
    { id: 'd42', name: 'Pantoprazole', type: 'ยาตามใบสั่งแพทย์', price: 180, description: 'ยาลดกรดในกระเพาะอาหาร' },
    { id: 'd43', name: 'Escitalopram', type: 'ยาตามใบสั่งแพทย์', price: 240, description: 'ยารักษาโรคซึมเศร้าและวิตกกังวล' },
    { id: 'd44', name: 'Fluoxetine', type: 'ยาตามใบสั่งแพทย์', price: 200, description: 'ยารักษาโรคซึมเศร้า' },
    { id: 'd45', name: 'Rosuvastatin', type: 'ยาตามใบสั่งแพทย์', price: 350, description: 'ยาลดไขมันในเลือดประสิทธิภาพสูง' },
    { id: 'd46', name: 'Ondansetron', type: 'ยาตามใบสั่งแพทย์', price: 60, description: 'ยาแก้คลื่นไส้อาเจียน' },
    { id: 'd47', name: 'Doxycycline', type: 'ยาตามใบสั่งแพทย์', price: 100, description: 'ยาปฏิชีวนะรักษาสิวและการติดเชื้อ' },
    { id: 'd48', name: 'Cephalexin', type: 'ยาตามใบสั่งแพทย์', price: 130, description: 'ยาปฏิชีวนะ' },
    { id: 'd49', name: 'Clonazepam', type: 'ยาตามใบสั่งแพทย์', price: 120, description: 'ยาคลายกังวลและกันชัก' },
    { id: 'd50', name: 'Trazodone', type: 'ยาตามใบสั่งแพทย์', price: 180, description: 'ยาช่วยให้นอนหลับและแก้ซึมเศร้า' },
    { id: 'd51', name: 'Diclofenac Gel', type: 'ยาทั่วไป', price: 90, description: 'เจลทาแก้ปวดกล้ามเนื้อและข้อ' },
    { id: 'd52', name: 'Miconazole Cream', type: 'ยาทั่วไป', price: 70, description: 'ครีมรักษาเชื้อราที่ผิวหนัง' },
    { id: 'd53', name: 'Hydrocortisone Cream', type: 'ยาทั่วไป', price: 50, description: 'ครีมสเตียรอยด์อ่อนๆ ลดการอักเสบที่ผิวหนัง' },
    { id: 'd54', name: 'Guaifenesin', type: 'ยาทั่วไป', price: 80, description: 'ยาขับเสมหะ' },
    { id: 'd55', name: 'Pseudoephedrine', type: 'ยาทั่วไป', price: 60, description: 'ยาลดน้ำมูก แก้คัดจมูก' },
    { id: 'd56', name: 'Loperamide', type: 'ยาทั่วไป', price: 35, description: 'ยาหยุดถ่าย' },
    { id: 'd57', name: 'Famotidine', type: 'ยาทั่วไป', price: 100, description: 'ยาลดกรดในกระเพาะ' },
    { id: 'd58', name: 'Meclizine', type: 'ยาทั่วไป', price: 45, description: 'ยาแก้เมารถ เมาเรือ' },
    { id: 'd59', name: 'Ginkgo Biloba', type: 'สมุนไพร', price: 250, description: 'สารสกัดจากใบแปะก๊วย บำรุงสมอง' },
    { id: 'd60', name: 'Echinacea', type: 'สมุนไพร', price: 200, description: 'สมุนไพรเสริมภูมิคุ้มกัน' },
    { id: 'd61', name: 'St. John\'s Wort', type: 'สมุนไพร', price: 280, description: 'สมุนไพรช่วยเรื่องอารมณ์ คลายกังวล' },
    { id: 'd62', name: 'Melatonin', type: 'สมุนไพร', price: 150, description: 'ฮอร์โมนช่วยในการนอนหลับ' },
    { id: 'd63', name: 'Glucosamine Sulfate', type: 'ยาทั่วไป', price: 300, description: 'อาหารเสริมบำรุงข้อต่อ' },
    { id: 'd64', name: 'Coenzyme Q10', type: 'ยาทั่วไป', price: 400, description: 'สารต้านอนุมูลอิสระ บำรุงหัวใจ' }
];

export const addDrugToDatabase = (drug: Drug) => {
    if (!DRUG_DATABASE.some(d => d.id === drug.id)) {
        DRUG_DATABASE.unshift(drug);
    }
};

const randomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randomDate = (start: Date, end: Date): Date => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateMockData = (): Patient[] => {
    const patients: Patient[] = [];
    for (let i = 1; i <= 50; i++) {
        const name = `${randomElement(firstNames)} ${randomElement(lastNames)}`;
        const patient: Patient = {
            id: `p${i}`,
            hn: `HN${2024000 + i}`,
            name: `น.ส. ${name}`,
            nationalId: `1-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1 + Math.random() * 9)}`,
            treatmentRights: randomElement(['สิทธิประกันสังคม', 'สิทธิบัตรทอง (สปสช.)', 'สิทธิข้าราชการ', 'ชำระเงินเอง']),
            appointments: [],
            prescriptions: [],
            payments: [],
            labResults: [],
            medicalCertificates: [],
        };

        const numAppointments = Math.floor(2 + Math.random() * 5);
        for (let j = 0; j < numAppointments; j++) {
            const appointmentDate = randomDate(new Date(2023, 0, 1), new Date());
            const appointment: Appointment = {
                id: `app${i}-${j}`,
                date: appointmentDate,
                department: randomElement(departments),
                doctor: randomElement(doctors),
                reason: randomElement(reasons),
                status: 'Completed',
            };
            patient.appointments.push(appointment);

            const numDrugs = Math.floor(1 + Math.random() * 4);
            const drugs: Drug[] = [];
            let totalCost = 150; // Consultation fee
            for (let k = 0; k < numDrugs; k++) {
                const drug = randomElement(DRUG_DATABASE);
                drugs.push(drug);
                totalCost += drug.price * 3; // Assume 3 doses
            }
            const prescription: Prescription = {
                id: `pre${i}-${j}`,
                date: appointmentDate,
                drugs: drugs,
                doctor: appointment.doctor,
            };
            patient.prescriptions.push(prescription);

            const payment: Payment = {
                id: `pay${i}-${j}`,
                date: new Date(appointmentDate.getTime() + 1000 * 60 * 30), // 30 mins after appt
                amount: totalCost,
                details: `ค่าบริการและค่ายาสำหรับ ${appointment.department}`,
                status: 'Paid',
            };
            patient.payments.push(payment);
            
            if (Math.random() > 0.5) {
                const labResult: LabResult = {
                    id: `lab${i}-${j}`,
                    date: appointmentDate,
                    testName: randomElement(labTests),
                    result: (Math.random() * 100).toFixed(2),
                    referenceRange: 'Varies',
                };
                patient.labResults.push(labResult);
            }

            if(Math.random() > 0.7) {
                const medicalCertificate: MedicalCertificate = {
                    id: `mc${i}-${j}`,
                    date: appointmentDate,
                    doctor: appointment.doctor,
                    details: `ขอใบรับรองแพทย์เพื่อยืนยันการเข้ารับการรักษาอาการ ${appointment.reason} และให้หยุดพักงานเป็นเวลา ${Math.floor(1 + Math.random() * 3)} วัน`,
                };
                patient.medicalCertificates.push(medicalCertificate);
            }
        }
        // Add one future appointment
         const futureAppointmentDate = randomDate(new Date(), new Date(new Date().getFullYear() + 1, 11, 31));
         patient.appointments.push({
             id: `app${i}-future`,
             date: futureAppointmentDate,
             department: randomElement(departments),
             doctor: randomElement(doctors),
             reason: 'นัดติดตามอาการ',
             status: 'Scheduled',
         });


        patients.push(patient);
    }
    return patients;
};

export const mockPatients = generateMockData();