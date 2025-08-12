"use client";
import { siteConfig } from "@/config/site";

export function useGTM() {
    function sendGTMEvent(data: object) {
        if (typeof window !== undefined) {
            window.gtag("event", "conversion", data)
        }
    }

    function triggerBeginCheckoutEvent(price: number) {
        sendGTMEvent({
            'send_to': `${siteConfig.gtmId}/W2jICOXH4fgaEL6GtedA`,
            'value': price,
            'currency': "USD",
        })
    }

    function triggerConversionEvent(price: number, transactionId: string) {
        sendGTMEvent({
            'send_to': `${siteConfig.gtmId}/cKoSCKnH4fgaEL6GtedA`,
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