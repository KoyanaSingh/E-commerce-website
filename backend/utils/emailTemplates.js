const customerEmailWrapper = (title, body) => `
<div style="margin:0;padding:40px 20px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:650px;margin:auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
    <div style = "background:#0f8a78;padding:32px;text-align:center;" >
      <h1 style="margin:0;color:#ffffff;font-size:30px;font-weight:700;">
        PK <span style="color:#0f274a;">Enterprises</span>
      </h1>

      <p style="margin:8px 0 0;color:#d1d5db;font-size:13px;letter-spacing:1px;">
        PACKAGING SOLUTIONS
      </p>
    </div>
    
    <div style="padding:40px;">
      <h2 style="margin-top:0;color:#0f274a;">
        ${title}
      </h2>
        ${body}
  
      <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
          Our team will review your inquiry and get back to you as soon as possible.
        </p>
      </div>
    </div>

    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:15px;color:#111827;font-weight:600;">
        PK Enterprises
      </p>

      <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">
        Packaging Solutions for Modern Businesses
      </p>
    </div>
  </div>
</div>
`;

const adminEmailWrapper = (title, rows) => `
<div
  style="
    margin:0;
    padding:40px 20px;
    background:#f4f7fb;
    font-family:Arial,Helvetica,sans-serif;
  "
>
  <div
    style="
      max-width:750px;
      margin:auto;
      background:#ffffff;
      border-radius:20px;
      overflow:hidden;
      border:1px solid #e5e7eb;
      box-shadow:0 12px 40px rgba(15,39,74,0.08);
    "
  >

    <div
      style="
        background:linear-gradient(135deg,#0f274a 0%,#0f8a78 100%);
        padding:32px;
      "
    >
      <p
        style="
          margin:0 0 8px;
          color:rgba(255,255,255,0.75);
          font-size:12px;
          text-transform:uppercase;
          letter-spacing:1px;
        "
      >
        PK Enterprises
      </p>

      <h2
        style="
          margin:0;
          color:#ffffff;
          font-size:28px;
          font-weight:700;
          line-height:1.3;
        "
      >
        ${title}
      </h2>
    </div>

    <div style="padding:32px;">
      <table
        style="
          width:100%;
          border-collapse:collapse;
          font-size:15px;
          color:#334155;
        "
      >
        ${rows}
      </table>
    </div>

    <div
      style="
        background:#f8fafc;
        padding:20px 32px;
        border-top:1px solid #e5e7eb;
      "
    >
      <p
        style="
          margin:0;
          font-size:13px;
          color:#64748b;
        "
      >
        This inquiry was submitted through the PK Enterprises website.
      </p>
    </div>
  </div>
</div>
`;

// =========================
// PRODUCT
// =========================
const productInquiryAdmin = (i) => adminEmailWrapper(
  "New Product Inquiry",
  ` 
  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >
      Name
    </td>
    <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.name}
    </td>
  </tr>
    
  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Email
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.email}</td>
  </tr>

  <tr>
    <td> 
      <strong>Phone
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.phone}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Product
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.productName || "-"}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Category
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.categoryName || "-"}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Quantity
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.quantity || "-"}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Message
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.message || "-"}</td>
  </tr>
`
);

const productInquiryCustomer = (i) => customerEmailWrapper(
  "Inquiry Received Successfully",
  ` 
  <p>Hello ${i.name},</p>
  <p>
    Thank you for your interest in our products.
    We have successfully received your inquiry.
  </p>

  <div
    style="
      background:#f8fafc;
      padding:20px;
      border-radius:12px;
      margin:25px 0;
    "
  >
    <p><strong>Product: ${i.productName || "-"}</p>
    <p><strong>Category: ${i.categoryName || "-"}</p>
    <p><strong>Quantity: ${i.quantity || "-"}</p>
  </div>

  <p>
    Our team will review your requirements and contact you shortly.
  </p>

  <p>
    Regards,<br />
    PK Enterprises
  </p>
`
);

// =========================
// CATEGORY
// =========================
const categoryInquiryAdmin = (i) => adminEmailWrapper(
  "New Category Inquiry",
  `
  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >
      Name
    </td>
    <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.name}
    </td>
  </tr>
  
  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Email
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.email}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Phone
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.phone}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Category
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.categoryName || "-"}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Quantity
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.quantity || "-"}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Message
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.message || "-"}</td>
  </tr>
`
);

const categoryInquiryCustomer = (i) => customerEmailWrapper(
  "Inquiry Received Successfully",
  ` 
  <p>Hello ${i.name},</p>
  <p>
    Thank you for contacting PK Enterprises.
    We have successfully received your category inquiry.
  </p>

  <div
    style="
      background:#f8fafc;
      padding:20px;
      border-radius:12px;
      margin:25px 0;
    "
  >
    <p><strong>Category:</strong> ${i.categoryName || "-"}</p>
    <p><strong>Quantity:</strong> ${i.quantity || "-"}</p>
  </div>

  <p>
    Our team will contact you shortly with further details.
  </p>

  <p>
    Regards,<br />
    PK Enterprises
  </p>
`
);

// =========================
// GENERAL
// =========================
const generalInquiryAdmin = (i) => adminEmailWrapper(
  "New General Inquiry",
  ` 
  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >
      Name
    </td>
    <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
     " 
    >
      ${i.name}
    </td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Email
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.email}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Phone
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.phone}</td>
  </tr>

  <tr>
    <td
      style="
        padding:14px 16px;
        background:#f8fafc;
        border-bottom:1px solid #e5e7eb;
        font-weight:600;
        color:#0f274a;
        width:180px;
      "
    >Message
    </td>
        <td
      style="
        padding:14px 16px;
        border-bottom:1px solid #e5e7eb;
        color:#334155;
      "
    >
      ${i.message || "-"}</td>
  </tr>
`
);

const generalInquiryCustomer = (i) => customerEmailWrapper(
  "Inquiry Received Successfully",
  ` 
  <p>Hello ${i.name},</p>
  <p>
    Thank you for reaching out to PK Enterprises.
    We have received your inquiry and our team will get back to you shortly.
  </p>

  <div
    style="
      background:#f8fafc;
      padding:20px;
      border-radius:12px;
      margin:25px 0;
    "
  >
    <p><strong>Your Message:</strong></p>
    <p>${i.message || "-"}</p>
  </div>

  <p>
    Regards,<br />
    PK Enterprises
  </p>
`
);

// =========================
// ROUTERS
// =========================
exports.adminInquiryTemplate = (inquiry) => {
  if (inquiry.type === "Product") return productInquiryAdmin(inquiry);
  if (inquiry.type === "Category") return categoryInquiryAdmin(inquiry);
  return generalInquiryAdmin(inquiry);
};

exports.customerInquiryTemplate = (inquiry) => {
  if (inquiry.type === "Product") return productInquiryCustomer(inquiry);
  if (inquiry.type === "Category") return categoryInquiryCustomer(inquiry);
  return generalInquiryCustomer(inquiry);
};
