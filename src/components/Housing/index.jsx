import React from "react"
import { RulerCombinedIcon, LightbulbIcon } from "../Icons";
import ChartHouse from "./ChartHouse"
import { Chapter, Stat, Em } from "../Story";
import { housing } from "../../story/facts";

export default function Housing() {
    const h = housing;
    return (
        <Chapter
            id="price-of-a-home"
            kicker="Housing vs wages"
            lead={
                <>
                    <p className="flex items-center gap-2 font-semibold text-accent"><RulerCombinedIcon size={15} /> The theory</p>
                    <p>
                        Based on <a className="text-accent underline-offset-4 hover:underline" href="http://demographia.com/db-intlhouse.htm" target="_blank" rel="noreferrer">demographia.com</a>,
                        the average house in Greece is about <Em>{h.sizeM2} m²</Em>. Tracking the price of an {h.sizeM2} m² home against the
                        average annual wage shows the widening gap between what Greeks earn and what housing costs.
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-gold"><LightbulbIcon size={15} /> The conclusion</p>
                    <p>
                        House prices are <Em tone="text-alert">{h.priceMultiple.toFixed(1)} times</Em> what they were in {h.firstYear}; wages are up just{' '}
                        <Em tone="text-alert">{h.wageRisePct.toFixed(0)}%</Em>. High housing costs relative to incomes can discourage couples from
                        starting or expanding a family, making financial insecurity a brake on birth rates.
                    </p>
                </>
            }
            aside={
                <div className="grid grid-cols-2 gap-4">
                    <Stat count={{ to: h.yearsLast, decimals: 1 }} tone="text-alert" label={`years of average wages to buy ${h.sizeM2} m² in ${h.lastYear}`} sub={`${h.yearsFirst.toFixed(1)} years in ${h.firstYear}`} />
                    <Stat value={`${h.rentShareLast.toFixed(0)}%`} tone="text-gold" label="of a year’s wage goes to rent" sub={`${h.rentShareFirst.toFixed(0)}% in ${h.firstYear}`} />
                </div>
            }
            takeaway="Homes have become far harder to afford than the wages that must pay for them. Is that the whole picture, or is a wider economic story hiding behind it?"
        >
            <ChartHouse />
        </Chapter>
    );
}
