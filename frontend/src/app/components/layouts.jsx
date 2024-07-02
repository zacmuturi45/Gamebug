// "use client"

// import React, { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';

// export default function Layouts({ children }) {
//     const pathname = usePathname();
//     const [backgroundImage, setBackgroundImage] = useState('');

//     useEffect(() => {
//         switch (pathname) {
//             case '/signup':
//                 setBackgroundImage('url(/images/alpha.jpg)');
//                 break;
//             case '/login':
//                 setBackgroundImage('url(/images/vamp.jpg)');
//                 break;
//             default:
//                 setBackgroundImage('hsl(10, 3%, 8%);')
//         }
//     }, [pathname]);

//     return (
//         <div className="layouts" style={{ backgroundImage: backgroundImage }}>
//             <div className="before"></div>
//             {children}
//         </div>
//     );
// };
