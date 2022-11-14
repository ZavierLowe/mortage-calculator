import React, { useState } from "react";
import styles from "components/Forum/MortageForm.module.css";
import ChartGraph from "../Chart/ChartGraph";

const MortageForum = () => {
	const [userValues, setUserValues] = useState({
		homePrice: "",
		downPayment: "",
		loanTerm: "",
		interestRate: "",
		propertyTax: "",
		isResult: false,
	});
	const [resutls, setResults] = useState({
		monthlyPayment: "",
		totalPayment: "",
		totalInterest: "",
		isResult: false,
	});

	const calculateResults = ({ homePrice, interestRate, loanTerm }: any) => {
		const userAmount = Number(homePrice);
		const calculatedInterest = Number(interestRate) / 100 / 12;
		const calculatedPayments = Number(loanTerm) * 12;
		const x = Math.pow(1 + calculatedInterest, calculatedPayments);
		const monthly = (userAmount * x * calculatedInterest) / (x - 1);

		if (isFinite(monthly)) {
			const monthlyPaymentCalc = monthly.toFixed(2);
			const totalPaymentCalc = (monthly * calculatedPayments).toFixed(2);
			const totalInterestCalc = (
				monthly * calculatedPayments -
				userAmount
			).toFixed(2);

			setResults({
				monthlyPayment: monthlyPaymentCalc,
				totalPayment: totalPaymentCalc,
				totalInterest: totalInterestCalc,
				isResult: true,
			});
		}
		return;
	};

	const handleInputChange = (e: any) =>
		setUserValues({
			...userValues,
			[e.target.name]: e.target.value,
		});

	const handleSubmitValues = (e: any) => {
		e.preventDefault();
		calculateResults(userValues);
		// console.log(resutls);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmitValues}
				className={styles.formContainer}
				action="">
				<label className={styles.formLabel} htmlFor="homePrice">
					Home price
				</label>
				<input
					className={styles.formInput}
					type="text"
					name="homePrice"
					id="homePrice"
					value={userValues.homePrice}
					onChange={handleInputChange}
				/>
				<label className={styles.formLabel} htmlFor="downPayment">
					Down payment
				</label>
				<input
					className={styles.formInput}
					type="text"
					name="downPayment"
					id="downPayment"
					value={userValues.downPayment}
					onChange={handleInputChange}
				/>
				<label className={styles.formLabel} htmlFor="interestRate">
					Interest Rate
				</label>
				<input
					className={styles.formInput}
					type="text"
					name="interestRate"
					id="interestRate"
					value={userValues.interestRate}
					onChange={handleInputChange}
				/>
				<label className={styles.formLabel} htmlFor="loanTerm">
					Loan Term
				</label>
				<input
					className={styles.formInput}
					type="text"
					name="loanTerm"
					id="loanTerm"
					value={userValues.loanTerm}
					onChange={handleInputChange}
				/>

				<button className={styles.formSubmit} type="submit">
					Calculate
				</button>
			</form>

			<div className={styles.results}>
				<h1>Monthy Payment:{resutls.monthlyPayment}</h1>
				<p> Total Payment:{resutls.totalPayment}</p>
				<p> Total Interest:{resutls.totalInterest}</p>
			</div>
			<ChartGraph
				monthlyPayment={resutls.monthlyPayment}
				totalPayment={resutls.totalPayment}
				totalInterest={resutls.totalInterest}
				results={resutls}
			/>
		</div>
	);
};

export default MortageForum;
