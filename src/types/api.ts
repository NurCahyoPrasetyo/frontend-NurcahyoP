export type Country = {
  id_negara: number;
  kode_negara: string;
  nama_negara: string;
};

export type Harbor = {
  id_negara: string;
  id_pelabuhan: string;
  nama_pelabuhan: string;
};

export type Item = {
  id_barang: number;
  nama_barang: string;
  description: string;
  harga: number;
  diskon: number;
  id_pelabuhan: number;
};

export type Option = {
  id: number | string;
  value: string;
  title: string;
  harga?: number;
  diskon?: number;
};

export type OptionItem = {
  id: string | number;
  value: string;
  title: string;
  description?: string;
  id_pelabuhan?: string | number;
  harga?: number;
  diskon?: number;
};
