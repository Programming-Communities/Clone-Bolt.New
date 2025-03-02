'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { useSidebar } from '../ui/sidebar';

function WorkspaceHistory() {
    const { userDetail } = useContext(UserDetailContext);
    const convex = useConvex();
    const [workspaceList, setWorkspaceList] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const { toggleSidebar } = useSidebar();

    useEffect(() => {
        if (userDetail?._id) {
            GetAllWorkspace();
        }
    }, [userDetail]);

    const GetAllWorkspace = async () => {
        try {
            if (!userDetail?._id) {
                console.error("User ID is missing");
                return;
            }
            setLoading(true); // Start loading
            const result = await convex.query(api.workspace.GetAllWorkspaces, {
                userId: userDetail._id,
            });
            setWorkspaceList(result || []);
        } catch (error) {
            console.error("Error fetching workspaces:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <h2 className='font-medium text-lg'>Your Chats</h2>
            {loading ? (
                <p className="text-gray-400">Loading workspaces...</p>
            ) : workspaceList.length > 0 ? (
                workspaceList.map((workspace, index) => (
                    <Link href={`/workspace/${workspace?._id}`} key={index}>
                        <h2
                            onClick={toggleSidebar}
                            className='text-sm text-gray-400 mt-2 font-light cursor-pointer hover:text-white'
                        >
                            {workspace?.messages?.[0]?.content || 'No messages yet'}
                        </h2>
                    </Link>
                ))
            ) : (
                <p className="text-gray-400">No workspaces found.</p>
            )}
        </div>
    );
}

export default WorkspaceHistory;


// 'use client';
// import { UserDetailContext } from '@/context/UserDetailContext';
// import { useConvex } from 'convex/react';
// import React, { useContext, useEffect, useState } from 'react';
// import { api } from '@/convex/_generated/api';
// import Link from 'next/link';
// import { useSidebar } from '../ui/sidebar';

// function WorkspaceHistory() {
//     const { userDetail, setUserDetail } = useContext(UserDetailContext);
//     const convex = useConvex();
//     const [workspaceList, setWorkspaceList] = useState();
//     const { toggleSidebar }=useSidebar();
//     useEffect(() => {
//         userDetail && GetAllWorkspace();
//     }, [userDetail]);

//     const GetAllWorkspace = async () => {
//         if(!userDetail?._id){
//             console.error("User ID is missing");
//             return;
//         }
//         const result = await convex.query(api.workspace.GetAllWorkspaces, {
//             userId: userDetail?._id,
//         });
//         setWorkspaceList(result);
//         console.log(result);
//     };

//     return (
//         <div>
//             <h2 className='font-medium text-lg'>Your Chats</h2>
//             <div>
//                 {workspaceList &&
//                     workspaceList.map((workspace, index) => (
//                         <Link href={`/workspace/${workspace?._id}`} key={index}>
//                         <h2
//                             onClick={toggleSidebar}
//                             className='text-sm text-gray-400 mt-2 font-light cursor-pointer hover:text-white'
//                         >
//                             {workspace?.messages?.[0]?.content || 'No messages yet'}
//                         </h2>
//                     </Link>
//                     ))}
//             </div>
//         </div>
//     );
// }

// export default WorkspaceHistory;
