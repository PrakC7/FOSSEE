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

const workshopQueue = [
  {
    id: 'W-101',
    type: 'Basics of Python',
    city: 'Pune',
    status: 'Pending',
    date: '2026-04-21',
    mode: 'Offline',
  },
  {
    id: 'W-102',
    type: 'GNU/Linux Tools',
    city: 'Chennai',
    status: 'Approved',
    date: '2026-04-24',
    mode: 'Hybrid',
  },
  {
    id: 'W-103',
    type: 'OpenFOAM',
    city: 'Mumbai',
    status: 'Rescheduled',
    date: '2026-04-28',
    mode: 'Offline',
  },
  {
    id: 'W-104',
    type: 'Advanced Python',
    city: 'Jaipur',
    status: 'Rejected',
    date: '2026-05-01',
    mode: 'Online',
  },
  {
    id: 'W-105',
    type: 'Basics of Python',
    city: 'Kolkata',
    status: 'Approved',
    date: '2026-05-04',
    mode: 'Offline',
  },
]

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
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const current = useMemo(() => roleData[role], [role])
  const filteredQueue = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return workshopQueue.filter((workshop) => {
      const statusMatch = statusFilter === 'All' || workshop.status === statusFilter
      if (!statusMatch) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return (
        workshop.id.toLowerCase().includes(normalizedSearch) ||
        workshop.type.toLowerCase().includes(normalizedSearch) ||
        workshop.city.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [searchQuery, statusFilter])

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

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setSubmitMessage('Please fix the highlighted fields and submit again.')
      return
    }

    setFormErrors({})
    setSubmitMessage('Request draft is ready. Submit flow can now be wired to backend API.')
  }

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

      <section className="panel">
        <div className="section-head">
          <h2>Workshop request form</h2>
          <span className="status-tag">Mobile-first input UX</span>
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
              {formErrors.city ? <p className="field-error">{formErrors.city}</p> : null}
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
            placeholder="Any specific topics, hardware labs, or schedule constraints"
            value={formData.agenda}
            onChange={handleFieldChange}
          />

          <div className="form-actions">
            <button type="submit">Validate request draft</button>
            <p aria-live="polite">{submitMessage}</p>
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Workshop queue</h2>
          <span className="status-tag">Search and filter</span>
        </div>

        <div className="queue-toolbar">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by workshop ID, type, or city"
            aria-label="Search workshops"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <p className="queue-meta" aria-live="polite">
          Showing {filteredQueue.length} of {workshopQueue.length} workshop requests
        </p>

        {filteredQueue.length === 0 ? (
          <p className="queue-empty">
            No workshops match this search or filter. Try clearing the search input.
          </p>
        ) : (
          <div className="queue-grid">
            {filteredQueue.map((workshop) => (
              <article key={workshop.id} className="queue-card">
                <div className="queue-head">
                  <h3>{workshop.type}</h3>
                  <span
                    className={`badge ${workshop.status.toLowerCase()}`}
                    aria-label={`Status ${workshop.status}`}
                  >
                    {workshop.status}
                  </span>
                </div>
                <p className="queue-id">Request ID: {workshop.id}</p>
                <dl>
                  <div>
                    <dt>City</dt>
                    <dd>{workshop.city}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{workshop.date}</dd>
                  </div>
                  <div>
                    <dt>Mode</dt>
                    <dd>{workshop.mode}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
