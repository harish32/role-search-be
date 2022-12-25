import { Request, Response } from "express";

import data from "../data/mock_data.json";

const get = async (req: Request, res: Response) => {
  const query = req.query.q;

  let rData = data;
  if (query)
    rData = data.filter(
      (item) =>
        item.name.toLowerCase().includes((query as string).toLowerCase()) ||
        item.description.includes((query as string).toLowerCase())
    );

  const { sortOrder = "asc", sortField } = req.query;

  if (sortField) {
    if (sortField === "dateLastEdited") {
      rData.sort((a, b) => {
        const dateA = new Date(a[sortField as string]);
        const dateB = new Date(b[sortField as string]);
        if (sortOrder === "asc") {
          return dateA > dateB ? 1 : -1;
        } else {
          return dateA < dateB ? 1 : -1;
        }
      });
    } else {
      rData.sort((a, b) => {
        const valueA = a[sortField as string].toLowerCase();
        const valueB = b[sortField as string].toLowerCase();
        if (sortOrder === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }
  }

  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
  const sIndex = (page - 1) * pageSize;
  const eIndex = sIndex + pageSize;
  const fResults = rData.slice(sIndex, eIndex);

  res.json({
    results: fResults,
    total: rData.length,
  });
};

export default {
  get,
};
