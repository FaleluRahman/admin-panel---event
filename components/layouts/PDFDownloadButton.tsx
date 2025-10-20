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
  title = "Pending list", 
  subtitle = "Transaction History",
  fileName = "transaction_history_pending_list"
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
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 40px; 
            color: #2c3e50; 
            line-height: 1.6;
            background: #ffffff;
          }
          
          .header { 
            text-align: center; 
            margin-bottom: 35px; 
            padding: 25px 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            color: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .header h1 { 
            color: #ffffff; 
            font-size: 32px; 
            margin: 0 0 10px 0;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .header .subtitle { 
            color: #f0f0f0; 
            font-size: 18px;
            margin: 0 0 12px 0;
            font-weight: 500;
          }
          
          .header .date {
            font-size: 13px;
            color: #e0e0e0;
            background: rgba(255,255,255,0.15);
            display: inline-block;
            padding: 6px 15px;
            border-radius: 20px;
            margin-top: 8px;
          }
          
          .summary { 
            margin-bottom: 30px; 
            background: #f8f9fa;
            padding: 20px 25px;
            border-radius: 8px;
            border-left: 5px solid #667eea;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          
          .summary p {
            margin: 8px 0;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
          }
          
          .summary strong {
            color: #2c3e50;
            font-weight: 600;
          }
          
          .summary span {
            color: #667eea;
            font-weight: 700;
          }
          
          table { 
            width: 100%; 
            border-collapse: separate;
            border-spacing: 0;
            margin-top: 20px; 
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          
          th { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 12px; 
            text-align: left; 
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.3px;
            text-transform: uppercase;
          }
          
          td { 
            padding: 12px; 
            border-bottom: 1px solid #e9ecef; 
            background: white;
          }
          
          tbody tr {
            transition: background-color 0.2s ease;
          }
          
          tbody tr:nth-child(even) { 
            background-color: #f8f9fa; 
          }
          
          tbody tr:hover {
            background-color: #e7e9ff;
          }
          
          tbody tr:last-child td {
            border-bottom: none;
          }
          
          .text-center { text-align: center; }
          .text-right { text-align: right; font-weight: 600; }
          
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #7f8c8d;
            font-size: 12px;
            border-top: 2px solid #e9ecef;
            padding-top: 20px;
            font-style: italic;
          }
          
          @media print {
            body { 
              margin: 20px;
              background: white;
            }
            @page { 
              margin: 15mm;
              size: A4;
            }
            .header {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            tbody tr:hover {
              background-color: inherit;
            }
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