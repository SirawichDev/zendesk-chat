import { useEffect } from "react";

export function useConditionalZendeskStyle(condition: boolean) {
	useEffect(() => {
		if (condition) {
			import("./zendesk-custom.css");
		}
	}, [condition]);
}
