import { useState } from 'react';

function TaskForm({ onSubmit, onCancel, initial }) {
  const [form, setForm] = useState(initial || { title: '', description: '', status: 'Todo', priority: 'Medium', dueDate: '' });

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>{initial ? 'Edit Task' : 'New Task'}</h3>
        <input style={styles.input} placeholder="Title" value={form.title}
          onChange={e => setForm({...form, title: e.target.value})} />
        <textarea style={styles.textarea} placeholder="Description" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} />
        <select style={styles.input} value={form.status}
          onChange={e => setForm({...form, status: e.target.value})}>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <select style={styles.input} value={form.priority}
          onChange={e => setForm({...form, priority: e.target.value})}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input style={styles.input} type="date" value={form.dueDate?.slice(0,10) || ''}
          onChange={e => setForm({...form, dueDate: e.target.value})} />
        <div style={styles.buttons}>
          <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button style={styles.submitBtn} onClick={() => onSubmit(form)}>
            {initial ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 },
  modal: { background:'white', padding:'2rem', borderRadius:'10px', width:'400px', boxShadow:'0 4px 20px rgba(0,0,0,0.2)' },
  title: { marginBottom:'1rem', color:'#333' },
  input: { width:'100%', padding:'10px', marginBottom:'1rem', borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box' },
  textarea: { width:'100%', padding:'10px', marginBottom:'1rem', borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box', height:'80px', resize:'vertical' },
  buttons: { display:'flex', gap:'1rem', justifyContent:'flex-end' },
  cancelBtn: { padding:'8px 16px', border:'1px solid #ddd', borderRadius:'5px', cursor:'pointer', background:'white' },
  submitBtn: { padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }
};

export default TaskForm;