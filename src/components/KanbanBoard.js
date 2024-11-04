import React, { useMemo } from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';
import threeDots from '../images/3 dot menu.svg';
import backlog from '../images/Backlog.svg';
import cancelled from '../images/Cancelled.svg';
import todo from '../images/To-do.svg';
import done from '../images/Done.svg';
import highPriority from '../images/Img - High Priority.svg';
import lowPriority from '../images/Img - Low Priority.svg';
import mediumPriority from '../images/Img - Medium Priority.svg';
import noPriority from '../images/No-priority.svg';
import urgentPriorityColor from '../images/SVG - Urgent Priority colour.svg';
import add from '../images/add.svg';
import inProgress from '../images/in-progress.svg';

function KanbanBoard({ tickets, users, grouping, ordering }) {
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

  const getPriorityLabel = (priority) => {
    const labels = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'None'
    };
    return labels[priority];
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Backlog': backlog,
      'Todo': todo,
      'InProgress': inProgress,
      'Done': done,
      'Canceled': cancelled
    };
    return icons[status] || todo;
  };

  const groupedTickets = useMemo(() => {
    let groups = {};

    if (grouping === 'status') {
      tickets.forEach(ticket => {
        if (!groups[ticket.status]) {
          groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      const userMap = {};
      users.forEach(user => {
        userMap[user.id] = user;
        groups[user.name] = [];
      });

      tickets.forEach(ticket => {
        const user = userMap[ticket.userId];
        if (user) {
          groups[user.name].push(ticket);
        }
      });
    } else if (grouping === 'priority') {
      [0, 1, 2, 3, 4].forEach(priority => {
        groups[priority] = [];
      });

      tickets.forEach(ticket => {
        groups[ticket.priority].push(ticket);
      });
    }


    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  }, [tickets, users, grouping, ordering]);

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, groupTickets]) => (
        <div key={group} className="column">
          <div className="column-header">
            <div className="header-left">
              {grouping === 'status' && (
                <img src={getStatusIcon(group)} alt={group} className="status-icon" />
              )}
              {grouping === 'priority' && (
                <>
                  <img 
                    src={getPriorityIcon(Number(group))} 
                    alt={`Priority ${group}`} 
                    className="priority-icon" 
                  />
                  <span>{getPriorityLabel(Number(group))}</span>
                </>
              )}
              {grouping !== 'priority' && (
                <span>{group}</span>
              )}
              <span className="ticket-count">{groupTickets.length}</span>
            </div>
            <div className="header-right">
              <button className="add-button">
                <img src={add} alt="Add" />
              </button>
              <button className="more-button">
                <img src={threeDots} alt="More options" />
              </button>
            </div>
          </div>
          <div className="tickets-container">
            {groupTickets.map(ticket => (
              <TicketCard 
                key={ticket.id}
                ticket={ticket}
                user={users.find(u => u.id === ticket.userId)}
              />
            ))}
          </div>
        </div>
      ))}

      {grouping === 'status' && !groupedTickets['Canceled'] && (
        <div key="Canceled" className="column">
          <div className="column-header">
            <div className="header-left">
              <img src={cancelled} alt="Canceled" className="status-icon" />
              <span>Canceled</span>
              <span className="ticket-count">0</span>
            </div>
            <div className="header-right">
              <button className="add-button">
                <img src={add} alt="Add" />
              </button>
              <button className="more-button">
                <img src={threeDots} alt="More options" />
              </button>
            </div>
          </div>
          <div className="tickets-container">
            { }
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;