import {useState} from 'react';

interface CalcProps{
    amount: number;
    interest: number;
    years: number;
}

const [resutls, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
})


export const CalculateResults = (props: CalcProps) => {
    const userAmount = props.amount;
    const calculatedInterest = props.interest / 100 / 12;
    const calculatedPayments = props.years * 12;
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
			return;
		}



};


