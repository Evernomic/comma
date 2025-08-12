"use client";
import { siteConfig } from "@/config/site";

export function useGTM() {
    function sendGTMEvent(name: "begin_checkout" | "conversion", data: object) {
        if (typeof window !== undefined) {
            window.dataLayer?.push({
                event: name,
                ...data
            })
        }
    }

    function triggerBeginCheckoutEvent(price: number) {
        sendGTMEvent("begin_checkout", {
            'sendTo': `${siteConfig.gtmId}/W2jICOXH4fgaEL6GtedA`,
            'value': price,
            'currency': "USD",
        })
    }

    function triggerConversionEvent(price: number, transactionId: string) {
        sendGTMEvent("conversion", {
            'sendTo': `${siteConfig.gtmId}/cKoSCKnH4fgaEL6GtedA`,
            'currency': "USD",
            'value': price,
            'transactionId': transactionId
        })
    }

    return {
        triggerBeginCheckoutEvent,
        triggerConversionEvent
    }

}