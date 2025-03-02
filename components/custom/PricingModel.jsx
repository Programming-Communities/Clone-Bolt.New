import Lookup from '@/data/Lookup';
import React, { useContext, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserDetailContext } from '@/context/UserDetailContext';

function PricingModel() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const UpdateToken = useMutation(api.users.UpdateToken);
  const [selectedOption, setSelectedOption] = useState();

  const onPaymentSuccess = async () => {
    const token = userDetail?.token + Number(selectedOption?.value);
    console.log(token);

    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };

  const onPaymentError = (error) => {
    console.error("Payment Error:", error);
    // Handle the error, e.g., show a notification to the user
  };

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {Lookup.PRICING_OPTIONS?.map((pricing, index) => (
        <div
          key={index}
          className='border p-7 rounded-xl flex flex-col gap-3'
          onClick={() => {
            setSelectedOption(pricing);
            console.log(pricing.value);
          }}
        >
          <h2 className='font-bold text-2xl'>{pricing.name}</h2>
          <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
          <p className='text-gray-400'>{pricing.desc}</p>
          <h2 className='font-bold text-4xl text-center mt-6'>${pricing.price}</h2>

          <PayPalButtons
            disabled={!userDetail}
            style={{ layout: "horizontal" }}
            onApprove={() => onPaymentSuccess()}
            onCancel={() => console.log("Payment Cancelled")}
            onError={onPaymentError} // Add onError callback
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: pricing.price,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default PricingModel;
// import Lookup from '@/data/Lookup';
// import React, { useContext, useState } from 'react'; // Import useState
// // import { Button } from '../ui/button';
// import { PayPalButtons } from '@paypal/react-paypal-js';
// import { useMutation } from 'convex/react'; // Import useMutation
// import { api } from '@/convex/_generated/api'; // Correct import path for api
// import { UserDetailContext } from '@/context/UserDetailContext'; // Import UserDetailContext

// function PricingModel() {
//   // Use useContext to access UserDetailContext
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);

//   // Use useMutation with the correct API reference
//   const UpdateToken = useMutation(api.users.UpdateToken);

//   // Use useState to manage selectedOption
//   const [selectedOption, setSelectedOption] = useState();

//   const onPaymentSuccess = async () => {
//     const token = userDetail?.token +Number ( selectedOption?.value);
//     // (selectedOption?.tokens); // Use selectedOption.tokens
//     console.log(token);

//     // Call the UpdateToken mutation
//     await UpdateToken({
//       token: token,
//       userId: userDetail?._id,
//     });
//   };

//   return (
//     <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
//       {Lookup.PRICING_OPTIONS?.map((pricing, index) => (
//         <div
//           key={index}
//           className='border p-7 rounded-xl flex flex-col gap-3'
//           onClick={() => {
//             setSelectedOption(pricing); // Set the selected option
//             console.log(pricing.value); // Log the tokens
//           }}
//         >
//           <h2 className='font-bold text-2xl'>{pricing.name}</h2>
//           <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
//           <p className='text-gray-400'>{pricing.desc}</p>

//           <h2 className='font-bold text-4xl text-center mt-6'>${pricing.price}</h2>

//           {/* Uncomment the Button if needed */}
//           {/* <Button>Upgrade to {pricing.name}</Button> */}

//           <PayPalButtons
//             disabled={!userDetail}
//             style={{ layout: "horizontal" }}
//             onApprove={() => onPaymentSuccess()}
//             onCancel={() => console.log("Payment Cancelled")}
//             createOrder={(data, actions) => {
//               return actions.order.create({
//                 purchase_units: [
//                   {
//                     amount: {
//                       value: pricing.price,
//                       currency_code: "USD",
//                     },
//                   },
//                 ],
//               });
//             }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default PricingModel;