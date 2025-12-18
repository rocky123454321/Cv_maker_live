import { useState, useMemo } from "react";
import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";
import { styles } from "./style";
import "../../App.css";

export default function Invoice2() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    educationSchool: "",
    educationLocation: "",
    educationDegree: "",
    educationDate: "",
    thesis: "",
    coursework: "",
    experiences: [{ org: "", location: "", title: "", date: "", bullets: [""] }],
    leadership: [{ org: "", location: "", role: "", date: "", bullets: [""] }],
    skills: "",
    languages: "",
    interests: "",
  });

  const [pdfData, setPdfData] = useState(formData);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (index: number, field: string, value: string | string[]) => {
    setFormData((prev) => {
      const newExperiences = [...prev.experiences];
      newExperiences[index] = { ...newExperiences[index], [field]: value };
      return { ...prev, experiences: newExperiences };
    });
  };

  const handleLeadershipChange = (index: number, field: string, value: string | string[]) => {
    setFormData((prev) => {
      const newLeadership = [...prev.leadership];
      newLeadership[index] = { ...newLeadership[index], [field]: value };
      return { ...prev, leadership: newLeadership };
    });
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { org: "", location: "", title: "", date: "", bullets: [""] }],
    }));
  };

  const addLeadership = () => {
    setFormData((prev) => ({
      ...prev,
      leadership: [...prev.leadership, { org: "", location: "", role: "", date: "", bullets: [""] }],
    }));
  };

  const addBulletToExperience = (index: number) => {
    setFormData((prev) => {
      const newExperiences = [...prev.experiences];
      if (newExperiences[index].bullets.length < 5) newExperiences[index].bullets.push("");
      return { ...prev, experiences: newExperiences };
    });
  };

  const addBulletToLeadership = (index: number) => {
    setFormData((prev) => {
      const newLeadership = [...prev.leadership];
      if (newLeadership[index].bullets.length < 5) newLeadership[index].bullets.push("");
      return { ...prev, leadership: newLeadership };
    });
  };

  const deleteBulletFromExperience = (expIndex: number, bulletIndex: number) => {
    if (bulletIndex === 0) return;
    setFormData((prev) => {
      const newExperiences = [...prev.experiences];
      newExperiences[expIndex].bullets.splice(bulletIndex, 1);
      return { ...prev, experiences: newExperiences };
    });
  };

  const deleteBulletFromLeadership = (leadIndex: number, bulletIndex: number) => {
    if (bulletIndex === 0) return;
    setFormData((prev) => {
      const newLeadership = [...prev.leadership];
      newLeadership[leadIndex].bullets.splice(bulletIndex, 1);
      return { ...prev, leadership: newLeadership };
    });
  };

  const handleUpdatePDF = () => {
    const requiredFields = [
      "name",
      "address",
      "email",
      "phone",
      "educationSchool",
      "educationLocation",
      "educationDegree",
      "educationDate",
      "coursework",
      "skills",
      "languages",
      "interests",
    ];

    
  for (const field of requiredFields) {
    if (!formData[field as keyof typeof formData]) {
      alert(`Please fill in the ${field} field.`);
      return;
    }
  }
    for (let i = 0; i < formData.experiences.length; i++) {
      const exp = formData.experiences[i];
      if (!exp.org || !exp.location || !exp.title || !exp.date) return;
      if (!exp.bullets[0]?.trim()) return;
    }

    for (let i = 0; i < formData.leadership.length; i++) {
      const lead = formData.leadership[i];
      if (!lead.org || !lead.location || !lead.role || !lead.date) return;
      if (!lead.bullets[0]?.trim()) return;
    }

    setPdfData(formData);
    setIsLoading(false);
  };

  const MemoizedPDF = useMemo(
    () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.nameHeader}>{pdfData.name}</Text>
            <Text style={styles.contactInfo}>
              {pdfData.address} | {pdfData.email} | {pdfData.phone}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subHeader}>EDUCATION</Text>
            <View style={styles.line} />
            <View style={styles.rowBetween}>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>{pdfData.educationSchool}</Text>
              <Text style={{ fontSize: 12 }}>{pdfData.educationLocation}</Text>
            </View>
            <View style={styles.entryRow}>
              <Text style={styles.entryDetails}>{pdfData.educationDegree}</Text>
              <Text style={{ fontSize: 12 }}>{pdfData.educationDate}</Text>
            </View>
            {pdfData.thesis && <Text style={styles.entryDetails}>Thesis: {pdfData.thesis}</Text>}
            <Text style={styles.entryDetails}>Relevant Coursework: {pdfData.coursework}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subHeader}>EXPERIENCE</Text>
            <View style={styles.line} />
            {pdfData.experiences.map((exp, index) => (
              <View key={index}>
                <View style={styles.rowBetween}>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>{exp.org}</Text>
                  <Text style={{ fontSize: 12 }}>{exp.location}</Text>
                </View>
                <View style={styles.entryRow}>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>{exp.title}</Text>
                  <Text style={{ fontSize: 12 }}>{exp.date}</Text>
                </View>
                {exp.bullets.map((bullet, bulletIndex) => (
                  <Text key={bulletIndex} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.subHeader}>LEADERSHIP & ACTIVITIES</Text>
            <View style={styles.line} />
            {pdfData.leadership.map((lead, index) => (
              <View key={index}>
                <View style={styles.rowBetween}>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>{lead.org}</Text>
                  <Text style={{ fontSize: 12 }}>{lead.location}</Text>
                </View>
                <View style={styles.entryRow}>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>{lead.role}</Text>
                  <Text style={{ fontSize: 12 }}>{lead.date}</Text>
                </View>
                {lead.bullets.map((bullet, bulletIndex) => (
                  <Text key={bulletIndex} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.subHeader}>SKILLS & INTERESTS</Text>
            <View style={styles.line} />
            <Text style={styles.entryDetails}>Technical: {pdfData.skills}</Text>
            <Text style={styles.entryDetails}>Languages: {pdfData.languages}</Text>
            <Text style={styles.entryDetails}>Interests: {pdfData.interests}</Text>
          </View>
        </Page>
      </Document>
    ),
    [pdfData]
  );

  return (
    <div className="container">
      <div className="form">
        <h3>Contact Info</h3>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name (Surname, First Name M.)" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <h3>Education</h3>
        <input type="text" name="educationSchool" value={formData.educationSchool} onChange={handleChange} placeholder="School" />
        <input type="text" name="educationLocation" value={formData.educationLocation} onChange={handleChange} placeholder="Location" />
        <input type="text" name="educationDegree" value={formData.educationDegree} onChange={handleChange} placeholder="Degree / GPA" />
        <input type="text" name="educationDate" value={formData.educationDate} onChange={handleChange} placeholder="Graduation Date" />
        <input type="text" name="thesis" value={formData.thesis} onChange={handleChange} placeholder="Thesis" />
        <input type="text" name="coursework" value={formData.coursework} onChange={handleChange} placeholder="Relevant Coursework" />
        <h3>Experience</h3>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="experience-block">
            <h4>Experience {index + 1}</h4>
            <input type="text" value={exp.org} onChange={(e) => handleExperienceChange(index, "org", e.target.value)} placeholder="Organization" />
            <input type="text" value={exp.location} onChange={(e) => handleExperienceChange(index, "location", e.target.value)} placeholder="Location" />
            <input type="text" value={exp.title} onChange={(e) => handleExperienceChange(index, "title", e.target.value)} placeholder="Position Title" />
            <input type="text" value={exp.date} onChange={(e) => handleExperienceChange(index, "date", e.target.value)} placeholder="Date" />
            {exp.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <textarea value={bullet} onChange={(e) => {
                  const newBullets = [...exp.bullets];
                  newBullets[bulletIndex] = e.target.value;
                  handleExperienceChange(index, "bullets", newBullets);
                }} placeholder={`Experience Point ${bulletIndex + 1}`} style={{ flex: 1 }} />
                <button type="button" onClick={() => deleteBulletFromExperience(index, bulletIndex)} disabled={bulletIndex === 0} style={{
                  padding: "5px 10px",
                  backgroundColor: bulletIndex === 0 ? "#ccc" : "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: bulletIndex === 0 ? "not-allowed" : "pointer"
                }}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={() => addBulletToExperience(index)}>+ Add Bullet</button>
          </div>
        ))}
        <button type="button" onClick={addExperience}>Add More Experience</button>
        <h3>Leadership & Activities</h3>
        {formData.leadership.map((lead, index) => (
          <div key={index} className="leadership-block">
            <h4>Leadership {index + 1}</h4>
            <input type="text" value={lead.org} onChange={(e) => handleLeadershipChange(index, "org", e.target.value)} placeholder="Organization" />
            <input type="text" value={lead.location} onChange={(e) => handleLeadershipChange(index, "location", e.target.value)} placeholder="Location" />
            <input type="text" value={lead.role} onChange={(e) => handleLeadershipChange(index, "role", e.target.value)} placeholder="Role" />
            <input type="text" value={lead.date} onChange={(e) => handleLeadershipChange(index, "date", e.target.value)} placeholder="Date" />
            {lead.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <textarea value={bullet} onChange={(e) => {
                  const newBullets = [...lead.bullets];
                  newBullets[bulletIndex] = e.target.value;
                  handleLeadershipChange(index, "bullets", newBullets);
                }} placeholder={`Leadership Point ${bulletIndex + 1}`} style={{ flex: 1 }} />
                <button type="button" onClick={() => deleteBulletFromLeadership(index, bulletIndex)} disabled={bulletIndex === 0} style={{
                  padding: "5px 10px",
                  backgroundColor: bulletIndex === 0 ? "#ccc" : "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: bulletIndex === 0 ? "not-allowed" : "pointer"
                }}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={() => addBulletToLeadership(index)}>+ Add Bullet</button>
          </div>
        ))}
        <button type="button" onClick={addLeadership}>Add More Leadership</button>
        <h3>Skills & Interests</h3>
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Technical Skills" />
        <input type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages" />
        <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests" />
        <button type="button" onClick={handleUpdatePDF}>Update PDF</button>
      </div>
      <div className="preview">
        {isLoading ? (
          <div className="shimmer-preview">
            <div className="shimmer-line" style={{ width: "70%", height: "30px" }} />
            <div className="shimmer-line" style={{ width: "90%", height: "20px" }} />
            <div className="shimmer-line" style={{ width: "60%", height: "20px" }} />
            <div className="shimmer-block" style={{ width: "100%", height: "400px" }} />
          </div>
        ) : (
          <PDFViewer width="100%" height="100%">
            {MemoizedPDF}
          </PDFViewer>
        )}
      </div>
    </div>
  );
}
