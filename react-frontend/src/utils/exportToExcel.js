import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'requests');
  XLSX.writeFile(wb, fileName);
};