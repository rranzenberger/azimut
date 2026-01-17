'use client';

import { useState, useEffect } from 'react';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  value?: number;
  threshold?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Atualizar a cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/admin/analytics/alerts?days=7');
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (alerts.length === 0) {
    return null;
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const urgentAlerts = alerts.filter(a => a.priority === 'urgent');
  const highAlerts = alerts.filter(a => a.priority === 'high');

  return (
    <div className="space-y-3">
      {(urgentAlerts.length > 0 || highAlerts.length > 0) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-red-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            🔔 Alertas Importantes
            {urgentAlerts.length > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                {urgentAlerts.length} Urgente{urgentAlerts.length > 1 ? 's' : ''}
              </span>
            )}
          </h2>
          <div className="space-y-3">
            {[...urgentAlerts, ...highAlerts].slice(0, 5).map(alert => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      <span>{getAlertIcon(alert.type)}</span>
                      {alert.title}
                    </h3>
                    <p className="text-sm opacity-90">{alert.message}</p>
                    {alert.actionUrl && (
                      <a
                        href={alert.actionUrl}
                        className="text-sm font-semibold underline mt-2 inline-block"
                      >
                        Ver detalhes →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {alerts.filter(a => a.priority !== 'urgent' && a.priority !== 'high').length > 0 && (
        <details className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <summary className="cursor-pointer font-semibold text-gray-700">
            Mais alertas ({alerts.filter(a => a.priority !== 'urgent' && a.priority !== 'high').length})
          </summary>
          <div className="mt-3 space-y-2">
            {alerts.filter(a => a.priority !== 'urgent' && a.priority !== 'high').map(alert => (
              <div
                key={alert.id}
                className={`p-3 rounded border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-center gap-2">
                  <span>{getAlertIcon(alert.type)}</span>
                  <span className="font-medium">{alert.title}</span>
                </div>
                <p className="text-sm mt-1 opacity-90">{alert.message}</p>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
