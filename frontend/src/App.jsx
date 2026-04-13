import { useMemo, useState } from 'react'
import './App.css'

const flowNodes = [
  {
    key: 'type',
    title: 'Workshop Type',
    desc: 'Admin creates workshop types and base details.',
  },
  {
    key: 'posted',
    title: 'Workshop Posted',
    desc: 'Instructor posts workshop availability.',
  },
  {
    key: 'proposed',
    title: 'Proposed Date',
    desc: 'Coordinator proposes a date for a selected workshop type.',
  },
  {
    key: 'requested',
    title: 'Requested Workshop',
    desc: 'Coordinator requests a workshop from instructor slots.',
  },
  {
    key: 'booked',
    title: 'Booked Workshop',
    desc: 'Request is confirmed when instructor accepts.',
  },
]

const roleData = {
  coordinator: {
    heading: 'Coordinator Workspace',
    counters: [
      { label: 'Proposed', value: 5, tone: 'pending' },
      { label: 'Requested', value: 8, tone: 'info' },
      { label: 'Booked', value: 3, tone: 'success' },
      { label: 'Rejected', value: 1, tone: 'danger' },
    ],
    tasks: [
      'Choose workshop type and propose date',
      'Request available workshop slots',
      'Track approval and booking status',
    ],
  },
  instructor: {
    heading: 'Instructor Workspace',
    counters: [
      { label: 'Pending Requests', value: 4, tone: 'pending' },
      { label: 'Accepted', value: 6, tone: 'success' },
      { label: 'Rescheduled', value: 2, tone: 'info' },
      { label: 'Rejected', value: 1, tone: 'danger' },
    ],
    tasks: [
      'Post workshop availability',
      'Review incoming workshop requests',
      'Accept, reject, or reschedule requests',
    ],
  },
}

function App() {
  const [role, setRole] = useState('coordinator')
  const current = useMemo(() => roleData[role], [role])

  return (
    <main className="page">
      <header className="hero">
        <p className="kicker">FOSSEE Workshop Booking</p>
        <h1>Workflow-first UI redesign</h1>
        <p className="subtitle">
          Built to improve workshop planning clarity for instructors and
          coordinators on mobile-first layouts.
        </p>
      </header>

      <section className="panel role-switcher" aria-label="Role selection">
        <button
          type="button"
          className={role === 'coordinator' ? 'chip active' : 'chip'}
          onClick={() => setRole('coordinator')}
        >
          Coordinator
        </button>
        <button
          type="button"
          className={role === 'instructor' ? 'chip active' : 'chip'}
          onClick={() => setRole('instructor')}
        >
          Instructor
        </button>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>{current.heading}</h2>
          <span className="status-tag">Live status overview</span>
        </div>
        <div className="counter-grid">
          {current.counters.map((item) => (
            <article key={item.label} className={`counter-card ${item.tone}`}>
              <p className="label">{item.label}</p>
              <p className="value">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>System flow map</h2>
          <span className="status-tag">Based on existing workshop process</span>
        </div>
        <div className="flow-grid">
          {flowNodes.map((node) => (
            <article key={node.key} className="flow-card">
              <h3>{node.title}</h3>
              <p>{node.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel tasks">
        <div className="section-head">
          <h2>Current role priorities</h2>
          <span className="status-tag">Action-focused</span>
        </div>
        <ol>
          {current.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default App
