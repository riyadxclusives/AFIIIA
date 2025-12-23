import jsPDF from 'jspdf';

interface MoodEntry {
  date: string;
  time?: string;
  mood: number;
  moodLabel: string;
  sleep: number;
  energy: number;
  symptoms: string[];
}

interface SymptomData {
  name: string;
  count: number;
}

interface PhaseData {
  phase: string;
  days: string;
  symptoms: string[];
  avgMood: number;
}

interface HealthReportData {
  userName?: string;
  generatedDate: string;
  avgMood: number;
  avgSleep: number;
  avgEnergy: number;
  moodTrend: number;
  sleepTrend: number;
  energyTrend: number;
  recentCheckins: MoodEntry[];
  topSymptoms: SymptomData[];
  symptomsByPhase: PhaseData[];
  cycleLength?: number;
  lastPeriodDate?: string;
}

export const generateHealthReport = (data: HealthReportData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;
  
  // Colors
  const primaryColor: [number, number, number] = [138, 107, 175]; // Lavender
  const secondaryColor: [number, number, number] = [100, 100, 100];
  const accentColor: [number, number, number] = [77, 182, 172]; // Teal
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Health & Wellness Report', margin, 28);
  
  yPos = 50;
  
  // Report Info
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${data.generatedDate}`, margin, yPos);
  if (data.userName) {
    doc.text(`Patient: ${data.userName}`, pageWidth - margin - 50, yPos);
  }
  
  yPos += 15;
  
  // Section: Overview Stats
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Weekly Overview', margin, yPos);
  yPos += 10;
  
  // Stats boxes
  const boxWidth = (pageWidth - margin * 2 - 20) / 3;
  const statBoxes = [
    { label: 'Avg Mood', value: data.avgMood.toFixed(1), trend: data.moodTrend },
    { label: 'Avg Sleep', value: data.avgSleep.toFixed(1), trend: data.sleepTrend },
    { label: 'Avg Energy', value: data.avgEnergy.toFixed(1), trend: data.energyTrend },
  ];
  
  statBoxes.forEach((stat, i) => {
    const xPos = margin + i * (boxWidth + 10);
    
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(xPos, yPos, boxWidth, 30, 3, 3, 'F');
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(stat.label, xPos + 5, yPos + 10);
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(stat.value, xPos + 5, yPos + 24);
    
    // Trend indicator
    const trendText = stat.trend > 0 ? `↑${stat.trend.toFixed(1)}` : stat.trend < 0 ? `↓${Math.abs(stat.trend).toFixed(1)}` : '→0';
    doc.setFontSize(9);
    doc.setTextColor(stat.trend >= 0 ? accentColor[0] : 200, stat.trend >= 0 ? accentColor[1] : 100, stat.trend >= 0 ? accentColor[2] : 100);
    doc.text(trendText, xPos + boxWidth - 20, yPos + 24);
  });
  
  yPos += 45;
  
  // Section: Cycle Information
  if (data.cycleLength || data.lastPeriodDate) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Cycle Information', margin, yPos);
    yPos += 8;
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    if (data.cycleLength) {
      doc.text(`Average Cycle Length: ${data.cycleLength} days`, margin, yPos);
      yPos += 6;
    }
    if (data.lastPeriodDate) {
      doc.text(`Last Period Start: ${data.lastPeriodDate}`, margin, yPos);
      yPos += 6;
    }
    yPos += 10;
  }
  
  // Section: Top Symptoms
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Most Frequent Symptoms (Last 30 Days)', margin, yPos);
  yPos += 10;
  
  const maxSymptomCount = Math.max(...data.topSymptoms.map(s => s.count));
  data.topSymptoms.slice(0, 5).forEach((symptom, i) => {
    const barWidth = ((pageWidth - margin * 2 - 80) * symptom.count) / maxSymptomCount;
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(symptom.name, margin, yPos + 5);
    
    doc.setFillColor(...accentColor);
    doc.roundedRect(margin + 60, yPos, barWidth, 8, 2, 2, 'F');
    
    doc.setTextColor(...secondaryColor);
    doc.text(`${symptom.count}x`, margin + 65 + barWidth, yPos + 5);
    
    yPos += 12;
  });
  
  yPos += 10;
  
  // Section: Symptoms by Phase
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Symptoms by Cycle Phase', margin, yPos);
  yPos += 10;
  
  data.symptomsByPhase.forEach((phase) => {
    doc.setFillColor(250, 250, 255);
    doc.roundedRect(margin, yPos - 3, pageWidth - margin * 2, 22, 2, 2, 'F');
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${phase.phase} (${phase.days})`, margin + 5, yPos + 5);
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Avg Mood: ${phase.avgMood.toFixed(1)}`, margin + 5, yPos + 14);
    doc.text(`Symptoms: ${phase.symptoms.join(', ') || 'None reported'}`, margin + 50, yPos + 14);
    
    yPos += 26;
  });
  
  yPos += 5;
  
  // Section: Recent Check-ins (new page if needed)
  if (yPos > 230) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recent Check-ins', margin, yPos);
  yPos += 10;
  
  // Table header
  doc.setFillColor(...primaryColor);
  doc.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Date', margin + 5, yPos + 7);
  doc.text('Mood', margin + 40, yPos + 7);
  doc.text('Sleep', margin + 70, yPos + 7);
  doc.text('Energy', margin + 100, yPos + 7);
  doc.text('Symptoms', margin + 130, yPos + 7);
  
  yPos += 12;
  
  data.recentCheckins.slice(0, 10).forEach((checkin, i) => {
    const bgColor = i % 2 === 0 ? 250 : 245;
    doc.setFillColor(bgColor, bgColor, bgColor);
    doc.rect(margin, yPos - 3, pageWidth - margin * 2, 10, 'F');
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(checkin.date, margin + 5, yPos + 4);
    doc.text(checkin.moodLabel, margin + 40, yPos + 4);
    doc.text(`${checkin.sleep}/5`, margin + 70, yPos + 4);
    doc.text(`${checkin.energy}/5`, margin + 100, yPos + 4);
    doc.text(checkin.symptoms.slice(0, 2).join(', '), margin + 130, yPos + 4);
    
    yPos += 10;
  });
  
  // Footer
  yPos = doc.internal.pageSize.getHeight() - 15;
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('This report is for informational purposes only. Please consult with your healthcare provider for medical advice.', margin, yPos);
  
  // Save
  doc.save(`health-report-${new Date().toISOString().split('T')[0]}.pdf`);
};
