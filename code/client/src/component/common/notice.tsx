import { useEffect, useState } from "react";

const Notice = () => {
	const [notice, setNotice] = useState<string>();

	useEffect(() => {
		const message = window.sessionStorage.getItem("notice");
		console.log("Message récupéré:", message, typeof message);

		if (message) {
			setNotice(message);
			window.sessionStorage.removeItem("notice");
		}
	}, []);

	return notice ? <p>{notice}</p> : null;
};

export default Notice;
