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
    statusMessage:
      'Coordinator status metrics will appear here once the dashboard is connected to live workshop records.',
    tasks: [
      'Choose workshop type and propose date',
      'Request available workshop slots',
      'Track approval and booking status',
    ],
    guide:
      'Focus on proposal quality and scheduling clarity before sharing requests with instructors.',
  },
  instructor: {
    heading: 'Instructor Workspace',
    statusMessage:
      'Instructor status metrics will appear here once request review events are pulled from the backend.',
    tasks: [
      'Post workshop availability',
      'Review incoming workshop requests',
      'Accept, reject, or reschedule requests',
    ],
    guide:
      'Focus on reviewer turnaround and actionable feedback while accepting or rescheduling requests.',
  },
}

function App() {
  const [role, setRole] = useState('coordinator')
  const [formData, setFormData] = useState({
    workshopType: '',
    requestedDate: '',
    city: '',
    mode: 'offline',
    participants: '',
    agenda: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitMessage, setSubmitMessage] = useState('')
  const current = useMemo(() => roleData[role], [role])

  // Keep form state and field-level errors in sync so error messages clear as users type.
  const handleFieldChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = {}

    if (!formData.workshopType) {
      errors.workshopType = 'Select a workshop type.'
    }
    if (!formData.requestedDate) {
      errors.requestedDate = 'Choose a requested date.'
    }
    if (!formData.city.trim()) {
      errors.city = 'Enter a city or campus.'
    }

    const participantsNumber = Number(formData.participants)
    if (!formData.participants) {
      errors.participants = 'Enter participant count.'
    } else if (Number.isNaN(participantsNumber) || participantsNumber < 15) {
      errors.participants = 'Participant count must be at least 15.'
    }

    // Block submit when validation fails and provide one high-level message for screen readers.
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setSubmitMessage('Please fix the highlighted fields and submit again.')
      return
    }

    setFormErrors({})
    setSubmitMessage('Request draft is ready. Submit flow can now be wired to backend API.')
  }

  return (
    <main className="app-shell">
      <header className="hero-block surface-elevated">
        <p className="hero-eyebrow">FOSSEE Workshop Booking</p>
        <h1>Academic workshop request console</h1>
        <p className="hero-copy">
          A mobile-first interface for instructor-coordinator workflow with
          clear state visibility, stronger form guidance, and backend-ready
          sections.
        </p>
      </header>

      <section className="role-strip surface-soft" aria-label="Role selection">
        <p className="strip-label">Working role</p>
        <div className="role-actions">
          <button
            type="button"
            className={role === 'coordinator' ? 'role-tab active' : 'role-tab'}
            onClick={() => setRole('coordinator')}
          >
            Coordinator
          </button>
          <button
            type="button"
            className={role === 'instructor' ? 'role-tab active' : 'role-tab'}
            onClick={() => setRole('instructor')}
          >
            Instructor
          </button>
        </div>
      </section>

      <div className="workspace-layout">
        <div className="workspace-main">
          <section className="surface-card">
            <div className="section-head">
              <h2>{current.heading}</h2>
              <span className="status-tag">Live status</span>
            </div>
            <p className="empty-note">{current.statusMessage}</p>
          </section>

          <section className="surface-card">
            <div className="section-head">
              <h2>System flow map</h2>
              <span className="status-tag">Core workflow reference</span>
            </div>
            <div className="flow-grid">
              {flowNodes.map((node) => (
                <article key={node.key} className="flow-item">
                  <h3>{node.title}</h3>
                  <p>{node.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="surface-card tasks-card">
            <div className="section-head">
              <h2>Role priorities</h2>
              <span className="status-tag">Action list</span>
            </div>
            <ol>
              {current.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>
          </section>

          <section className="surface-card">
            <div className="section-head">
              <h2>Workshop request form</h2>
              <span className="status-tag">Input and validation</span>
            </div>
            <form className="request-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="workshopType">Workshop type</label>
              <select
                id="workshopType"
                name="workshopType"
                value={formData.workshopType}
                onChange={handleFieldChange}
                aria-invalid={Boolean(formErrors.workshopType)}
              >
                <option value="">Select workshop type</option>
                <option value="basics-of-python">Basics of Python</option>
                <option value="advanced-python">Advanced Python</option>
                <option value="openfoam">OpenFOAM</option>
                <option value="linux">GNU/Linux Tools</option>
              </select>
              {formErrors.workshopType ? (
                <p className="field-error">{formErrors.workshopType}</p>
              ) : null}

              <div className="inline-group">
                <div>
                  <label htmlFor="requestedDate">Requested date</label>
                  <input
                    id="requestedDate"
                    name="requestedDate"
                    type="date"
                    value={formData.requestedDate}
                    onChange={handleFieldChange}
                    aria-invalid={Boolean(formErrors.requestedDate)}
                  />
                  {formErrors.requestedDate ? (
                    <p className="field-error">{formErrors.requestedDate}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="mode">Mode</label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.mode}
                    onChange={handleFieldChange}
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="inline-group">
                <div>
                  <label htmlFor="city">City or campus</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Example: IIT Bombay"
                    value={formData.city}
                    onChange={handleFieldChange}
                    aria-invalid={Boolean(formErrors.city)}
                  />
                  {formErrors.city ? (
                    <p className="field-error">{formErrors.city}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="participants">Participants</label>
                  <input
                    id="participants"
                    name="participants"
                    type="number"
                    min="15"
                    step="1"
                    placeholder="Minimum 15"
                    value={formData.participants}
                    onChange={handleFieldChange}
                    aria-invalid={Boolean(formErrors.participants)}
                  />
                  {formErrors.participants ? (
                    <p className="field-error">{formErrors.participants}</p>
                  ) : null}
                </div>
              </div>

              <label htmlFor="agenda">Agenda notes</label>
              <textarea
                id="agenda"
                name="agenda"
                rows="3"
                placeholder="Topics, lab requirements, or scheduling constraints"
                value={formData.agenda}
                onChange={handleFieldChange}
              />

              <div className="form-actions">
                <button type="submit">Validate request draft</button>
                <p aria-live="polite">{submitMessage}</p>
              </div>
            </form>
          </section>
        </div>

        <aside className="surface-card side-guide">
          <h3>Submission guidance</h3>
          <p>{current.guide}</p>
          <ul>
            <li>Use institutional emails for faster verification.</li>
            <li>Keep objectives specific and measurable.</li>
            <li>Mention infrastructure constraints in agenda notes.</li>
          </ul>
        </aside>
      </div>

      <section className="surface-card queue-panel">
        <div className="section-head">
          <h2>Workshop queue</h2>
          <span className="status-tag">Backend-ready</span>
        </div>
        {/* Queue cards are intentionally hidden until real records are fetched from backend APIs. */}
        <p className="queue-empty">
          Queue records are hidden until the API integration for workshop
          status events is completed.
        </p>
      </section>
    </main>
  )
}

export default App
