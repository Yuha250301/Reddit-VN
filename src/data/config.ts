export interface ConfigData {
  isFull: boolean;
}
const RVN_CONFIG = "rvn_config";

export class ConfigManager {
  private isFull: boolean;
  constructor() {
    this.isFull = true;
    try {
      const data = localStorage.getItem(RVN_CONFIG);
      if (data) {
        const config: ConfigData = JSON.parse(data);
        this.isFull = config.isFull;
      }
    } catch (err) {
      console.log("ClientStorage Err: can't parse user data");
    }
  }
  updateConfig(data: ConfigData) {
    localStorage.setItem(RVN_CONFIG, JSON.stringify(data));
    this.isFull = data.isFull;
  }
  removeUser() {
    localStorage.removeItem(RVN_CONFIG);
    this.isFull = true;
  }
  getIsFull() {
    return this.isFull;
  }
  setIsFull(isFull: boolean) {
    this.isFull = isFull;
    localStorage.setItem(
      RVN_CONFIG,
      JSON.stringify({
        isFull,
      }),
    );
  }
}
const configManager = new ConfigManager();
export default configManager;
