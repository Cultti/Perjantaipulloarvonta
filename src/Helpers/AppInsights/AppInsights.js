import { ApplicationInsights } from '@microsoft/applicationinsights-web'

class AppInsights {
    constructor() {
        if (!AppInsights.instance && process.env.REACT_APP_INSTRUMENTATION_KEY !== '#{INSTRUMENTATION_KEY}#') {
            AppInsights.instance = new ApplicationInsights({ config: {
                instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY,
                enableAutoRouteTracking: true
            } });
            AppInsights.instance.loadAppInsights();
        }
    }

    getInstance() {
        return AppInsights.instance;
    }
}

export default AppInsights