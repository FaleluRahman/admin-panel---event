"use client";

import { Download } from "lucide-react";
import React from "react";

interface PDFDownloadButtonProps {
  data: any;
  title?: string;
  subtitle?: string;
  reportType?: string;
  fileName?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ 
  data, 
  title = "VR HUB", 
  subtitle = "Transaction History",
  fileName = "transaction_history_VR_HUB"
}) => {
  const handleDownloadPDF = () => {
    // Format date consistently
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Calculate totals
    const totalTransactions = data?.transactions?.length || 0;
    const totalPoints = data?.transactions?.reduce((sum: number, trn: any) => sum + (Number(trn.points) || 0), 0) || data?.points || 0;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - ${subtitle}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 30px; 
            color: #333; 
            line-height: 1.4;
          }
          
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            padding-bottom: 15px; 
            border-bottom: 2px solid #333;
          }
          
          .header h1 { 
            color: #1a1a1a; 
            font-size: 24px; 
            margin: 0 0 5px 0;
            font-weight: bold;
          }
          
          .header .subtitle { 
            color: #666; 
            font-size: 16px;
            margin: 0 0 10px 0;
          }
          
          .header .date {
            font-size: 12px;
            color: #888;
          }
          
          .summary { 
            margin-bottom: 25px; 
            font-size: 14px;
          }
          
          .summary p {
            margin: 5px 0;
          }
          
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px; 
            font-size: 13px;
          }
          
          th { 
            background-color: #f5f5f5; 
            padding: 10px 8px; 
            text-align: left; 
            border: 1px solid #ddd;
            font-weight: bold;
            color: #333;
          }
          
          td { 
            padding: 8px; 
            border: 1px solid #ddd; 
          }
          
          tbody tr:nth-child(even) { 
            background-color: #fafafa; 
          }
          
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 11px;
            border-top: 1px solid #ddd;
            padding-top: 15px;
          }
          
          @media print {
            body { margin: 20px; }
            @page { margin: 15mm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <div class="subtitle">${subtitle}</div>
          <div class="date">Generated on: ${formattedDate} at ${formattedTime}</div>
        </div>
        
        <div class="summary">
          <p><strong>Total Transactions:</strong> ${totalTransactions}</p>
          <p><strong>Total Points:</strong> ${totalPoints}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th class="text-center" style="width: 60px;">Sl.No</th>
              <th style="width: 150px;">Date & Time</th>
              <th>Jamia Id</th>
              <th class="text-right" style="width: 80px;">Points</th>
            </tr>
          </thead>
          <tbody>
            ${data?.transactions?.length > 0 
              ? data.transactions.map((trn: any, index: number) => {
                  const date = new Date(trn.created_at);
                  const formattedDateTime = date.toLocaleString('en-US');
                  
                  return `
                    <tr>
                      <td class="text-center">${index + 1}</td>
                      <td>${formattedDateTime}</td>
                      <td>${trn.student || '-'}</td>
                      <td class="text-right">${trn.points || 0}</td>
                    </tr>
                  `;
                }).join('')
              : '<tr><td colspan="4" style="text-align: center; padding: 20px; font-style: italic;">No transactions found</td></tr>'
            }
          </tbody>
        </table>
        
        <div class="footer">
          <div>${title} - Transaction Report</div>
        </div>
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(printContent);
      newWindow.document.close();
      
      // Set the document title for the print dialog
      const dateString = currentDate.toISOString().split('T')[0];
      newWindow.document.title = `${fileName}_${dateString}.pdf`;
      
      // Small delay to ensure content is loaded before printing
      setTimeout(() => {
        newWindow.print();
      }, 250);
    } else {
      alert('Please allow popups to download the PDF report.');
    }
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      type="button"
      aria-label="Download transaction history as PDF"
    >
      <Download className="w-4 h-4" />
      Download Transaction History
    </button>
  );
};

export default PDFDownloadButton;