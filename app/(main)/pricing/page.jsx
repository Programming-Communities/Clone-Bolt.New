"use client";
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const pricingDescription = Lookup.PRICING_DESC;
  const backgroundColor = Colors.BACKGROUND;

  return (
    <div className="mt-10 flex flex-col items-center w-full p-10 md:px-32 lg:px-48">
      <h2 className="font-bold text-5xl">Pricing</h2>
      <p className="text-gray-400 max-w-xl text-center">{pricingDescription}</p>

      <div
        className={`
          p-5 border rounded-xl w-full flex justify-between mt-7 items-center
          bg-[${backgroundColor}]
        `}
      >
        <h2 className="text-lg">
          <span className="font-bold">{userDetail?.token}</span> Token Left
        </h2>
        <div>
          <h2>Need More Token?</h2>
          <p>Upgrade Your Plan Below</p>
        </div>
      </div>
      <PricingModel />
    </div>
  );
}

export default Pricing;