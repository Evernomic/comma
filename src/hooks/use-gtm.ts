"use client";
import { siteConfig } from "@/config/site";

export function useGTM() {
    function sendGTMEvent(data: object) {
        if (typeof window !== undefined) {
            window.gtag("event", "conversion", data)
        }
    }

    function triggerBeginCheckoutEvent(price: number, email: string, firstName: string) {
        sendGTMEvent({
            'send_to': `${siteConfig.gtmId}/W2jICOXH4fgaEL6GtedA`,
            'value': price,
            'currency': "USD",
            'leadsUserData': {
                'email': email,
                'address': {
                    first_name: firstName
                }
            }
        })
    }

    function triggerConversionEvent(price: number, transactionId: string, email: string, firstName: string) {
        sendGTMEvent({
            'send_to': `${siteConfig.gtmId}/cKoSCKnH4fgaEL6GtedA`,
            'currency': "USD",
            'value': price,
            'transaction_id': transactionId,
            'leadsUserData': {
                'email': email,
                'address': {
                    first_name: firstName
                }
            }
        })
    }

    return {
        triggerBeginCheckoutEvent,
        triggerConversionEvent
    }

}