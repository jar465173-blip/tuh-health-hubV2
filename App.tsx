import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import type { Patient, Drug, QueueTicket } from './types';
import { mockPatients, DRUG_DATABASE, addDrugToDatabase } from './services/mockDataService';
import { checkDrugInteractions } from './services/geminiService';
import { HomeIcon, PatientIcon, HistoryIcon, NewsIcon, OpdIcon, CalendarIcon, PillIcon, SearchIcon, LabIcon, CheckRightsIcon, PaymentIcon, CertificateIcon, ChevronLeftIcon, PlusIcon, XIcon, SparklesIcon, BellIcon } from './components/icons';

// --- ENUM & TYPES ---
enum View {
    DASHBOARD,
    OPD_QUEUE_SYSTEM,
    APPOINTMENT_HISTORY,
    DRUG_INTERACTION,
    QUEUE_STATUS_CHECKER,
    LAB_QUEUE,
    TREATMENT_RIGHTS,
    PAYMENT_HISTORY,
    MEDICAL_CERTIFICATE,
    PATIENT_LIST,
    PATIENT_PROFILE
}

interface AppContextType {
    view: View;
    setView: React.Dispatch<React.SetStateAction<View>>;
    currentUser: Patient | null;
    setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

// --- CONTEXT SETUP ---
const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    const [view, setView] = useState<View>(View.DASHBOARD);
    const [currentUser, setCurrentUser] = useState<Patient | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [activeBottomNav, setActiveBottomNav] = useState<string>('home');

    useEffect(() => {
        // Simulate logging in a user
        setCurrentUser(mockPatients[0]);
    }, []);

    const navigateTo = (newView: View, bottomNav: string) => {
        setView(newView);
        setActiveBottomNav(bottomNav);
    };

    const Header = ({ title }: { title: string }) => (
        <div className="flex items-center p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md">
            {view !== View.DASHBOARD && (
                <button onClick={() => navigateTo(View.DASHBOARD, 'home')} className="mr-4 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="flex-grow"></div>
            <div className="relative">
                <BellIcon className="h-7 w-7" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </div>
        </div>
    );
    
    const BottomNav = () => (
        <div className="flex justify-around items-center p-2 bg-white border-t border-gray-200">
            {[
                { name: 'home', label: 'หน้าหลัก', icon: HomeIcon, view: View.DASHBOARD },
                { name: 'patient', label: 'ข้อมูลผู้ป่วย', icon: PatientIcon, view: View.PATIENT_LIST },
                { name: 'history', label: 'ประวัติการรักษา', icon: HistoryIcon, view: View.APPOINTMENT_HISTORY },
                { name: 'news', label: 'ข่าวสาร', icon: NewsIcon, view: View.DASHBOARD }
            ].map(item => (
                <button key={item.name} onClick={() => navigateTo(item.view, item.name)} className={`flex flex-col items-center w-1/4 transition-colors ${activeBottomNav === item.name ? 'text-cyan-600' : 'text-gray-500'}`}>
                    <item.icon className="h-6 w-6 mb-1" />
                    <span className="text-xs">{item.label}</span>
                </button>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (view) {
            case View.DASHBOARD: return <Dashboard />;
            case View.OPD_QUEUE_SYSTEM: return <OpdQueueSystem />;
            case View.APPOINTMENT_HISTORY: return <AppointmentHistory />;
            case View.DRUG_INTERACTION: return <DrugInteractionChecker />;
            case View.QUEUE_STATUS_CHECKER: return <QueueStatusChecker />;
            case View.LAB_QUEUE: return <LabQueue />;
            case View.TREATMENT_RIGHTS: return <TreatmentRights />;
            case View.PAYMENT_HISTORY: return <PaymentHistory />;
            case View.MEDICAL_CERTIFICATE: return <MedicalCertificate />;
            case View.PATIENT_LIST: return <PatientList />;
            case View.PATIENT_PROFILE: return selectedPatient ? <PatientProfile patient={selectedPatient} /> : <PatientList />;
            default: return <Dashboard />;
        }
    };
    
    const contextValue = { view, setView, currentUser, setSelectedPatient };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4">
                <div className="w-full max-w-md h-[800px] max-h-[90vh] bg-gray-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                    {currentUser ? (
                         <>
                            {view === View.DASHBOARD ? (
                                 <div className="p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                           <PatientIcon className="w-8 h-8 mr-3"/>
                                           <div>
                                                <p className="text-sm">สวัสดี,</p>
                                                <p className="font-semibold">{currentUser.name}</p>
                                           </div>
                                        </div>
                                        <div className="relative">
                                            <BellIcon className="h-7 w-7" />
                                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Header title={Object.keys(View).find(key => View[key as keyof typeof View] === view)?.replace(/_/g, ' ') || 'TUH For All'} />
                            )}
                            <main className="flex-grow overflow-y-auto p-4 bg-gray-100">
                                {renderContent()}
                            </main>
                            <BottomNav />
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p>Loading user data...</p>
                        </div>
                    )}
                </div>
            </div>
        </AppContext.Provider>
    );
};

// --- View Components ---

const Dashboard: React.FC<{}> = () => {
    const { setView } = useAppContext();
    const menuItems = [
        { label: 'OPD Online', icon: OpdIcon, view: View.OPD_QUEUE_SYSTEM, color: 'text-blue-500', bgColor: 'bg-blue-100' },
        { label: 'รายการนัด', icon: CalendarIcon, view: View.APPOINTMENT_HISTORY, color: 'text-green-500', bgColor: 'bg-green-100' },
        { label: 'จัดการยา', icon: PillIcon, view: View.DRUG_INTERACTION, color: 'text-red-500', bgColor: 'bg-red-100' },
        { label: 'ตรวจสอบคิว', icon: SearchIcon, view: View.QUEUE_STATUS_CHECKER, color: 'text-purple-500', bgColor: 'bg-purple-100' },
        { label: 'รับคิวเจาะเลือด/LAB', icon: LabIcon, view: View.LAB_QUEUE, color: 'text-orange-500', bgColor: 'bg-orange-100' },
        { label: 'ตรวจสอบสิทธิ์', icon: CheckRightsIcon, view: View.TREATMENT_RIGHTS, color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
        { label: 'ชำระเงิน', icon: PaymentIcon, view: View.PAYMENT_HISTORY, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
        { label: 'ใบรับรองแพทย์', icon: CertificateIcon, view: View.MEDICAL_CERTIFICATE, color: 'text-pink-500', bgColor: 'bg-pink-100' },
    ];

    return (
        <div className="space-y-4">
             <h2 className="text-xl font-bold text-gray-700">เมนูหลัก</h2>
            <div className="grid grid-cols-4 gap-4 text-center">
                {menuItems.map(item => (
                    <div key={item.label} onClick={() => setView(item.view)} className="flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.bgColor} mb-2`}>
                            <item.icon className={`w-8 h-8 ${item.color}`} />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OpdQueueSystem: React.FC<{}> = () => {
    const [ticket, setTicket] = useState<QueueTicket | null>(null);
    const { currentUser } = useAppContext();
    const ticketRef = useRef(null);

    const handleGetQueue = () => {
        if (!currentUser) return;
        const newTicket: QueueTicket = {
            id: `Q${Date.now()}`,
            patientName: currentUser.name,
            hn: currentUser.hn,
            queueNumber: `A${Math.floor(100 + Math.random() * 900)}`,
            department: 'อายุรกรรมทั่วไป',
            room: '101',
            timestamp: new Date(),
        };
        setTicket(newTicket);
    };

    const handlePrint = () => {
        const printContent = ticketRef.current;
        if (printContent) {
            const originalContents = document.body.innerHTML;
            const printElement = printContent as HTMLElement;
            document.body.innerHTML = printElement.innerHTML;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }
    };

    return (
        <div className="flex flex-col items-center h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ขอรับคิวตรวจ (OPD)</h2>
            <button onClick={handleGetQueue} className="w-full py-4 px-6 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-all text-lg">
                กดเพื่อรับบัตรคิว
            </button>
            {ticket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-sm">
                        <div ref={ticketRef} className="text-center text-gray-800 border-2 border-dashed border-gray-400 p-4">
                            <h3 className="text-lg font-bold">โรงพยาบาล TUH for All</h3>
                            <p className="text-sm">บัตรคิวแผนกอายุรกรรม</p>
                            <div className="my-4">
                                <p className="text-5xl font-bold tracking-wider">{ticket.queueNumber}</p>
                            </div>
                            <p><strong>ชื่อ:</strong> {ticket.patientName}</p>
                            <p><strong>HN:</strong> {ticket.hn}</p>
                            <p><strong>ห้องตรวจ:</strong> {ticket.room}</p>
                            <p className="mt-2 text-xs">{ticket.timestamp.toLocaleString('th-TH')}</p>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={() => setTicket(null)} className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg">ปิด</button>
                            <button onClick={handlePrint} className="py-2 px-4 bg-blue-500 text-white rounded-lg">พิมพ์</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DrugInteractionChecker: React.FC<{}> = () => {
    const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAddDrugModalOpen, setIsAddDrugModalOpen] = useState(false);
    const [newDrug, setNewDrug] = useState<{name: string; type: 'ยาตามใบสั่งแพทย์' | 'ยาทั่วไป' | 'สมุนไพร'; price: string; description: string}>({
        name: '',
        type: 'ยาทั่วไป',
        price: '',
        description: ''
    });

    const filteredDrugs = searchTerm
        ? DRUG_DATABASE.filter(drug => drug.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedDrugs.some(sd => sd.id === drug.id))
        : [];

    const addDrug = (drug: Drug) => {
        setSelectedDrugs([...selectedDrugs, drug]);
        setSearchTerm('');
    };

    const removeDrug = (drugId: string) => {
        setSelectedDrugs(selectedDrugs.filter(d => d.id !== drugId));
    };

    const handleCheck = async () => {
        setIsLoading(true);
        setResult('');
        const response = await checkDrugInteractions(selectedDrugs);
        setResult(response);
        setIsLoading(false);
    };

    const handleAddNewDrug = () => {
        if (!newDrug.name || !newDrug.price) {
            alert('กรุณากรอกชื่อและราคายา');
            return;
        }
        const drugToAdd: Drug = {
            id: `d${Date.now()}`,
            name: newDrug.name,
            type: newDrug.type,
            price: parseFloat(newDrug.price) || 0,
            description: newDrug.description
        };
        addDrugToDatabase(drugToAdd);
        setIsAddDrugModalOpen(false);
        setNewDrug({ name: '', type: 'ยาทั่วไป', price: '', description: '' });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-700">การจัดการยาและปฏิกิริยาของยา</h2>
            
            <div className="flex items-start gap-2">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ค้นหาและเพิ่มยา..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                    {searchTerm && filteredDrugs.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                            {filteredDrugs.map(drug => (
                                <li key={drug.id} onClick={() => addDrug(drug)} className="p-3 hover:bg-gray-100 cursor-pointer">
                                    {drug.name} <span className="text-sm text-gray-500">({drug.type})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button onClick={() => setIsAddDrugModalOpen(true)} title="เพิ่มยาใหม่" className="p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex-shrink-0">
                    <PlusIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold">ยาที่เลือก:</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedDrugs.map(drug => (
                        <div key={drug.id} className="flex items-center bg-cyan-100 text-cyan-800 text-sm font-medium px-3 py-1 rounded-full">
                            {drug.name}
                            <button onClick={() => removeDrug(drug.id)} className="ml-2">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleCheck} disabled={selectedDrugs.length < 2 || isLoading} className="w-full flex justify-center items-center gap-2 py-3 px-6 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-all disabled:bg-gray-400">
                <SparklesIcon className="w-5 h-5"/>
                ตรวจสอบปฏิกิริยาระหว่างยาด้วย AI
            </button>
            {isLoading && <div className="text-center p-4">กำลังวิเคราะห์ข้อมูล...</div>}
            {result && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-bold text-lg mb-2">ผลการวิเคราะห์:</h3>
                    <pre className="whitespace-pre-wrap font-sans text-gray-700">{result}</pre>
                </div>
            )}

            {isAddDrugModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">เพิ่มยาใหม่</h3>
                        <input
                            type="text"
                            placeholder="ชื่อยา"
                            value={newDrug.name}
                            onChange={(e) => setNewDrug({ ...newDrug, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        />
                        <select
                            value={newDrug.type}
                            onChange={(e) => setNewDrug({ ...newDrug, type: e.target.value as any })}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="ยาทั่วไป">ยาทั่วไป</option>
                            <option value="ยาตามใบสั่งแพทย์">ยาตามใบสั่งแพทย์</option>
                            <option value="สมุนไพร">สมุนไพร</option>
                        </select>
                        <input
                            type="number"
                            placeholder="ราคา"
                            value={newDrug.price}
                            onChange={(e) => setNewDrug({ ...newDrug, price: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        />
                        <textarea
                            placeholder="คำอธิบาย"
                            value={newDrug.description}
                            onChange={(e) => setNewDrug({ ...newDrug, description: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            rows={3}
                        ></textarea>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsAddDrugModalOpen(false)} className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors">
                                ยกเลิก
                            </button>
                            <button onClick={handleAddNewDrug} className="py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AppointmentHistory: React.FC = () => {
    const { currentUser } = useAppContext();
    
    if (!currentUser) {
        return <div className="text-center">Loading appointments...</div>;
    }

    const sortedAppointments = [...currentUser.appointments].sort((a, b) => b.date.getTime() - a.date.getTime());
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">ประวัติการนัดหมาย</h2>
            <div className="space-y-3">
                {sortedAppointments.map(app => (
                    <div key={app.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-cyan-500">
                        <div className="flex justify-between items-start">
                           <div>
                             <p className="font-semibold text-gray-800">{app.department}</p>
                             <p className="text-sm text-gray-600">แพทย์: {app.doctor}</p>
                             <p className="text-sm text-gray-500">{app.date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
                           </div>
                           <span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{app.status === 'Completed' ? 'เสร็จสิ้น' : 'นัดหมาย'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PatientList: React.FC = () => {
    const { setView, setSelectedPatient } = useAppContext();

    const handleSelectPatient = (patient: Patient) => {
        setSelectedPatient(patient);
        setView(View.PATIENT_PROFILE);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">รายชื่อผู้ป่วย</h2>
            <div className="space-y-2">
                {mockPatients.map(p => (
                    <div key={p.id} onClick={() => handleSelectPatient(p)} className="bg-white p-3 rounded-lg shadow-sm flex items-center cursor-pointer hover:bg-gray-50">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                           <PatientIcon className="w-6 h-6 text-teal-600"/>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{p.name}</p>
                            <p className="text-sm text-gray-500">HN: {p.hn}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PatientProfile: React.FC<{ patient: Patient }> = ({ patient }) => {
    const [tab, setTab] = useState('info');
    return (
       <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold">{patient.name}</h2>
                <p className="text-gray-600">HN: {patient.hn}</p>
                <p className="text-gray-600">สิทธิ์การรักษา: {patient.treatmentRights}</p>
            </div>
            <div className="flex border-b">
                {['info', 'appointments', 'payments'].map(t => (
                    <button key={t} onClick={() => setTab(t)} className={`py-2 px-4 font-medium ${tab === t ? 'border-b-2 border-cyan-500 text-cyan-600' : 'text-gray-500'}`}>
                        {t === 'info' ? 'ข้อมูล' : t === 'appointments' ? 'นัดหมาย' : 'ชำระเงิน'}
                    </button>
                ))}
            </div>
            {tab === 'info' && <div>...ประวัติการรักษาทั้งหมด...</div>}
            {tab === 'appointments' && (
                 <div className="space-y-2">
                    {patient.appointments.map(a => <div key={a.id} className="bg-white p-3 rounded-lg">{a.department} - {a.date.toLocaleDateString('th-TH')}</div>)}
                 </div>
            )}
             {tab === 'payments' && (
                 <div className="space-y-2">
                    {patient.payments.map(p => <div key={p.id} className="bg-white p-3 rounded-lg flex justify-between"><span>{p.details}</span><span className="font-semibold">{p.amount.toLocaleString()} บาท</span></div>)}
                 </div>
            )}
       </div>
    );
};

// --- Placeholder Components for other features ---
const QueueStatusChecker: React.FC = () => {
    const [queueInput, setQueueInput] = useState('');
    const [status, setStatus] = useState('');

    const checkStatus = () => {
        if (!queueInput.trim()) {
            setStatus('กรุณากรอกหมายเลขคิว');
            return;
        }
        const currentQueue = Math.floor(100 + Math.random() * (parseInt(queueInput.substring(1)) - 100));
        const remaining = parseInt(queueInput.substring(1)) - currentQueue;
        setStatus(`คิวปัจจุบัน: A${currentQueue}. เหลืออีก ${remaining > 0 ? remaining : 0} คิว`);
    };

    return <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">ตรวจสอบคิว</h2>
        <input type="text" value={queueInput} onChange={e => setQueueInput(e.target.value)} placeholder="กรอกหมายเลขคิว (เช่น A123)" className="w-full p-3 border rounded-lg" />
        <button onClick={checkStatus} className="w-full py-3 bg-cyan-500 text-white rounded-lg">ตรวจสอบ</button>
        {status && <div className="mt-4 p-4 bg-blue-100 rounded-lg text-center font-semibold">{status}</div>}
    </div>;
};
const LabQueue: React.FC = () => <div className="p-4"><h2 className="text-xl font-bold">รับคิวเจาะเลือด / LAB</h2><p>เร็วๆ นี้</p></div>;
const TreatmentRights: React.FC = () => {
    const { currentUser } = useAppContext();
    if (!currentUser) return null;
    return <div className="p-4"><h2 className="text-xl font-bold">สิทธิ์การรักษาของคุณ</h2><div className="mt-4 p-4 bg-green-100 rounded-lg text-green-800 font-semibold text-lg">{currentUser.treatmentRights}</div></div>;
};
const PaymentHistory: React.FC = () => {
    const { currentUser } = useAppContext();
    if (!currentUser) return null;
     return (
        <div>
            <h2 className="text-xl font-bold mb-4">ประวัติการชำระเงิน</h2>
            <div className="space-y-3">
                {currentUser.payments.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{p.details}</p>
                            <p className="text-sm text-gray-500">{p.date.toLocaleDateString('th-TH')}</p>
                        </div>
                        <p className="font-bold text-teal-600">{p.amount.toLocaleString()} บาท</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
const MedicalCertificate: React.FC = () => {
    const { currentUser } = useAppContext();
    if (!currentUser) return null;
    return <div className="p-4">
        <h2 className="text-xl font-bold mb-4">ใบรับรองแพทย์อิเล็กทรอนิกส์</h2>
        <div className="space-y-3">
            {currentUser.medicalCertificates.map(mc => (
                <div key={mc.id} className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer">
                    <p className="font-semibold">ใบรับรองแพทย์ วันที่ {mc.date.toLocaleDateString('th-TH')}</p>
                    <p className="text-sm text-gray-600">ออกโดย: {mc.doctor}</p>
                </div>
            ))}
        </div>
    </div>;
};

export default App;