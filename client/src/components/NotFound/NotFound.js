import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const nav = useNavigate();
	console.log("this hjpapens");
	nav("");
	return <></>;
}
