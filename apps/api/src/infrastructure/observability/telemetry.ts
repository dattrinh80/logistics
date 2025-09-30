import { Logger } from '@nestjs/common';

let initialized = false;

export function initializeTelemetry(): void {
  if (initialized) {
    return;
  }

  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  if (endpoint) {
    Logger.log(`OpenTelemetry exporter configured at ${endpoint}`, 'Telemetry');
  } else {
    Logger.warn('OpenTelemetry exporter endpoint not set; skipping telemetry setup', 'Telemetry');
  }

  initialized = true;
}
