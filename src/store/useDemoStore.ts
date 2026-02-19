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

type NotificationItem = {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'warning';
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
  activeNotification: NotificationItem | null;
  pendingActionCount: number;
  lastAction: string;
  alertDraft: AlertFormData;
  polrepDraft: PolrepFormData;
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
  enqueueNotification: (input: Omit<NotificationItem, 'id'>) => void;
  dismissActiveNotification: () => void;
  saveAlertDraft: (payload: AlertFormData) => void;
  savePolrepDraft: (payload: PolrepFormData) => void;
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
      enqueueNotification: (input) =>
        set((state) => {
          const item = { ...input, id: crypto.randomUUID() };
          if (!state.activeNotification) {
            return { activeNotification: item, lastAction: `Notificación: ${input.message}` };
          }
          return {
            notifications: [...state.notifications, item],
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
        pendingActionCount: state.pendingActionCount,
        lastAction: state.lastAction,
        alertDraft: state.alertDraft,
        polrepDraft: state.polrepDraft,
        guideData: state.guideData
      })
    }
  )
);
