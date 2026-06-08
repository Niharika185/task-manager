import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const handleCreate = async (form) => {
    await api.post('/tasks', form);
    setShowForm(false);
    fetchTasks();
  };

  const handleEdit = async (form) => {
    await api.put(`/tasks/${editTask._id}`, form);
    setEditTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📋 Task Manager</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Hi, {user?.name}!</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.toolbar}>
          <div style={styles.filters}>
            {['All', 'Todo', 'In Progress', 'Done'].map(f => (
              <button key={f} style={{...styles.filterBtn, background: filter===f ? '#4f46e5' : 'white', color: filter===f ? 'white' : '#333'}}
                onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <button style={styles.addBtn} onClick={() => setShowForm(true)}>+ New Task</button>
        </div>

        {filtered.length === 0
          ? <p style={styles.empty}>No tasks found. Create one!</p>
          : filtered.map(task => (
              <TaskCard key={task._id} task={task}
                onEdit={setEditTask} onDelete={handleDelete} onStatusChange={handleStatusChange} />
            ))
        }
      </div>

      {showForm && <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}
      {editTask && <TaskForm initial={editTask} onSubmit={handleEdit} onCancel={() => setEditTask(null)} />}
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', background:'#f0f2f5' },
  navbar: { background:'#4f46e5', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' },
  logo: { color:'white', margin:0 },
  navRight: { display:'flex', alignItems:'center', gap:'1rem' },
  welcome: { color:'white', fontSize:'14px' },
  logoutBtn: { padding:'6px 14px', background:'white', color:'#4f46e5', border:'none', borderRadius:'5px', cursor:'pointer' },
  main: { maxWidth:'800px', margin:'2rem auto', padding:'0 1rem' },
  toolbar: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' },
  filters: { display:'flex', gap:'0.5rem', flexWrap:'wrap' },
  filterBtn: { padding:'6px 14px', border:'1px solid #ddd', borderRadius:'20px', cursor:'pointer', fontSize:'14px' },
  addBtn: { padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'14px' },
  empty: { textAlign:'center', color:'#888', marginTop:'3rem', fontSize:'16px' }
};

export default Dashboard;