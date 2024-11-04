import React from 'react';
import './TicketCard.css';
import highPriority from '../images/Img - High Priority.svg';
import lowPriority from '../images/Img - Low Priority.svg';
import mediumPriority from '../images/Img - Medium Priority.svg';
import noPriority from '../images/No-priority.svg';
import urgentPriorityColor from '../images/SVG - Urgent Priority colour.svg';
import display from '../images/Display.svg';

function TicketCard({ ticket, user }) {
  const getPriorityIcon = (priority) => {
    const icons = {
      4: urgentPriorityColor,
      3: highPriority,
      2: mediumPriority,
      1: lowPriority,
      0: noPriority
    };
    return icons[priority];
  };

  if (!user) return null;

  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          <img 
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
            alt={user.name}
          />
          <span className={`status-indicator ${user.available ? 'available' : ''}`}>
            <img src={display} alt="Status" />
          </span>
        </div>
      </div>
      <div className="card-title">
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-footer">
        <img 
          src={getPriorityIcon(ticket.priority)} 
          alt={`Priority ${ticket.priority}`}
          className="priority-icon" 
        />
        {ticket.tag && ticket.tag.length > 0 && (
          <div className="tag">
            <span className="dot"></span>
            <span>{ticket.tag[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketCard;