// "use client";
// import * as React from "react";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import Typography from "@mui/material/Typography";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import Box from "@mui/material/Box";
// import { usePathname } from "next/navigation";
// import { navLinks, ProfilenavLinks } from "../_constants";

// const allLinks = [...navLinks, ...ProfilenavLinks];

// const segmentMapping = {
//   profile: "الملف الشخصي", 
//   store:"المتجر",
//   "added-devices": "الأجهزة المضافة",
//   "previous-operations" : "العمليات السابقة",
//   "shopping-cart" :"عربة التسوق",
//   "confirm-request" : "تأكيد الطلب",
//   devices:"الأجهزه"
// };

// export default function CustomBreadcrumbs() {
//   const pathname = usePathname();
//   const pathSegments = pathname.split("/").filter(Boolean);

//   const breadcrumbs = pathSegments.map((segment, index) => {
//     // Check if the segment is "profile" and replace it with Arabic
//     const decodedSegment = decodeURIComponent(segment);
//     const translatedSegment = segmentMapping[decodedSegment] || decodedSegment;
    
//     const href = "/" + pathSegments.slice(0, index + 1).join("/");

//     // Find the corresponding title in allLinks
//     const matchedLink = allLinks.find((link) => link.url === href);
//     const title = matchedLink ? matchedLink.title : translatedSegment;

//     return index === pathSegments.length - 1 ? (
//       <Typography key={index} color="text.primary" style={{ fontFamily: 'Tajawal, sans-serif' }}>
//       {title}
//     </Typography>
    
//     ) : (
//       <Link key={index} underline="none" color="inherit" style={{ fontFamily: 'Tajawal, sans-serif' }}>
//       {title}
//     </Link>
    
//     );
//   });

//   return (
//     <div className="md:p-3 p-2 my-8 w-[82%] mx-auto  ">
//       <Box
//         sx={{
//           backgroundColor: "#EAFEF1",
//           padding: "16px",
//           width: "fit-content",
//           borderRadius: "30px",
//         }}
//       >
//         <Breadcrumbs
//           separator={<NavigateNextIcon fontSize="small" />}
//           aria-label="breadcrumb"
//         >
//           <Link style={{ fontFamily: 'Tajawal, sans-serif' }} underline="none" color="inherit" href="/">
//             الرئيسية
//           </Link>
//           {breadcrumbs}
//         </Breadcrumbs>
//       </Box>
//     </div>
//   );
// }


"use client";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import { navLinks, ProfilenavLinks } from "../_constants";

const allLinks = [...navLinks, ...ProfilenavLinks];

const segmentMapping = {
  profile: "الملف الشخصي",
  "control-panel": "لوحة التحكم",
  "added-location": "العناوين المضافة",
  "previous-requests": "الطلبات السابقة",
  favourite: "المفضلة",
  maintenance: "صيانة",
  "help-center": "مركز المساعدة",
  store: "المتجر",
  devices: "الأجهزه",
  "shopping-cart": "عربة التسوق",
  "confirm-request": "تأكيد الطلب",
};


export default function CustomBreadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    if (!isNaN(segment)) return null;

    const decodedSegment = decodeURIComponent(segment);
    const translatedSegment = segmentMapping[decodedSegment] || decodedSegment; 

    return (
      <Typography
        key={index}
        color="text.primary"
        style={{ fontFamily: "Tajawal, sans-serif" }}
      >
        {translatedSegment}
      </Typography>
    );
  });

  return (
    <div className="md:p-3 p-2 my-8 w-[82%] mx-auto">
      <Box
        sx={{
          backgroundColor: "#EAFEF1",
          padding: "16px",
          width: "fit-content",
          borderRadius: "30px",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            style={{ fontFamily: "Tajawal, sans-serif" }}
            underline="none"
            color="inherit"
            href="/"
          >
            الرئيسية
          </Link>
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
    </div>
  );
}
