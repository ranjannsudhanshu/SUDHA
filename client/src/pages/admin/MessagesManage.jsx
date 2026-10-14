import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiMail, FiCheck } from 'react-icons/fi';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import { LoadingState, EmptyState, ErrorState } from '../../components/public/StateViews.jsx';
import { getMessages, markMessageRead, deleteMessage } from '../../services/miscServices.js';

export default function MessagesManage() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('loading');
  const [deletingId, setDeletingId] = useState(null);

  const load = () => {
    setStatus('loading');
    getMessages()
      .then((data) => {
        setMessages(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  const handleMarkRead = async (id) => {
    try {
      const updated = await markMessageRead(id);
      setMessages((prev) => prev.map((m) => (m._id === id ? updated : m)));
    } catch {
      toast.error('Could not update message');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMessage(deletingId);
      toast.success('Message deleted');
      setDeletingId(null);
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Messages</h1>
      <p className="mt-1 text-sm text-muted">Submissions from your contact form.</p>

      <div className="mt-8">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && messages.length === 0 && (
          <EmptyState title="No messages yet" description="Messages sent through your contact form appear here." />
        )}

        {status === 'ready' && messages.length > 0 && (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg._id} className={`card p-4 ${!msg.read ? 'border-accent/40' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text">
                      {msg.name} <span className="font-normal text-muted">· {msg.email}</span>
                    </p>
                    <p className="mt-2 text-sm text-muted">{msg.message}</p>
                    <p className="mt-2 text-xs text-muted">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      disabled={msg.read}
                      className="rounded-md p-2 text-muted hover:bg-surface2 hover:text-text disabled:opacity-30"
                      aria-label="Mark as read"
                    >
                      {msg.read ? <FiCheck size={16} /> : <FiMail size={16} />}
                    </button>
                    <button
                      onClick={() => setDeletingId(msg._id)}
                      className="rounded-md p-2 text-muted hover:bg-surface2 hover:text-accent"
                      aria-label="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deletingId && (
        <ConfirmDialog
          description="This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
