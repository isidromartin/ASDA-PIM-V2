import { MapStage } from './MapStage';
import { MenuRibbon } from './MenuRibbon';
import { RightPanel } from './RightPanel';
import { StatusStrip } from './StatusStrip';
import { WindowManager } from './WindowManager';

export function AppFrame() {
  return (
    <div className="relative flex h-screen flex-col bg-slate-200">
      <MenuRibbon />
      <StatusStrip />
      <div className="relative flex flex-1 gap-0 p-3">
        <div className="relative flex-1">
          <MapStage />
          <WindowManager />
        </div>
        <RightPanel />
      </div>
    </div>
  );
}
