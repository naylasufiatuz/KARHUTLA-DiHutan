import { NextResponse } from "next/server";
import { recordTelemetryInDb, getMonitoringLocationsFromDb } from "@/lib/supabase-backend";

/**
 * Endpoint Ingest Telemetri Sensor IoT (ESP32 / LoRa / WiFi / Simulator)
 * Format JSON:
 * {
 *   "deviceCode": "ESP32-KBR-01",
 *   "temperature": 29.5,
 *   "humidity": 72.0,
 *   "gasPpm": 186,
 *   "soilMoisture": 64.0,
 *   "waterLevelCm": -18
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const deviceCode = body.deviceCode || "ESP32-KBR-01";
    const temperature = Number(body.temperature ?? 28.5);
    const humidity = Number(body.humidity ?? 70);
    const gasPpm = Number(body.gasPpm ?? 150);
    const soilMoisture = Number(body.soilMoisture ?? 60);
    const waterLevelCm =
      body.waterLevelCm !== undefined ? Number(body.waterLevelCm) : undefined;

    const result = await recordTelemetryInDb({
      deviceCode,
      temperature,
      humidity,
      gasPpm,
      soilMoisture,
      waterLevelCm,
    });

    return NextResponse.json({
      success: true,
      message: "Data telemetri berhasil diterima dan diproses.",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const locations = await getMonitoringLocationsFromDb();
    return NextResponse.json({ success: true, data: locations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

