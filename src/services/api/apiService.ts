import { Country, Harbor, Item } from "@/types/api";
import { apiClient } from "./apiClient";

// export async function fetchCountrys(): Promise<Country[]> {
//   const res = await apiClient<Country[]>("/negaras", {});
//   return res;
// }

// export async function fetchHarbors(id: number | string): Promise<Harbor[]> {
//   const res = await apiClient<Harbor[]>(`/pelabuhans?id_negara=${id}`, {});
//   return res;
// }

// export async function fetchItems(id: number | string): Promise<Item[]> {
//   const res = await apiClient<Item[]>(`/barangs?d_pelabuhan=${id}`, {});
//   return res;
// }

export async function fetchCountrys(): Promise<Country[]> {
  return await apiClient<Country[]>("/api/negaras");
}

export async function fetchHarbors(id: number | string): Promise<Harbor[]> {
  return await apiClient<Harbor[]>(`/api/pelabuhans?id_negara=${id}`);
}

export async function fetchItems(id: number | string): Promise<Item[]> {
  return await apiClient<Item[]>(`/api/barangs?d_pelabuhan=${id}`);
}
