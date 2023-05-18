import { AppMode } from "./app";

export type AppBasicInfo = {
  id: string;
  name: string;
  mode: AppMode;
  icon: null;
  icon_background: null;
}

export type App = {
  app: AppBasicInfo;
  app_id: string;
  description: string;
  copyright: string;
  privacy_policy: string;
  category: string;
  position: number;
  is_listed: boolean;
  install_count: number;
  installed: boolean;
  editable: boolean;
}