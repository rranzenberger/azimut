'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const inputStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
};

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Administrador',
  EDITOR: 'Editor',
  VIEWER: 'Visualizador',
};

export function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [changingPassword, setChangingPassword] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao carregar usuários');
      }

      setUsers(data.users || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(userId: string, userEmail: string) {
    if (!confirm(`Tem certeza que deseja deletar o usuário ${userEmail}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao deletar usuário');
      }

      await loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#9f9bb0' }}>
        Carregando usuários...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        marginBottom: 24,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
          Gerenciamento de Usuários
        </h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(201,35,55,0.3)',
            background: 'rgba(201,35,55,0.1)',
            color: '#fca5a5',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {showCreateForm ? 'Cancelar' : '+ Novo Usuário'}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid rgba(201,35,55,0.35)',
            background: 'rgba(201,35,55,0.12)',
            color: '#fca5a5',
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {showCreateForm && (
        <CreateUserForm
          onSuccess={() => {
            setShowCreateForm(false);
            loadUsers();
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <div style={{ display: 'grid', gap: 12 }}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => setEditingUser(user.id)}
            onDelete={() => handleDelete(user.id, user.email)}
            onChangePassword={() => setChangingPassword(user.id)}
          />
        ))}
      </div>

      {editingUser && (
        <EditUserModal
          userId={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            setEditingUser(null);
            loadUsers();
          }}
        />
      )}

      {changingPassword && (
        <ChangePasswordModal
          userId={changingPassword}
          onClose={() => setChangingPassword(null)}
        />
      )}
    </div>
  );
}

function UserCard({
  user,
  onEdit,
  onDelete,
  onChangePassword,
}: {
  user: any;
  onEdit: () => void;
  onDelete: () => void;
  onChangePassword: () => void;
}) {
  const roleColors: Record<string, { bg: string; text: string }> = {
    SUPER_ADMIN: { bg: 'rgba(201,35,55,0.15)', text: '#fca5a5' },
    ADMIN: { bg: 'rgba(251,191,36,0.15)', text: '#fde047' },
    EDITOR: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' },
    VIEWER: { bg: 'rgba(156,163,175,0.15)', text: '#d1d5db' },
  };

  const roleColor = roleColors[user.role] || roleColors.VIEWER;

  return (
    <div
      style={{
        padding: '16px 18px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{user.email}</div>
          <span
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 999,
              background: roleColor.bg,
              color: roleColor.text,
              border: `1px solid ${roleColor.text}40`,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {roleLabels[user.role] || user.role}
          </span>
        </div>
        {user.name && (
          <div style={{ color: '#9f9bb0', fontSize: 13 }}>{user.name}</div>
        )}
        <div style={{ color: '#8f8ba2', fontSize: 12, marginTop: 4 }}>
          Criado em {new Date(user.createdAt).toLocaleDateString('pt-BR')}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onChangePassword}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid rgba(59,130,246,0.3)',
            background: 'rgba(59,130,246,0.1)',
            color: '#93c5fd',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Trocar Senha
        </button>
        <button
          onClick={onEdit}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid rgba(251,191,36,0.3)',
            background: 'rgba(251,191,36,0.1)',
            color: '#fde047',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid rgba(239,68,68,0.3)',
            background: 'rgba(239,68,68,0.1)',
            color: '#fca5a5',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

function CreateUserForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'EDITOR',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name || null,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar usuário');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 20,
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.2)',
        marginBottom: 20,
      }}
    >
      <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Criar Novo Usuário</h3>
      
      {error && (
        <div
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid rgba(201,35,55,0.35)',
            background: 'rgba(201,35,55,0.12)',
            color: '#fca5a5',
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Nome</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Senha *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={inputStyle}
              minLength={6}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Confirmar Senha *</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={inputStyle}
              minLength={6}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Permissão</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={inputStyle}
          >
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Administrador</option>
            <option value="VIEWER">Visualizador</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: loading ? 'rgba(201,35,55,0.5)' : '#c92337',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}

function EditUserModal({
  userId,
  onClose,
  onSuccess,
}: {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'EDITOR',
  });

  useEffect(() => {
    loadUser();
  }, [userId]);

  async function loadUser() {
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao carregar usuário');
      }

      setUser(data.user);
      setFormData({
        email: data.user.email,
        name: data.user.name || '',
        role: data.user.role,
      });
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao atualizar usuário');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: '#1a1625',
            padding: 24,
            borderRadius: 16,
            maxWidth: 500,
            width: '90%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ color: '#9f9bb0' }}>Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1a1625',
          padding: 24,
          borderRadius: 16,
          maxWidth: 500,
          width: '90%',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>Editar Usuário</h3>

        {error && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid rgba(201,35,55,0.35)',
              background: 'rgba(201,35,55,0.12)',
              color: '#fca5a5',
              marginBottom: 16,
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Permissão</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={inputStyle}
            >
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Administrador</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Visualizador</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: loading ? 'rgba(201,35,55,0.5)' : '#c92337',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChangePasswordModal({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Nova senha e confirmação não coincidem');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao alterar senha');
      }

      setMessage('Senha alterada com sucesso!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1a1625',
          padding: 24,
          borderRadius: 16,
          maxWidth: 500,
          width: '90%',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>Trocar Senha</h3>

        {(error || message) && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: `1px solid ${
                message ? 'rgba(34,197,94,0.35)' : 'rgba(201,35,55,0.35)'
              }`,
              background: message
                ? 'rgba(34,197,94,0.12)'
                : 'rgba(201,35,55,0.12)',
              color: message ? '#86efac' : '#fca5a5',
              marginBottom: 16,
              fontSize: 13,
            }}
          >
            {message || error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Senha Atual *</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Nova Senha *</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              required
              style={inputStyle}
              minLength={6}
            />
            <small style={{ color: '#8f8ba2', fontSize: 12 }}>
              Mínimo 6 caracteres
            </small>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Confirmar Nova Senha *</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={inputStyle}
              minLength={6}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: loading ? 'rgba(201,35,55,0.5)' : '#c92337',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

