// import Cookies from "js-cookie";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function apiClient<T>(
//   path: string,
//   options: RequestInit = {},
//   useAuth: boolean = false
// ): Promise<T> {
//   // Siapkan headers default
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...(options.headers as Record<string, string>),
//   };

//   // Ambil token dari cookies hanya di client
//   if (typeof window !== "undefined" && useAuth) {
//     const token = Cookies.get("token");
//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }
//   }

//   // Lakukan fetch ke API
//   const response = await fetch(`${API_BASE_URL}${path}`, {
//     ...options,
//     headers,
//   });

//   const contentType = response.headers.get("Content-Type");
//   const isJson = contentType?.includes("application/json");
//   const data = isJson ? await response.json() : null;

//   // Handle error lainnya
//   if (!response.ok) {
//     const errorMessage =
//       data && typeof data === "object" && "message" in data
//         ? (data as { message: string }).message
//         : "API request failed";
//     throw new Error(errorMessage);
//   }

//   return data as T;
// }

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, options); // path = "/api/negaras"
  if (!res.ok) throw new Error("API request failed");
  return await res.json();
}
