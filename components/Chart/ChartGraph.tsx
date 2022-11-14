import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MortageForum from "../Forum/MortageForm";
import styles from "components/Chart/ChartGraph.module.css";

const ChartGraph = ({
	monthlyPayment,
	totalPayment,
	totalInterest,
	resutls,
}: any) => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	console.log(monthlyPayment, totalPayment, totalInterest);


	const labels = ["Monthly Payment", "Total Payment", "Total Interest"];
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Payment",
				backgroundColor: [
					"rgb(255, 99, 132)",
					"rgb(54, 162, 235)",
					"rgb(255, 205, 86)",
				],
				borderColor: ["none"],
				data: [monthlyPayment, totalPayment, totalInterest],
			},
		],
	};

	return (
		<div>
			<main className={styles.chartContainer}>
				<Doughnut data={data} datasetIdKey="Payment" />
			</main>
		</div>
	);
};

export default ChartGraph;
