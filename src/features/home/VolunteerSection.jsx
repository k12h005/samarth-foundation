import React from 'react';
import { assets } from '../../constants';

export default function VolunteerSection({ handleBookingSubmit, t }) {
  return (
    <section id="volunteer" className="section section-lg bg-warm">
      <div className="container">
        <div className="story-block reverse">
          <div className="story-image-wrap">
            <img src={assets.volunteer} alt="Volunteer helping elder" />
          </div>
          <div className="story-content">
            <span className="section-label">Book a Visit</span>
            <h2 className="section-title">Visit Our Ashram</h2>
            <p>Spend time with our residents, coordinate yoga/arts sessions, or explore volunteering opportunities. Fill out the request form below to schedule a visit.</p>
            
            <form id="booking-form" onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
              <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
              <div className="form-group">
                <label className="form-label" htmlFor="visitor-name">Name</label>
                <input id="visitor-name" name="name" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="visitor-email">Email</label>
                <input id="visitor-email" name="email" type="email" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="visit-date">Preferred Date</label>
                <input id="visit-date" name="date" type="date" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="visit-reason">Reason for Visit</label>
                <textarea id="visit-reason" name="reason" className="form-textarea" required />
              </div>
              <button type="submit" className="btn btn-green">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
