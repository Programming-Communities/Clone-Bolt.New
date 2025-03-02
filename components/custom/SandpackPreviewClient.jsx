import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import React, { useRef, useEffect, useContext } from 'react'; // Import useContext
import { ActionContext } from '@/context/ActionContext'; // Ensure correct path

const SandpackPreviewClient = () => {
    const previewRef = useRef();
    const { sandpack } = useSandpack();
    const { action, setAction } = useContext(ActionContext); // Now useContext is defined

    useEffect(() => {
        GetSandpackClient();
    }, [sandpack, action]); // Fix: Ensure proper dependency syntax

    const GetSandpackClient = async () => {
        const client = previewRef.current?.getClient();
        if (client) {
            console.log(client);
            const result = await client.getCodeSandboxURL();
            if(action?.actionType=='deploy')
            {
                window.open('https://' + result?.sandboxId+'.csb.app/');

            }else if(action?.actionType=='export')
            {
                window.open(result?.editorUrl);
            }
        }
    };

    return (
        <SandpackPreview
            ref={previewRef}
            style={{ height: '80vh' }}
            showNavigator={true}
        />
    );
};

export default SandpackPreviewClient;


// import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
// import React, { useRef, useEffect } from 'react'; // Import useEffect

// const SandpackPreviewClient = () => {
//     const previewRef = useRef();
//     const { sandpack } = useSandpack();
//     const {action,setAction}=useContext(ActionContext);

//     useEffect(() => {
//         GetSandpackClient();
//     }, [sandpack&&action]); // Dependency array ensures this runs when `sandpack` changes

//     const GetSandpackClient = async() => {
//         const client = previewRef.current?.getClient();
//         if (client) {
//             console.log(client);
//             const result=await client.getCodeSandboxURL();
//             console.log(result);
//         }
//     };

//     return (
//         <SandpackPreview
//             ref={previewRef}
//             style={{ height: '80vh' }}
//             showNavigator={true}
//         />
//     );
// };

// export default SandpackPreviewClient;