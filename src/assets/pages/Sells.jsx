import React, { useState, useEffect } from "react";
import SaleForm from "../../components/forms/SaleForm.jsx";
import saleService from "../services/saleService.js";
function Sells() {
  const [sales, setSales] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await saleService.fetchSales();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Sale
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Invoice #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{sale.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.invoiceDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.customer?.firstName} {sale.customer?.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${sale.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SaleForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={async (data) => {
          try {
            await saleService.createSale(data);
            fetchSales();
            setIsFormOpen(false);
          } catch (error) {
            console.error("Error creating sale:", error);
          }
        }}
      />
    </div>
  );
}

export default Sells;
