const priorityColors = { Low: '#22c55e', Medium: '#f59e0b', High: '#ef4444' };
const statusColors = { 'Todo': '#6b7280', 'In Progress': '#3b82f6', 'Done': '#22c55e' };

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => onEdit(task)}>Edit</button>
          <button style={styles.deleteBtn} onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
      {task.description && <p style={styles.desc}>{task.description}</p>}
      <div style={styles.footer}>
        <span style={{...styles.badge, background: priorityColors[task.priority]}}>{task.priority}</span>
        <select style={{...styles.statusSelect, color: statusColors[task.status]}}
          value={task.status} onChange={e => onStatusChange(task._id, e.target.value)}>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        {task.dueDate && <span style={styles.date}>📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
      </div>
    </div>
  );
}

const styles = {
  card: { background:'white', padding:'1rem', borderRadius:'8px', boxShadow:'0 1px 4px rgba(0,0,0,0.1)', marginBottom:'1rem' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' },
  title: { margin:0, color:'#333', fontSize:'16px' },
  actions: { display:'flex', gap:'0.5rem' },
  editBtn: { padding:'4px 10px', background:'#4f46e5', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px' },
  deleteBtn: { padding:'4px 10px', background:'#ef4444', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px' },
  desc: { color:'#666', fontSize:'14px', margin:'0 0 0.5rem' },
  footer: { display:'flex', alignItems:'center', gap:'0.5rem', flexWrap:'wrap' },
  badge: { padding:'2px 8px', borderRadius:'12px', color:'white', fontSize:'12px' },
  statusSelect: { padding:'4px 8px', borderRadius:'4px', border:'1px solid #ddd', fontSize:'12px', cursor:'pointer' },
  date: { fontSize:'12px', color:'#888' }
};

export default TaskCard;