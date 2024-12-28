import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import starWarsUrl from "../../img/starwars-logo.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 text-light">
			<h1>Welcome to </h1>
			<p>
				<img src={starWarsUrl} />
			</p>
			<h1>blog</h1>
		</div>
	);
};
