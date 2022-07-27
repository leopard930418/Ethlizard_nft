import React from "react";
import CustomImage from "./CustomImage";
import LIZARD0 from "assets/images/0.png"

export default function LizardCard() {
  return (
    <div className="bg-lizard_box_background border border-solid border-gray-400 rounded-lg py-4 px-8 w-fit font-bold">
        <div className="text-emerald-400">Ethlizard #2878</div>
        <div className="my-4">
            <CustomImage src={LIZARD0} className="w-40"/>
        </div>
        <div className="bg-button_background py-2 px-10 text-white border border-solid border-pinkB rounded-lg text-center">
            Unstake
        </div>
        <div className="text-white text-center mt-5">
            unlocked
        </div>
    </div>
  );
}
