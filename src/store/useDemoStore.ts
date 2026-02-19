'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { guideStepLabels, initialLogbook } from '@/mock/incident';

export type IncidentStatus = 'ALERTA' | 'EMERGENCIA_SIT_0' | 'EMERGENCIA_SIT_1' | 'DESACTIVADO';

export type WindowType =
  | 'about'
  | 'guide'
  | 'alert'
  | 'polrep'
  | 'directory'
  | 'source-posidonia'
  | 'source-due'
  | 'source-aemet'
  | 'source-simulator'
  | 'source-traffic'
  | 'cctv'
  | 'virtual-room'
  | 'calls'
  | 'notices'
  | 'scenario'
  | 'simulacro';

type LogEntry = {
  id: string;
  timestamp: string;
  actor: string;
  message: string;
};

type GuideStep = { id: number; label: string; checked: boolean };
type AlertFormData = {
  instalacion: string;
  lugar: string;
  hora: string;
  producto: string;
  responsable: string;
  nivelInicial: string;
  observaciones: string;
};

type PolrepFormData = {
  referencia: string;
  fechaHora: string;
  ubicacion: string;
  emisor: string;
  resumen: string;
  acciones: string;
};


type NoticePin = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  priority: 'normal' | 'high';
};

export type NotificationItem = {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'warning';
  createdAt: string;
  windowType?: WindowType;
  windowTitle?: string;
};

type WindowState = { id: string; type: WindowType; title: string };

type DemoStore = {
  selectedPortId?: string;
  selectedZoneId?: string;
  incidentStatus: IncidentStatus;
  currentRole: 'OC' | 'PUERTO';
  overlaysEnabled: boolean;
  logbook: LogEntry[];
  guideSteps: GuideStep[];
  openWindows: WindowState[];
  notifications: NotificationItem[];
  notificationHistory: NotificationItem[];
  activeNotification: NotificationItem | null;
  pendingActionCount: number;
  lastAction: string;
  alertDraft: AlertFormData;
  polrepDraft: PolrepFormData;
  noticePins: NoticePin[];
  guideData: {
    producto: string;
    lugar: string;
    horaAviso: string;
    responsable: string;
    observaciones: string;
  };
  setPort: (portId: string) => void;
  setZone: (zoneId: string) => void;
  setIncidentStatus: (status: IncidentStatus, actor?: string) => void;
  addLog: (message: string, actor?: string) => void;
  toggleOverlay: () => void;
  openWindow: (type: WindowType, title: string) => void;
  closeWindow: (id: string) => void;
  closeWindowByType: (type: WindowType) => void;
  enqueueNotification: (input: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
  dismissActiveNotification: () => void;
  saveAlertDraft: (payload: AlertFormData) => void;
  savePolrepDraft: (payload: PolrepFormData) => void;
  addNoticePin: (lat: number, lng: number, label?: string) => void;
  updateNoticePin: (id: string, patch: Partial<Pick<NoticePin, 'label' | 'priority'>>) => void;
  removeNoticePin: (id: string) => void;
  checkGuideStep: (id: number) => void;
  setGuideData: (field: keyof DemoStore['guideData'], value: string) => void;
  resetDemo: () => void;
};

const makeGuideSteps = (): GuideStep[] => guideStepLabels.map((label, index) => ({ id: index + 1, label, checked: false }));

const initialState = {
  incidentStatus: 'ALERTA' as IncidentStatus,
  currentRole: 'OC' as const,
  overlaysEnabled: false,
  logbook: initialLogbook,
  guideSteps: makeGuideSteps(),
  openWindows: [],
  notifications: [],
  notificationHistory: [],
  activeNotification: null,
  pendingActionCount: 0,
  lastAction: 'Sistema inicializado',
  alertDraft: {
    instalacion: '',
    lugar: '',
    hora: '',
    producto: '',
    responsable: '',
    nivelInicial: '',
    observaciones: ''
  },
  polrepDraft: {
    referencia: '',
    fechaHora: '',
    ubicacion: '',
    emisor: '',
    resumen: '',
    acciones: ''
  },
  noticePins: [
    { id: 'pin-1', lat: 28.138, lng: -15.417, label: 'Aviso inicial', priority: 'normal' }
  ],
  guideData: {
    producto: '',
    lugar: '',
    horaAviso: '',
    responsable: '',
    observaciones: ''
  }
};

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPort: (selectedPortId) => set({ selectedPortId }),
      setZone: (selectedZoneId) => set({ selectedZoneId }),
      setIncidentStatus: (incidentStatus, actor = 'Operador') =>
        set((state) => ({
          incidentStatus,
          logbook: [
            {
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
              actor,
              message: `Estado actualizado a ${incidentStatus.replaceAll('_', ' ')}`
            },
            ...state.logbook
          ]
        })),
      addLog: (message, actor = 'Operador') =>
        set((state) => ({
          logbook: [{ id: crypto.randomUUID(), timestamp: new Date().toISOString(), actor, message }, ...state.logbook],
          lastAction: `${actor}: ${message}`
        })),
      toggleOverlay: () => set((state) => ({ overlaysEnabled: !state.overlaysEnabled })),
      openWindow: (type, title) =>
        set((state) => {
          const exists = state.openWindows.find((window) => window.type === type);
          if (exists) {
            return { ...state, lastAction: `Ventana enfocada: ${title}` };
          }
          return {
            openWindows: [...state.openWindows, { id: crypto.randomUUID(), type, title }],
            lastAction: `Ventana abierta: ${title}`
          };
        }),
      closeWindow: (id) => set((state) => ({ openWindows: state.openWindows.filter((window) => window.id !== id) })),
      closeWindowByType: (type) =>
        set((state) => ({
          openWindows: state.openWindows.filter((window) => window.type !== type),
          lastAction: `Ventana completada: ${type}`
        })),
      enqueueNotification: (input) =>
        set((state) => {
          const item = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
          if (!state.activeNotification) {
            return {
              activeNotification: item,
              notificationHistory: [item, ...state.notificationHistory].slice(0, 50),
              lastAction: `Notificación: ${input.message}`
            };
          }
          return {
            notifications: [...state.notifications, item],
            notificationHistory: [item, ...state.notificationHistory].slice(0, 50),
            pendingActionCount: state.pendingActionCount + 1,
            lastAction: `Notificación en cola: ${input.message}`
          };
        }),
      dismissActiveNotification: () =>
        set((state) => {
          const [next, ...rest] = state.notifications;
          return {
            activeNotification: next ?? null,
            notifications: rest,
            pendingActionCount: Math.max(0, state.pendingActionCount - 1)
          };
        }),
      saveAlertDraft: (payload) => set({ alertDraft: payload, lastAction: 'Formulario Alerta guardado (mock).' }),
      savePolrepDraft: (payload) => set({ polrepDraft: payload, lastAction: 'Formulario POLREP guardado (mock).' }),
      addNoticePin: (lat, lng, label = 'Nuevo aviso') =>
        set((state) => ({
          noticePins: [...state.noticePins, { id: crypto.randomUUID(), lat, lng, label, priority: 'normal' }],
          lastAction: `Chincheta añadida en ${lat.toFixed(4)}, ${lng.toFixed(4)}`
        })),

      updateNoticePin: (id, patch) =>
        set((state) => ({
          noticePins: state.noticePins.map((pin) => (pin.id === id ? { ...pin, ...patch } : pin)),
          lastAction: 'Aviso actualizado en el mapa.'
        })),
      removeNoticePin: (id) =>
        set((state) => ({
          noticePins: state.noticePins.filter((pin) => pin.id !== id),
          lastAction: 'Aviso eliminado del mapa.'
        })),
      checkGuideStep: (id) =>
        set((state) => ({
          guideSteps: state.guideSteps.map((step) => (step.id === id ? { ...step, checked: !step.checked } : step))
        })),
      setGuideData: (field, value) => set((state) => ({ guideData: { ...state.guideData, [field]: value } })),
      resetDemo: () => set({ ...initialState, logbook: [...initialLogbook], guideSteps: makeGuideSteps() })
    }),
    {
      name: 'asda-pim-demo-store',
      partialize: (state) => ({
        selectedPortId: state.selectedPortId,
        selectedZoneId: state.selectedZoneId,
        incidentStatus: state.incidentStatus,
        overlaysEnabled: state.overlaysEnabled,
        logbook: state.logbook,
        guideSteps: state.guideSteps,
        notifications: state.notifications,
        activeNotification: state.activeNotification,
        notificationHistory: state.notificationHistory,
        pendingActionCount: state.pendingActionCount,
        lastAction: state.lastAction,
        alertDraft: state.alertDraft,
        polrepDraft: state.polrepDraft,
        noticePins: state.noticePins,
        guideData: state.guideData
      })
    }
  )
);
