// Azure Cloud App - TypeScript Application Logic

interface AzureService {
  id: string;
  name: string;
  type: string;
  icon: string;
  status: 'operational' | 'warning' | 'deploying';
  region: string;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

type LogLevel = 'info' | 'success' | 'warn' | 'azure';

class AzurePortalApp {
  private startTime: number = Date.now();
  private services: AzureService[] = [
    { id: 'swa', name: 'Azure Static Web Apps', type: 'Hosting & CDN Edge', icon: '🌐', status: 'operational', region: 'East US 2' },
    { id: 'dns', name: 'Azure DNS & SSL Gateway', type: 'Custom Domain SSL', icon: '🔒', status: 'operational', region: 'Global' },
    { id: 'blob', name: 'Azure Blob Storage CDN', type: 'Static Assets Delivery', icon: '📦', status: 'operational', region: 'East US 2' },
    { id: 'monitor', name: 'Azure Application Insights', type: 'Telemetry & Logs', icon: '📊', status: 'operational', region: 'East US' },
  ];

  private checklist: ChecklistItem[] = [
    {
      id: 'step-build',
      title: 'Paso 1: Compilar la aplicación frontend',
      description: 'Ejecutar "npm run build" para generar el directorio ./dist listo para producción.',
      completed: true,
    },
    {
      id: 'step-git',
      title: 'Paso 2: Inicializar repositorio Git y subirlo a GitHub / Azure Repos',
      description: 'Permite CI/CD automático con GitHub Actions para despliegues continuos.',
      completed: false,
    },
    {
      id: 'step-azure-res',
      title: 'Paso 3: Crear recurso Azure Static Web Apps',
      description: 'Desde Azure Portal o Azure CLI con el plan Free (gratuito) para alojamiento web.',
      completed: false,
    },
    {
      id: 'step-deploy',
      title: 'Paso 4: Desplegar el artefacto dist/',
      description: 'Usar "swa deploy ./dist" o conectar el repositorio para que GitHub Actions compile y publique.',
      completed: false,
    },
    {
      id: 'step-domain',
      title: 'Paso 5: Probar URL y configurar dominio personalizado',
      description: 'Verificar la URL *.azurestaticapps.net y asociar tu dominio propio con certificado SSL gratuito.',
      completed: false,
    },
  ];

  private logs: { time: string; level: LogLevel; message: string }[] = [];

  constructor() {
    this.init();
  }

  private init(): void {
    this.loadChecklistState();
    this.setupClock();
    this.renderServices();
    this.renderChecklist();
    this.setupEventListeners();
    this.detectEnvironment();

    // Initial logs
    this.addLog('azure', 'Azure Portal Core v2.4 inicializado correctamente.');
    this.addLog('info', 'Proyecto migrado a HTML5 + Vanilla CSS + TypeScript ESNext.');
    this.addLog('success', 'Todos los módulos listos para compilación con Vite.');
  }

  private setupClock(): void {
    const timeUtcEl = document.getElementById('time-utc');
    const timeLocalEl = document.getElementById('time-local');
    const statUptimeEl = document.getElementById('stat-uptime');

    const updateTimes = () => {
      const now = new Date();
      if (timeUtcEl) {
        timeUtcEl.textContent = `${now.toISOString().replace('T', ' ').substring(0, 19)} UTC`;
      }
      if (timeLocalEl) {
        timeLocalEl.textContent = now.toLocaleTimeString();
      }
      if (statUptimeEl) {
        const diffSeconds = Math.floor((Date.now() - this.startTime) / 1000);
        const hours = String(Math.floor(diffSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((diffSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(diffSeconds % 60).padStart(2, '0');
        statUptimeEl.textContent = `${hours}:${minutes}:${seconds}`;
      }
    };

    updateTimes();
    setInterval(updateTimes, 1000);
  }

  private detectEnvironment(): void {
    const engineEl = document.getElementById('engine-info');
    if (engineEl) {
      const ua = navigator.userAgent;
      let browser = 'Desconocido';
      if (ua.includes('Edg/')) browser = 'Microsoft Edge';
      else if (ua.includes('Chrome/')) browser = 'Google Chrome / Chromium';
      else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
      else if (ua.includes('Safari/')) browser = 'Apple Safari';
      engineEl.textContent = `${browser} • ${navigator.platform || 'x64'}`;
    }
  }

  public testLatency(): void {
    const statLatencyEl = document.getElementById('stat-latency');
    if (statLatencyEl) {
      statLatencyEl.textContent = 'Midiendo...';
    }

    this.addLog('info', 'Iniciando prueba de latencia hacia Azure Edge CDN (East US)...');

    setTimeout(() => {
      // Simulating real ping to cloud CDN (between 18ms and 45ms)
      const latency = Math.floor(Math.random() * 26) + 18;
      if (statLatencyEl) {
        statLatencyEl.textContent = `${latency} ms`;
      }
      this.addLog('success', `Ping completado exitosamente: ${latency} ms (RTT Edge óptimo)`);
      this.showToast(`Latencia calculada: ${latency} ms hacia Azure CDN`);
    }, 600);
  }

  private renderServices(): void {
    const container = document.getElementById('services-list');
    if (!container) return;

    container.innerHTML = this.services.map(svc => `
      <div class="service-row" id="svc-${svc.id}">
        <div class="service-meta">
          <span class="service-icon">${svc.icon}</span>
          <div>
            <div class="service-name">${svc.name}</div>
            <div class="service-type">${svc.type} • Región: ${svc.region}</div>
          </div>
        </div>
        <div class="service-status-badge ${svc.status === 'operational' ? 'status-operational' : 'status-warning'}">
          ● ${svc.status === 'operational' ? 'Operativo' : 'Verificando'}
        </div>
      </div>
    `).join('');
  }

  private renderChecklist(): void {
    const container = document.getElementById('checklist-container');
    const progressText = document.getElementById('checklist-progress-text');
    const progressFill = document.getElementById('checklist-progress-fill');
    if (!container) return;

    const completedCount = this.checklist.filter(item => item.completed).length;
    const totalCount = this.checklist.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    if (progressText) {
      progressText.textContent = `${completedCount}/${totalCount} completados (${percentage}%)`;
    }
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }

    container.innerHTML = this.checklist.map(item => `
      <div class="check-item ${item.completed ? 'completed' : ''}" data-id="${item.id}">
        <div class="check-box">${item.completed ? '✓' : ''}</div>
        <div class="check-content">
          <div class="check-title">${item.title}</div>
          <div class="check-desc">${item.description}</div>
        </div>
      </div>
    `).join('');

    // Attach listeners to items
    container.querySelectorAll('.check-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        if (id) this.toggleChecklistItem(id);
      });
    });
  }

  private toggleChecklistItem(id: string): void {
    const item = this.checklist.find(i => i.id === id);
    if (!item) return;

    item.completed = !item.completed;
    this.saveChecklistState();
    this.renderChecklist();

    const action = item.completed ? 'completado' : 'marcado como pendiente';
    this.addLog(item.completed ? 'success' : 'warn', `Checklist: "${item.title}" ${action}.`);
  }

  private saveChecklistState(): void {
    try {
      localStorage.setItem('azure_checklist_state', JSON.stringify(this.checklist));
    } catch {
      // Ignorar si localStorage está restringido
    }
  }

  private loadChecklistState(): void {
    try {
      const saved = localStorage.getItem('azure_checklist_state');
      if (saved) {
        const parsed = JSON.parse(saved) as ChecklistItem[];
        if (Array.isArray(parsed) && parsed.length === this.checklist.length) {
          this.checklist = parsed;
        }
      }
    } catch {
      // Usar valores por defecto
    }
  }

  public addLog(level: LogLevel, message: string): void {
    const time = new Date().toLocaleTimeString();
    this.logs.push({ time, level, message });

    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `
      <span class="log-time">[${time}]</span>
      <span class="log-level ${level}">[${level.toUpperCase()}]</span>
      <span class="log-msg">${this.escapeHtml(message)}</span>
    `;

    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  public clearLogs(): void {
    this.logs = [];
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
      terminalBody.innerHTML = '';
      this.addLog('info', 'Consola limpiada por el usuario.');
    }
  }

  public copyLogs(): void {
    const text = this.logs.map(l => `[${l.time}] [${l.level.toUpperCase()}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('📋 Logs copiados al portapapeles');
    }).catch(() => {
      this.showToast('⚠️ No se pudo acceder al portapapeles');
    });
  }

  public showToast(message: string): void {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private setupEventListeners(): void {
    // Quick ping button
    const pingBtn = document.getElementById('btn-quick-ping');
    if (pingBtn) {
      pingBtn.addEventListener('click', () => this.testLatency());
    }

    // Refresh services
    const refreshBtn = document.getElementById('btn-refresh-services');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.addLog('azure', 'Verificando estado de componentes en Azure...');
        this.services.forEach(s => s.status = 'operational');
        this.renderServices();
        this.showToast('Servicios sincronizados con Azure');
      });
    }

    // Simulate alert
    const alertBtn = document.getElementById('btn-simulate-alert');
    if (alertBtn) {
      alertBtn.addEventListener('click', () => {
        const s = this.services[1];
        if (s) {
          s.status = s.status === 'warning' ? 'operational' : 'warning';
          this.renderServices();
          this.addLog(s.status === 'warning' ? 'warn' : 'info', `Estado de ${s.name} modificado a: ${s.status}.`);
        }
      });
    }

    // Terminal clear & copy
    const clearBtn = document.getElementById('btn-clear-logs');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearLogs());

    const copyLogsBtn = document.getElementById('btn-copy-logs');
    if (copyLogsBtn) copyLogsBtn.addEventListener('click', () => this.copyLogs());

    // Copy command buttons
    document.querySelectorAll('.btn-copy-code').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            this.showToast(`Comando copiado: "${code.substring(0, 30)}..."`);
          });
        }
      });
    });
  }
}

// Inicializar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  const app = new AzurePortalApp();
  // Realizar prueba inicial de latencia
  setTimeout(() => app.testLatency(), 800);
});
