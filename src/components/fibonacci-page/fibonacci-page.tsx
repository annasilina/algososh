import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci.module.css"
import {delay} from "../../utils/delay";
import {fibCalculate} from "../../utils/fibCalculate";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {clearInput} from "../../utils/clearInput";

export const FibonacciPage: React.FC = () => {
	const [isCalculating, setIsCalculating] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [arrResult, setArrResult] = useState<number[]>([]);

	const handleButtonClick = () => {
		setIsCalculating(true);
		fibVisualization(inputValue)
			.then(() => {
				setIsCalculating(false);
				clearInput('input', setInputValue)
			})
	}

	const handlerInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputValue(evt.target.value);
	}

	const fibVisualization = async (value: string) => {
		const valueNumber = Number(value);
		if (valueNumber === 0) {
			setArrResult([0]);
			setIsCalculating(false);
		} else {
			const elements = fibCalculate(valueNumber);
			for (let i = 0; i < elements.length; i++) {
				await delay(SHORT_DELAY_IN_MS);
				setArrResult(elements.slice(0, i + 1));
			}
		}
	}

	return (
		<SolutionLayout title='Последовательность Фибоначчи'>
			<section className={styles.container}>
				<section className={`${styles.inputSection}`}>
					<Input
						placeholder='Введите число'
						value={inputValue}
						type='number'
						max={19}
						isLimitText={true}
						onChange={handlerInputChange}
						extraClass={styles.input}
						disabled={isCalculating}
						id='input'
					/>
					<Button
						text={'Раcсчитать'}
						type='submit'
						disabled={Number(inputValue) < 0 || Number(inputValue) > 19 || inputValue === ''}
						isLoader={isCalculating}
						extraClass={styles.btn}
						onClick={handleButtonClick}
						id='calculate-btn'
					>
					</Button>
				</section>
				<ul className={`${styles.circles}`}>
					{arrResult.map((item, index) => (
						<li key={index}>
							<Circle
								letter={String(item)} index={index}
							/>
						</li>
					))}
				</ul>
			</section>
		</SolutionLayout>
	);
};
