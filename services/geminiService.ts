
import { GoogleGenAI } from "@google/genai";
import { Drug } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Drug interaction feature will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const checkDrugInteractions = async (drugs: Drug[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("คุณสมบัติการตรวจสอบปฏิกิริยาระหว่างยาไม่พร้อมใช้งานเนื่องจากไม่ได้กำหนดค่า API Key");
  }

  if (drugs.length < 2) {
    return "โปรดเลือกยาอย่างน้อย 2 ชนิดเพื่อตรวจสอบปฏิกิริยา";
  }

  const drugNames = drugs.map(d => d.name).join(', ');
  const prompt = `
    ในฐานะผู้เชี่ยวชาญด้านเภสัชวิทยา โปรดวิเคราะห์ปฏิกิริยาระหว่างยาต่อไปนี้: ${drugNames}.
    
    สำหรับแต่ละปฏิกิริยาที่เป็นไปได้ โปรดระบุข้อมูลต่อไปนี้:
    1.  **ระดับความรุนแรง:** (เช่น รุนแรง, ปานกลาง, เล็กน้อย)
    2.  **คำอธิบาย:** อาการหรือผลกระทบที่อาจเกิดขึ้นคืออะไร?
    3.  **คำแนะนำ:** ควรทำอย่างไร? (เช่น หลีกเลี่ยงการใช้ร่วมกัน, ปรับขนาดยา, หรือติดตามอาการอย่างใกล้ชิด)

    หากไม่พบปฏิกิริยาที่มีนัยสำคัญทางคลินิก โปรดระบุว่า "ไม่พบปฏิกิริยาระหว่างยาที่สำคัญ"

    โปรดจัดรูปแบบคำตอบให้ชัดเจนและเข้าใจง่ายสำหรับผู้ป่วยทั่วไป
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error checking drug interactions:", error);
    return "เกิดข้อผิดพลาดในการตรวจสอบปฏิกิริยาระหว่างยา กรุณาลองใหม่อีกครั้ง";
  }
};
