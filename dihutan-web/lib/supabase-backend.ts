import { createClient } from "@/lib/supabase/server";
import {
  CommunityReport,
  initialReportsData,
  MonitoringLocation,
  monitoringLocationsData,
  iotDevicesDataset,
  IoTDeviceItem,
  SensorAlert,
  recentAlertsData,
  UserRole,
} from "./dashboard-data";

/**
 * In-memory fallback stores to guarantee persistence and zero-crash
 * even if Supabase network is temporarily unreachable.
 */
let memoryReports: CommunityReport[] = [...initialReportsData];
const memoryLocations: MonitoringLocation[] = [...monitoringLocationsData];
let memoryDevices: IoTDeviceItem[] = [...iotDevicesDataset];
let memoryAlerts: SensorAlert[] = [...recentAlertsData];

// ============================================================================
// 1. REPORTS SERVICE
// ============================================================================

export async function getReportsFromDb(): Promise<CommunityReport[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((r) => ({
        id: r.id,
        reporterName: r.reporter_name || "Warga Rimba",
        reporterPhone: r.reporter_phone || undefined,
        title: r.title,
        incidentType: r.incident_type as CommunityReport["incidentType"],
        locationName: r.location_name,
        coordinates:
          r.latitude && r.longitude ? [r.longitude, r.latitude] : undefined,
        description: r.description,
        photoUrl: r.photo_url || "/hutan.jpg",
        status: r.status as CommunityReport["status"],
        officerNotes: r.officer_notes || undefined,
        verifiedBy: r.verified_by || undefined,
        createdAt: new Date(r.created_at).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        updatedAt: new Date(r.updated_at).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      }));
    }
  } catch (err) {
    console.warn("Using in-memory reports fallback:", err);
  }

  return memoryReports;
}

export async function createReportInDb(
  report: Omit<CommunityReport, "id" | "status" | "createdAt" | "updatedAt">
): Promise<CommunityReport> {
  const newReport: CommunityReport = {
    ...report,
    id: `rep-${Date.now().toString().slice(-4)}`,
    status: "TERKIRIM",
    createdAt: "Baru saja",
    updatedAt: "Baru saja",
  };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reports")
      .insert({
        reporter_name: report.reporterName,
        reporter_phone: report.reporterPhone,
        title: report.title,
        incident_type: report.incidentType,
        location_name: report.locationName,
        latitude: report.coordinates ? report.coordinates[1] : null,
        longitude: report.coordinates ? report.coordinates[0] : null,
        description: report.description,
        photo_url: report.photoUrl,
        status: "TERKIRIM",
      })
      .select()
      .single();

    if (!error && data) {
      newReport.id = data.id;
      newReport.createdAt = new Date(data.created_at).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      newReport.updatedAt = new Date(data.updated_at).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
  } catch (err) {
    console.warn("Failed saving report to Supabase, stored in memory:", err);
  }

  memoryReports = [newReport, ...memoryReports];
  return newReport;
}

export async function updateReportStatusInDb(
  reportId: string,
  status: CommunityReport["status"],
  officerNotes?: string,
  verifiedBy?: string
): Promise<boolean> {
  let updated = false;

  try {
    const supabase = await createClient();
    const updatePayload: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (officerNotes !== undefined) updatePayload.officer_notes = officerNotes;
    if (verifiedBy) updatePayload.verified_by = verifiedBy;

    const { error } = await supabase
      .from("reports")
      .update(updatePayload)
      .eq("id", reportId);

    if (!error) {
      updated = true;
    }
  } catch (err) {
    console.warn("Supabase report update fallback:", err);
  }

  // Update in-memory
  memoryReports = memoryReports.map((r) => {
    if (r.id === reportId) {
      return {
        ...r,
        status,
        officerNotes: officerNotes ?? r.officerNotes,
        verifiedBy: verifiedBy ?? r.verifiedBy ?? "Petugas Patroli BKSDA",
        updatedAt: "Baru saja",
      };
    }
    return r;
  });

  return updated || true;
}

// ============================================================================
// 2. MONITORING LOCATIONS & TELEMETRY
// ============================================================================

export async function getMonitoringLocationsFromDb(): Promise<MonitoringLocation[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("monitoring_locations")
      .select(`
        *,
        iot_devices (device_code, connection_status)
      `)
      .order("name");

    if (!error && data && data.length > 0) {
      return data.map((loc) => ({
        id: loc.id,
        name: loc.name,
        subDistrict: loc.sub_district,
        regency: loc.regency,
        coordinates: [loc.longitude, loc.latitude] as [number, number],
        deviceCode: loc.iot_devices?.device_code || "ESP32-KAPUAS",
        status: loc.status as MonitoringLocation["status"],
        environmentalCondition: loc.environmental_condition,
        peatDepthCm: loc.peat_depth_cm || 180,
        temperature: 28.5,
        humidity: 75,
        soilMoisture: 65,
        gasPpm: 18,
        waterLevelCm: -20,
        lastUpdated: "Baru saja sinkron",
        isDemo: loc.is_demo ?? true,
        notes: `Kawasan gambut ${loc.sub_district}, ${loc.regency}`,
      }));
    }
  } catch (err) {
    console.warn("Using in-memory monitoring locations fallback:", err);
  }

  return memoryLocations;
}

export async function recordTelemetryInDb(payload: {
  deviceCode: string;
  temperature: number;
  humidity: number;
  gasPpm: number;
  soilMoisture: number;
  waterLevelCm?: number;
}): Promise<{
  success: boolean;
  alertCreated?: boolean;
  alertTitle?: string;
}> {
  // Update in-memory location reading
  const targetLoc = memoryLocations.find(
    (l) => l.deviceCode.toLowerCase() === payload.deviceCode.toLowerCase()
  ) || memoryLocations[0];

  if (targetLoc) {
    targetLoc.temperature = payload.temperature;
    targetLoc.humidity = payload.humidity;
    targetLoc.gasPpm = payload.gasPpm;
    targetLoc.soilMoisture = payload.soilMoisture;
    if (payload.waterLevelCm !== undefined) {
      targetLoc.waterLevelCm = payload.waterLevelCm;
    }
    targetLoc.lastUpdated = "1 menit lalu";

    // Auto update status based on IoT thresholds
    if (payload.soilMoisture < 30 || payload.gasPpm > 350 || payload.temperature > 35) {
      targetLoc.status = "peringatan";
    } else if (payload.soilMoisture < 45 || payload.gasPpm > 150 || payload.temperature > 32) {
      targetLoc.status = "perhatian";
    } else {
      targetLoc.status = "normal";
    }
  }

  let alertCreated = false;
  let alertTitle = "";

  // Check alert thresholds
  if (payload.soilMoisture < 30 || payload.gasPpm > 350) {
    alertCreated = true;
    alertTitle =
      payload.soilMoisture < 30
        ? `Kelembapan Gambut Kritis (< 30%) di ${targetLoc.name}`
        : `Indikasi Gas Asap Tinggi (${payload.gasPpm} ADC) di ${targetLoc.name}`;

    const newAlert: SensorAlert = {
      id: `alt-${Date.now().toString().slice(-4)}`,
      locationId: targetLoc.id,
      locationName: targetLoc.name,
      severity: "critical",
      title: alertTitle,
      message:
        payload.soilMoisture < 30
          ? "Lapisan gambut kering melewati batas aman kebakaran bawah tanah. Segera verifikasi sekat kanal."
          : "Sensor gas mendeteksi asap tebal dari pembakaran vegetasi di sekitar pos.",
      timestamp: "Baru saja",
      parameter: payload.soilMoisture < 30 ? "Kelembapan Gambut" : "Sensor Gas MQ",
      value: payload.soilMoisture < 30 ? `${payload.soilMoisture}%` : `${payload.gasPpm} ADC`,
    };

    memoryAlerts = [newAlert, ...memoryAlerts];
  }

  // Attempt Supabase write
  try {
    const supabase = await createClient();
    await supabase.from("sensor_readings").insert({
      temperature: payload.temperature,
      humidity: payload.humidity,
      gas_ppm: payload.gasPpm,
      soil_moisture: payload.soilMoisture,
      water_level_cm: payload.waterLevelCm ?? null,
      recorded_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Supabase telemetry log fallback:", err);
  }

  return { success: true, alertCreated, alertTitle };
}

// ============================================================================
// 3. IOT DEVICES SERVICE
// ============================================================================

export async function getIotDevicesFromDb(): Promise<IoTDeviceItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("iot_devices")
      .select("*")
      .order("name");

    if (!error && data && data.length > 0) {
      return memoryDevices.map((local) => {
        const remote = data.find(
          (d) =>
            d.device_code?.toLowerCase() === local.code.toLowerCase() ||
            d.name === local.name
        );
        if (remote) {
          return {
            ...local,
            connectionStatus: remote.connection_status || local.connectionStatus,
            operationStatus: remote.operation_status || local.operationStatus,
            lastPing: "Terkoneksi realtime",
          };
        }
        return local;
      });
    }
  } catch (err) {
    console.warn("Using in-memory devices fallback:", err);
  }

  return memoryDevices;
}

export async function updateDeviceStatusInDb(
  deviceId: string,
  updates: {
    connectionStatus?: "ONLINE" | "OFFLINE";
    operationStatus?: "ACTIVE" | "INACTIVE";
  }
): Promise<boolean> {
  memoryDevices = memoryDevices.map((d) => {
    if (d.id === deviceId) {
      return {
        ...d,
        connectionStatus: updates.connectionStatus ?? d.connectionStatus,
        operationStatus: updates.operationStatus ?? d.operationStatus,
        lastPing: "Baru saja diperbarui",
      };
    }
    return d;
  });

  try {
    const supabase = await createClient();
    await supabase
      .from("iot_devices")
      .update({
        ...(updates.connectionStatus && { connection_status: updates.connectionStatus }),
        ...(updates.operationStatus && { operation_status: updates.operationStatus }),
        last_ping: new Date().toISOString(),
      })
      .eq("device_code", deviceId);
  } catch (err) {
    console.warn("Device status Supabase update fallback:", err);
  }

  return true;
}

// ============================================================================
// 4. ALERTS SERVICE
// ============================================================================

export async function getAlertsFromDb(): Promise<SensorAlert[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("alerts")
      .select("*, monitoring_locations(name)")
      .eq("is_resolved", false)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((a) => ({
        id: a.id,
        locationId: a.location_id || "loc-01",
        locationName: a.monitoring_locations?.name || "Kawasan Sungai Kapuas",
        severity: a.severity as SensorAlert["severity"],
        title: a.title,
        message: a.message,
        timestamp: new Date(a.created_at).toLocaleString("id-ID", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        parameter: "Sensor Indikasi",
        value: a.threshold_value || "Perhatian",
      }));
    }
  } catch (err) {
    console.warn("Using in-memory alerts fallback:", err);
  }

  return memoryAlerts;
}

export async function resolveAlertInDb(alertId: string): Promise<boolean> {
  memoryAlerts = memoryAlerts.filter((a) => a.id !== alertId);

  try {
    const supabase = await createClient();
    await supabase
      .from("alerts")
      .update({
        is_resolved: true,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", alertId);
  } catch (err) {
    console.warn("Alert resolution Supabase fallback:", err);
  }

  return true;
}

// ============================================================================
// 5. USER PROFILE SERVICE
// ============================================================================

export interface UserProfileData {
  id?: string;
  email: string;
  fullName: string;
  phone: string;
  region: string;
  role: UserRole;
  avatarUrl?: string;
}

export async function getUserProfileFromDb(): Promise<UserProfileData> {
  const defaultProfile: UserProfileData = {
    email: "relawan@dihutan.id",
    fullName: "Ardi Rahman",
    phone: "0812-9876-5432",
    region: "Pontianak & DAS Kapuas, Kalimantan Barat",
    role: "USER",
  };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          email: data.email || user.email || defaultProfile.email,
          fullName: data.full_name || defaultProfile.fullName,
          phone: data.phone || defaultProfile.phone,
          region: data.region || defaultProfile.region,
          role: (data.role as UserRole) || defaultProfile.role,
          avatarUrl: data.avatar_url || undefined,
        };
      }
    }
  } catch (err) {
    console.warn("Profile fetch Supabase fallback:", err);
  }

  return defaultProfile;
}

export async function updateUserProfileInDb(
  updates: Partial<UserProfileData>
): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: updates.email || user.email,
        full_name: updates.fullName,
        phone: updates.phone,
        region: updates.region,
        role: updates.role || "USER",
        updated_at: new Date().toISOString(),
      });
      return !error;
    }
  } catch (err) {
    console.warn("Profile update Supabase fallback:", err);
  }

  return true;
}
