// import React, { useState, useEffect } from 'react';
// import { supabase } from '../../api/supabase';

// const SupabaseTestPage = () => {
//     const [status, setStatus] = useState('Checking...');
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const checkConnection = async () => {
//             try {
//                 // Try to fetch one user. If the table 'users' doesn't exist, this will fail.
//                 // You can change 'users' to any table you know exists in your Supabase project.
//                 const { data, error } = await supabase
//                     .from('users')
//                     .select('*')
//                     .limit(1);

//                 if (error) {
//                     throw error;
//                 }

//                 setStatus('Connected ✅');
//                 setData(data);
//             } catch (err) {
//                 setStatus('Failed ❌');
//                 setError(err.message || JSON.stringify(err));
//             }
//         };

//         checkConnection();
//     }, []);

//     return (
//         <>
//             <div className="p-6">
//                 <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

//                 <div className={`p-4 rounded-lg mb-4 ${status.includes('Connected') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     <p className="font-semibold text-lg">Status: {status}</p>
//                 </div>

//                 {error && (
//                     <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
//                         <h3 className="font-bold">Error Details:</h3>
//                         <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
//                     </div>
//                 )}

//                 {data && (
//                     <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
//                         <h3 className="font-bold mb-2">Data Sample (First Record):</h3>
//                         <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto">
//                             {JSON.stringify(data, null, 2)}
//                         </pre>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default SupabaseTestPage;
