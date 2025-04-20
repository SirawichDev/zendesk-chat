import { useEffect } from "react";

export function useConditionalZendeskStyle(condition: boolean) {
	useEffect(() => {
		if (condition) {
			// @ts-expect-error just poc
			import("./zendesk-custom.css");
		}
	}, [condition]);
}
