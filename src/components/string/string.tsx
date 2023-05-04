import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./string.module.css";
import {ElementStates} from "../../types/element-states";
import {clearInput} from "../../utils/clearInput";
import {reversString} from "./reversString";

export const StringComponent: React.FC = () => {
	const [originalString, setOriginalString] = useState<string>('');
	const [arrFromString, setArrFromString] = useState<string[]>([]);
	const [sortedIndexes, setSortedIndexes] = useState<number[]>([]);
	const [nextIndexes, setNextIndexes] = useState<number[]>([]);
	const [isReversing, setIsReversing] = useState<boolean>(false);

	const handleButtonClick = () => {
		setIsReversing(true);
		setSortedIndexes([]);
		setNextIndexes([]);
		setArrFromString(originalString.split(''));
		reversString(originalString, setNextIndexes, setArrFromString, setSortedIndexes).then(() => {
			clearInput('input', setOriginalString);
			setIsReversing(false);
		});
	}

	const handlerInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setOriginalString(evt.target.value);
	}

	return (
		<SolutionLayout title='Строка'>
			<section className={styles.inputSection}>
				<Input
					placeholder='Введите текст'
					value={originalString}
					maxLength={11}
					isLimitText={true}
					extraClass={styles.input}
					onChange={handlerInputChange}
					disabled={isReversing}
					id='input'
				/>
				<Button
					text='Развернуть'
					type='submit'
					disabled={originalString === ''}
					isLoader={isReversing}
					extraClass={styles.btn}
					onClick={handleButtonClick}
					id='reverse-btn'
				>
				</Button>
			</section>
			<ul className={`${styles.circles}`}>
				{arrFromString.map((item, index) => (
					<li key={index}>
						<Circle
							letter={item}
							state={
								sortedIndexes.includes(index)
									? ElementStates.Modified
									: nextIndexes.includes(index)
										? ElementStates.Changing
										: ElementStates.Default
							}
						/>
					</li>
				))}
			</ul>

		</SolutionLayout>
	);
};
