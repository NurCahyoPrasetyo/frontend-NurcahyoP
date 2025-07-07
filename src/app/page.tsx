"use client";

import DropDown from "@/components/dropDown/DropDown";
import {
  fetchCountrys,
  fetchHarbors,
  fetchItems,
} from "@/services/api/apiService";
import { Option, OptionItem } from "@/types/api";
import React, { useCallback, useEffect, useState } from "react";

const formatRupiah = (number: number): string =>
  `Rp. ${number.toLocaleString("id-ID")}`;

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [dataCountrys, setDataCountrys] = useState<Option[]>([]);
  const [dataHarbors, setDataHarbors] = useState<Option[]>([]);
  const [dataItems, setDataItems] = useState<OptionItem[]>([]);
  const [thisCountry, setThisCountry] = useState<Option | null>(null);
  const [thisHarbor, setThisHarbor] = useState<Option | null>(null);
  const [thisItem, setThisItem] = useState<OptionItem | null>(null);
  const [discont, setDiscount] = useState("0");
  const [price, setPrice] = useState("0");

  const handleGetCountry = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchCountrys();
      const options = res.map((item) => ({
        id: item.id_negara,
        value: item.kode_negara,
        title: `${item.kode_negara} - ${item.nama_negara}`,
      }));
      setDataCountrys(options);
      setThisCountry(options[0]);
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetHarbor = useCallback(async () => {
    if (!thisCountry) return;
    setIsLoading(true);
    try {
      const res = await fetchHarbors(thisCountry.id);
      const options = res.map((item) => ({
        id: item.id_negara,
        value: item.id_pelabuhan,
        title: item.nama_pelabuhan,
      }));
      setDataHarbors(options);
      setThisHarbor(options[0]);
    } catch (err) {
      console.error("Error fetching harbors:", err);
    } finally {
      setIsLoading(false);
    }
  }, [thisCountry]);

  const handleGetItems = useCallback(async () => {
    if (!thisHarbor) return;
    setIsLoading(true);
    try {
      const res = await fetchItems(thisHarbor.id);
      const options = res.map((item) => ({
        id: item.id_barang,
        value: item.id_barang.toString(),
        title: item.nama_barang,
        description: item.description,
        id_pelabuhan: item.id_pelabuhan,
        harga: item.harga,
        diskon: item.diskon,
      }));
      setDataItems(options);
      const firstItem = options[0];
      setThisItem(firstItem);
      setDiscount(firstItem?.diskon?.toString() ?? "0");
      setPrice(firstItem?.harga?.toString() ?? "0");
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setIsLoading(false);
    }
  }, [thisHarbor]);

  useEffect(() => {
    handleGetCountry();
  }, [handleGetCountry]);

  useEffect(() => {
    handleGetHarbor();
  }, [handleGetHarbor]);
  useEffect(() => {
    handleGetItems();
  }, [handleGetItems]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5 text-gray-600">
          CHECK YOUR ITEM
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7 flex flex-col gap-4">
            <DropDown
              option={dataCountrys}
              title="NEGARA"
              onChange={setThisCountry}
            />
            <DropDown
              option={dataHarbors}
              title="PELABUHAN"
              onChange={setThisHarbor}
            />
            <DropDown
              option={dataItems}
              title="BARANG"
              onChange={(data) => {
                setThisItem(data);
                setDiscount(data.diskon?.toString() ?? "0");
                setPrice(data.harga?.toString() ?? "0");
              }}
            />

            <textarea
              disabled
              value={thisItem?.description ?? ""}
              name="komentar"
              className="w-full rounded-md bg-white py-1.5 px-3 text-left text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              rows={2}
            />

            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                DISCOUNT
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  required
                  className="w-full rounded-l-md bg-white py-1.5 px-3 text-left text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  placeholder={thisItem?.diskon?.toString() ?? "0"}
                  value={discont}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      const num = parseInt(val || "0", 10);
                      if (num <= 100) setDiscount(val);
                    }
                  }}
                />
                <div className="p-1 bg-white py-1.5 px-3 text-left text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm rounded-r-md">
                  %
                </div>
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                HARGA
              </label>
              <input
                type="text"
                required
                className="w-full rounded-md bg-white py-1.5 px-3 text-left text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                placeholder={thisItem?.harga?.toString() ?? "0"}
                value={price}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setPrice(val);
                }}
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                TOTAL
              </label>
              <input
                type="text"
                disabled
                className="w-full rounded-md bg-white py-1.5 px-3 text-left text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                value={formatRupiah(
                  Number(price) * (1 - Number(discont) / 100)
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
