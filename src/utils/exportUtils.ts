
import jsPDF from 'jspdf';
import type { Product } from '../pages/Products/productsData';

export const exportProductsCSV = (products: Product[]) => {
  const headers = ['ID', 'Nombre', 'Categoría', 'Precio', 'Stock'];

  const rows = products.map((product) => [
    product.id,
    product.name,
    product.category,
    product.price,
    product.stock
  ]);

  const csvContent = [
    headers.join(';'),
    ...rows.map((row) => row.join(';'))
  ].join('\n');

  const blob = new Blob(
    ['\uFEFF' + csvContent],
    { type: 'text/csv;charset=utf-8;' }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'gestorpro-productos.csv';
  link.click();

  URL.revokeObjectURL(url);
};

export const exportProductsPDF = (products: Product[]) => {
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text('GestorPro - Inventario de productos', 14, 20);

  pdf.setFontSize(10);
  pdf.text(`Total de productos: ${products.length}`, 14, 30);

  let y = 42;

  pdf.setFontSize(9);

  pdf.text('Nombre', 14, y);
  pdf.text('Categoría', 65, y);
  pdf.text('Precio', 120, y);
  pdf.text('Stock', 165, y);

  y += 8;

  products.forEach((product) => {
    if (y > 275) {
      pdf.addPage();
      y = 20;
    }

    pdf.text(product.name.substring(0, 25), 14, y);
    pdf.text(product.category.substring(0, 25), 65, y);
    pdf.text(`${product.price.toFixed(2)} EUR`, 120, y);
    pdf.text(String(product.stock), 165, y);

    y += 8;
  });

  pdf.save('gestorpro-productos.pdf');
};
