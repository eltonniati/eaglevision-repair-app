@page {
  size: A4;
  margin: 10mm;
}

@media print {
  body * {
    visibility: hidden;
  }
  
  #print-content, #print-content * {
    visibility: visible;
  }
  
  #print-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  .no-print {
    display: none !important;
  }
  
  table {
    page-break-inside: auto;
  }
  
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
}
