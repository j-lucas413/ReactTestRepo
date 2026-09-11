import React, { useState } from 'react';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Marcus Vance', tier: 'Tier 3', focus: 'Reading Fluency', baseline: '42 WPM', target: '80 WPM' },
  { id: 2, name: 'Elena Rostova', tier: 'Tier 2', focus: 'Math Concepts', baseline: '58%', target: '80%' },
  { id: 3, name: 'Devon Miller', tier: 'Tier 2', focus: 'CICO Behavioral', baseline: '65% pts', target: '85% pts' },
];

export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState(INITIAL_STUDENTS[0]);
  const [duration, setDuration] = useState('20');
  const [metricScore, setMetricScore] = useState('');
  const [notes, setNotes] = useState('');
  const [recentLogs, setRecentLogs] = useState([]);

  const handleLogSession = (e) => {
    e.preventDefault();
    if (!metricScore) return;

    const newLog = {
      id: Date.now(),
      studentName: selectedStudent.name,
      focus: selectedStudent.focus,
      duration: `${duration} min`,
      score: metricScore,
      notes: notes || 'No notes provided',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setRecentLogs([newLog, ...recentLogs]);
    setMetricScore('');
    setNotes('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MTSS Intervention Tracker</h1>
        <span style={styles.badge}>Cloudflare Pages Test Deployment</span>
      </header>

      <main style={styles.grid}>
        {/* Left: Active Caseload */}
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Active Caseload</h2>
          <div style={styles.studentList}>
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                style={{
                  ...styles.studentCard,
                  borderColor: selectedStudent.id === student.id ? '#2563eb' : '#e2e8f0',
                  backgroundColor: selectedStudent.id === student.id ? '#eff6ff' : '#ffffff',
                }}
              >
                <div style={styles.rowBetween}>
                  <strong>{student.name}</strong>
                  <span style={student.tier === 'Tier 3' ? styles.tier3 : styles.tier2}>
                    {student.tier}
                  </span>
                </div>
                <div style={styles.subtext}>Focus: {student.focus}</div>
                <div style={styles.subtext}>Goal: {student.baseline} &rarr; {student.target}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Middle: Rapid Session Logger */}
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Log Session: {selectedStudent.name}</h2>
          <form onSubmit={handleLogSession} style={styles.form}>
            <label style={styles.label}>
              Duration (minutes)
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={styles.input}
              >
                <option value="15">15 mins</option>
                <option value="20">20 mins</option>
                <option value="30">30 mins</option>
                <option value="45">45 mins</option>
              </select>
            </label>

            <label style={styles.label}>
              Metric / Score ({selectedStudent.focus})
              <input
                type="text"
                required
                placeholder="e.g., 55 WPM or 8/10 correct"
                value={metricScore}
                onChange={(e) => setMetricScore(e.target.value)}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Session Notes
              <textarea
                rows={3}
                placeholder="Observed steady blending; struggled with diphthongs..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={styles.textarea}
              />
            </label>

            <button type="submit" style={styles.button}>
              Save Session Entry
            </button>
          </form>
        </section>

        {/* Right: Real-time Session Feed */}
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Recent Logs Today</h2>
          {recentLogs.length === 0 ? (
            <p style={styles.empty}>No logs saved this session yet.</p>
          ) : (
            <div style={styles.logList}>
              {recentLogs.map((log) => (
                <div key={log.id} style={styles.logEntry}>
                  <div style={styles.rowBetween}>
                    <strong>{log.studentName}</strong>
                    <span style={styles.timestamp}>{log.timestamp}</span>
                  </div>
                  <div style={styles.logScore}>Score: {log.score} ({log.duration})</div>
                  <div style={styles.logNote}>{log.notes}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' },
  title: { margin: 0, fontSize: '1.4rem', fontWeight: '700' },
  badge: { fontSize: '0.8rem', padding: '4px 10px', borderRadius: '9999px', backgroundColor: '#dbeafe', color: '#1d4ed8' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  sectionTitle: { margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600' },
  studentList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  studentCard: { padding: '12px', borderRadius: '6px', border: '1px solid', cursor: 'pointer', transition: 'all 0.15s' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  subtext: { fontSize: '0.85rem', color: '#64748b', marginTop: '4px' },
  tier3: { fontSize: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' },
  tier2: { fontSize: '0.75rem', backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' },
  input: { padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' },
  textarea: { padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical' },
  button: { padding: '10px 16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  empty: { fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' },
  logList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  logEntry: { padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '6px', borderLeft: '3px solid #2563eb' },
  timestamp: { fontSize: '0.75rem', color: '#64748b' },
  logScore: { fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' },
  logNote: { fontSize: '0.8rem', color: '#475569', marginTop: '2px' },
};