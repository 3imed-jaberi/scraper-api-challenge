export interface RenderEngineConfigurationParam {
  html: string;
  render: boolean;
  screenshot: boolean;
}

export interface IRenderUIService {
  setScreenshotFolderName: (screenshotFolderName: string) => IRenderUIService;
  mount: (renderEngineConfiguration: RenderEngineConfigurationParam) => void;
}
